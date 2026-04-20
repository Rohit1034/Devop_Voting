// NOTIFICATION SERVICE DISABLED - All notification code commented out
// 
// import { getToken, onMessage } from 'firebase/messaging';
// import { ref, set } from 'firebase/database';
// import { messaging, database } from './firebase';
//
// const VAPID_KEY = process.env.REACT_APP_VAPID_KEY;
//
// export const requestNotificationPermission = async (userId) => {
//   try {
//     if (!messaging) {
//       console.log('Messaging not supported');
//       return null;
//     }
//
//     // Request notification permission
//     const permission = await Notification.requestPermission();
//     
//     if (permission === 'granted') {
//       // Get registration token
//       const token = await getToken(messaging, {
//         vapidKey: VAPID_KEY,
//       });
//       
//       if (token) {
//         console.log('Notification token:', token);
//         
//         // Store token in database
//         if (userId) {
//           await set(ref(database, `pushTokens/${userId}`), {
//             token: token,
//             platform: 'web',
//             userAgent: navigator.userAgent,
//             updatedAt: new Date().toISOString()
//           });
//         }
//         
//         return token;
//       } else {
//         console.log('No registration token available.');
//         return null;
//       }
//     } else {
//       console.log('Notification permission denied.');
//       return null;
//     }
//   } catch (error) {
//     console.error('Error getting notification token:', error);
//     return null;
//   }
// };
//
// export const onMessageListener = () => {
//   return new Promise((resolve) => {
//     if (!messaging) {
//       return;
//     }
//     
//     onMessage(messaging, (payload) => {
//       console.log('Message received in foreground:', payload);
//       resolve(payload);
//     });
//   });
// };
//
// export const showLocalNotification = (title, body, options = {}) => {
//   if ('Notification' in window && Notification.permission === 'granted') {
//     new Notification(title, {
//       body,
//       icon: '/icons/icon-192x192.png',
//       badge: '/icons/icon-192x192.png',
//       tag: 'breakfast-voting',
//       ...options
//     });
//   }
// };
//
// export const scheduleVotingReminder = () => {
//   // Calculate time until 9 PM
//   const now = new Date();
//   const reminderTime = new Date();
//   reminderTime.setHours(21, 0, 0, 0); // 9 PM
//   
//   if (now > reminderTime) {
//     // If it's already past 9 PM today, schedule for tomorrow
//     reminderTime.setDate(reminderTime.getDate() + 1);
//   }
//   
//   const timeUntilReminder = reminderTime.getTime() - now.getTime();
//   
//   setTimeout(() => {
//     showLocalNotification(
//       '🍳 Breakfast Voting Reminder',
//       'Don\'t forget to vote for tomorrow\'s breakfast! Voting closes at 7 AM.',
//       {
//         requireInteraction: true,
//         actions: [
//           { action: 'vote', title: 'Vote Now' },
//           { action: 'dismiss', title: 'Later' }
//         ]
//       }
//     );
//   }, timeUntilReminder);
// };;
