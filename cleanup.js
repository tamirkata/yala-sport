#!/usr/bin/env node
/**
 * cleanup.js — One-time wipe of ALL go-and-move app data for a fresh launch.
 * ⚠️  IRREVERSIBLE. Deletes all Auth users, Firestore documents, and Cloudinary images.
 *
 * Prerequisites:
 *   1. serviceAccountKey.json   → Firebase Console → Project Settings → Service Accounts
 *   2. .env with CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
 *   3. npm install firebase-admin cloudinary dotenv
 *
 * Usage:  node cleanup.js
 */

require('dotenv').config();
const admin      = require('firebase-admin');
const cloudinary = require('cloudinary').v2;
const readline   = require('readline');
const fs         = require('fs');
const path       = require('path');

// ── Config ──────────────────────────────────────────────────────────────────
const SA_KEY_PATH    = path.join(__dirname, 'serviceAccountKey.json');
const LOG_PATH       = path.join(__dirname, 'cleanup-log.txt');
const CLOUDINARY_FOLDER = 'yala-sport';
const AUTH_BATCH_SIZE   = 100;   // Firebase deleteUsers limit
const FIRESTORE_BATCH   = 400;   // Firestore batch write limit

// ── Validate env ────────────────────────────────────────────────────────────
if (!fs.existsSync(SA_KEY_PATH)) {
  console.error('\n❌  serviceAccountKey.json not found.');
  console.error('    Firebase Console → Project Settings → Service Accounts → Generate new private key');
  console.error(`    Save the file as: ${SA_KEY_PATH}\n`);
  process.exit(1);
}
if (!process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
  console.error('\n❌  Cloudinary credentials missing from .env');
  console.error('    Copy .env.example → .env and fill in the values.\n');
  process.exit(1);
}

// ── Init ────────────────────────────────────────────────────────────────────
const serviceAccount = JSON.parse(fs.readFileSync(SA_KEY_PATH, 'utf8'));
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db   = admin.firestore();
const auth = admin.auth();

cloudinary.config({
  cloud_name:  process.env.CLOUDINARY_CLOUD_NAME || 'dcpvdscpx',
  api_key:     process.env.CLOUDINARY_API_KEY,
  api_secret:  process.env.CLOUDINARY_API_SECRET,
});

// ── Logger ──────────────────────────────────────────────────────────────────
const logStream = fs.createWriteStream(LOG_PATH, { flags: 'a' });
function log(msg) {
  const line = `[${new Date().toISOString()}] ${msg}`;
  console.log(msg);
  logStream.write(line + '\n');
}

// ── Helpers ─────────────────────────────────────────────────────────────────
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function countdown(label, secs = 3) {
  for (let i = secs; i >= 1; i--) {
    process.stdout.write(`\r  ${label} ${i}...`);
    await sleep(1000);
  }
  process.stdout.write('\r  ' + label + ' now!\n');
}

function ask(question) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise(resolve => rl.question(question, ans => { rl.close(); resolve(ans.trim()); }));
}

// ── Phase 1: Delete all Firebase Auth users ──────────────────────────────────
async function deleteAllAuthUsers() {
  log('\n── Phase 1: Deleting Firebase Auth users ──');
  let totalDeleted = 0;
  let pageToken;

  do {
    const listResult = await auth.listUsers(AUTH_BATCH_SIZE, pageToken);
    const uids = listResult.users.map(u => u.uid);
    if (uids.length === 0) break;

    const result = await auth.deleteUsers(uids);
    totalDeleted += result.successCount;

    if (result.failureCount > 0) {
      result.errors.forEach(e => log(`  ⚠  Failed to delete uid ${e.index}: ${e.error.message}`));
    }

    log(`  Deleted ${result.successCount} auth users (total so far: ${totalDeleted})`);
    pageToken = listResult.pageToken;
  } while (pageToken);

  log(`✓ Auth: deleted ${totalDeleted} users total`);
  return totalDeleted;
}

// ── Phase 2: Delete all Firestore documents (all collections) ────────────────
async function deleteCollection(collRef) {
  let deleted = 0;
  let snap;

  do {
    snap = await collRef.limit(FIRESTORE_BATCH).get();
    if (snap.empty) break;

    // Delete subcollections first for each doc
    for (const doc of snap.docs) {
      const subColls = await doc.ref.listCollections();
      for (const subColl of subColls) {
        deleted += await deleteCollection(subColl);
      }
    }

    const batch = db.batch();
    snap.docs.forEach(d => batch.delete(d.ref));
    await batch.commit();
    deleted += snap.docs.length;
  } while (!snap.empty);

  return deleted;
}

async function deleteAllFirestore() {
  log('\n── Phase 2: Deleting all Firestore data ──');
  const collections = await db.listCollections();
  let total = 0;

  for (const coll of collections) {
    log(`  Clearing collection: ${coll.id}`);
    const count = await deleteCollection(coll);
    log(`  ✓ ${coll.id}: ${count} docs deleted`);
    total += count;
  }

  log(`✓ Firestore: deleted ${total} documents total`);
  return total;
}

// ── Phase 3: Delete all Cloudinary images ────────────────────────────────────
async function deleteAllCloudinaryImages() {
  log('\n── Phase 3: Deleting Cloudinary images ──');
  let totalDeleted = 0;
  let nextCursor;

  try {
    do {
      const result = await cloudinary.api.resources({
        type:        'upload',
        prefix:      CLOUDINARY_FOLDER + '/',
        max_results: 100,
        next_cursor: nextCursor,
      });

      if (!result.resources || result.resources.length === 0) break;

      const publicIds = result.resources.map(r => r.public_id);
      const delResult = await cloudinary.api.delete_resources(publicIds);
      const deleted   = Object.values(delResult.deleted).filter(v => v === 'deleted').length;
      totalDeleted += deleted;
      log(`  Deleted ${deleted} images (total: ${totalDeleted})`);

      nextCursor = result.next_cursor;
    } while (nextCursor);

    // Also try to delete the folder itself
    try {
      await cloudinary.api.delete_folder(CLOUDINARY_FOLDER);
      log(`  Deleted Cloudinary folder: ${CLOUDINARY_FOLDER}`);
    } catch { /* folder may not exist or may have sub-resources — not fatal */ }

    log(`✓ Cloudinary: deleted ${totalDeleted} images total`);
  } catch (err) {
    log(`⚠  Cloudinary deletion error: ${err.message}`);
    log('   Images may need to be deleted manually from the Cloudinary dashboard.');
  }

  return totalDeleted;
}

// ── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log('\n╔══════════════════════════════════════════════════════╗');
  console.log('║  ⚠️   go-and-move — FULL DATA WIPE                  ║');
  console.log('║  This deletes ALL users, workouts, and images.       ║');
  console.log('║  THIS ACTION IS IRREVERSIBLE.                        ║');
  console.log('╚══════════════════════════════════════════════════════╝\n');

  const answer = await ask('Delete ALL data from go-and-move? Type DELETE to confirm: ');
  if (answer !== 'DELETE') {
    console.log('\n✋  Aborted — nothing was deleted.\n');
    process.exit(0);
  }

  log('\n======= CLEANUP STARTED =======');
  const startTime = Date.now();
  const summary   = { users: 0, firestoreDocs: 0, images: 0, errors: [] };

  // Phase 1 — Auth users
  await countdown('Deleting Auth users in');
  try {
    summary.users = await deleteAllAuthUsers();
  } catch (err) {
    log(`❌ Auth deletion failed: ${err.message}`);
    summary.errors.push('Auth: ' + err.message);
  }

  // Phase 2 — Firestore
  await countdown('Deleting Firestore data in');
  try {
    summary.firestoreDocs = await deleteAllFirestore();
  } catch (err) {
    log(`❌ Firestore deletion failed: ${err.message}`);
    summary.errors.push('Firestore: ' + err.message);
  }

  // Phase 3 — Cloudinary
  await countdown('Deleting Cloudinary images in');
  try {
    summary.images = await deleteAllCloudinaryImages();
  } catch (err) {
    log(`❌ Cloudinary deletion failed: ${err.message}`);
    summary.errors.push('Cloudinary: ' + err.message);
  }

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  const errorSummary = summary.errors.length
    ? `\n  ⚠  Errors: ${summary.errors.join('; ')}`
    : '';

  log(`\n======= CLEANUP COMPLETE =======`);
  log(`  Auth users deleted:       ${summary.users}`);
  log(`  Firestore docs deleted:   ${summary.firestoreDocs}`);
  log(`  Cloudinary images deleted:${summary.images}`);
  log(`  Duration:                 ${elapsed}s`);
  log(`  Log file:                 ${LOG_PATH}`);
  if (errorSummary) log(errorSummary);

  console.log('\n✓ Cleanup complete. The app is now fresh. Users can sign up as new.\n');
  logStream.end();
}

main().catch(err => {
  console.error('\n❌  Unexpected error:', err.message);
  logStream.write(`[${new Date().toISOString()}] FATAL: ${err.message}\n`);
  logStream.end();
  process.exit(1);
});
