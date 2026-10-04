const CACHE_NAME = 'masar-almal-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  'https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700;800&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://cdn.jsdelivr.net/npm/chart.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});

// التعامل مع الضغط على الإشعار المستمر أو أزرار الإجراءات
self.addEventListener('notificationclick', event => {
  event.notification.close(); // إغلاق الإشعار عند الضغط

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
      // إذا كان التطبيق مفتوحاً في الخلفية، اطلبه للأمام
      for (let client of clientList) {
        if (client.url.includes('index.html') && 'focus' in client) {
          return client.focus();
        }
      }
      // إذا كان مغلقاً، قم بفتحه
      if (clients.openWindow) {
        return clients.openWindow('./index.html');
      }
    })
  );
});
