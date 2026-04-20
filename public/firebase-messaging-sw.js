// Firebase Cloud Messaging Service Worker
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

// Initialize Firebase in the service worker with hardcoded values
// NOTE: These values are public and safe to expose in service workers
firebase.initializeApp({
  apiKey: "AIzaSyDSvur9trjPNTN1J7xz2HN6tZZmKw94fZM",
  authDomain: "breakfast-voting-app.firebaseapp.com",
  databaseURL: "https://breakfast-voting-app-default-rtdb.firebaseio.com",
  projectId: "breakfast-voting-app",
  storageBucket: "breakfast-voting-app.firebasestorage.app",
  messagingSenderId: "90721271785",
});

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('Received background message ', payload);
  
  try {
    const notificationTitle = payload?.notification?.title || 'Breakfast Voting';
    const notificationOptions = {
      body: payload?.notification?.body || 'New voting notification',
      icon: '/icons/icon-192x192.png',
      badge: '/icons/icon-192x192.png',
      tag: 'breakfast-voting',
      renotify: true,
      requireInteraction: false,
      actions: [
        {
          action: 'vote',
          title: 'Vote Now',
          icon: '/icons/icon-192x192.png'
        },
        {
          action: 'dismiss',
          title: 'Dismiss'
        }
      ]
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
  } catch (error) {
    console.error('Error handling background message:', error);
  }
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.action === 'vote') {
    // Open the app and navigate to voting
    event.waitUntil(
      clients.matchAll({ type: 'window', includeUncontrolled: true })
        .then((clientList) => {
          if (clientList.length > 0) {
            return clientList[0].focus();
          }
          return clients.openWindow('/');
        })
    );
  }
});
