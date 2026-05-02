// ── Service Worker — יאלה ספורט ──
const CACHE = 'yala-v9';
const PRECACHE = ['./', './index.html', './app.js', './firebase-config.js', './manifest.json',
                  './design-system.css',
                  './icon.svg', './icon-192.png', './icon-512.png',
                  './apple-touch-icon.png', './favicon.ico'];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  // Never cache Firebase / Google API requests
  if (
    url.hostname.includes('googleapis.com') ||
    url.hostname.includes('firebaseio.com') ||
    url.hostname.includes('gstatic.com') ||
    url.hostname.includes('firebase') ||
    e.request.method !== 'GET'
  ) return;

  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(resp => {
        if (!resp || resp.status !== 200 || resp.type !== 'basic') return resp;
        caches.open(CACHE).then(c => c.put(e.request, resp.clone()));
        return resp;
      }).catch(() => cached);
    })
  );
});

// ── Push notification handler ──
self.addEventListener('push', e => {
  const data = e.data?.json() ?? {};
  e.waitUntil(
    self.registration.showNotification(data.title ?? '💪 יאלה ספורט', {
      body:      data.body ?? 'הגיע הזמן להתאמן!',
      icon:      './icon-192.png',
      badge:     './icon-192.png',
      vibrate:   [200, 100, 200],
      dir:       'rtl',
      lang:      'he',
      tag:       'workout-reminder',
      renotify:  true,
      data:      { url: data.url ?? './' },
      actions: [
        { action: 'open',  title: '💪 רשום אימון' },
        { action: 'close', title: 'אחר כך' }
      ]
    })
  );
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  if (e.action !== 'close') {
    e.waitUntil(
      clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
        const existing = list.find(c => c.url.includes('yala-sport'));
        if (existing) return existing.focus();
        return clients.openWindow(e.notification.data?.url ?? './');
      })
    );
  }
});
