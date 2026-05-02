// ─────────────────────────────────────────────────────────────────────
// firebase-config.js  –  Replace ALL placeholder values before deploying
// Get your config from:
//   Firebase Console → Project Settings → Your apps → Web app (</> icon)
// ─────────────────────────────────────────────────────────────────────

const firebaseConfig = {
  apiKey:            "AIzaSyBaEGTScBfyKIpQStQMa3mgsb1_gmahz-I",
  authDomain:        "yala-sport.firebaseapp.com",
  projectId:         "yala-sport",
  storageBucket:     "yala-sport.firebasestorage.app",
  messagingSenderId: "996282770750",
  appId:             "1:996282770750:web:4c31da9c9c22c96de4386f",
  measurementId:     "G-KBQJ4Q4TXE"
};

// Web Push (VAPID) public key for push notifications
// Get from: Firebase Console → Project Settings → Cloud Messaging → Web Push certificates
const VAPID_KEY = "YOUR_VAPID_PUBLIC_KEY";
