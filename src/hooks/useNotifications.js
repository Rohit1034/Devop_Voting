// NOTIFICATION HOOK DISABLED - All code commented out
//
// import { useState, useEffect } from 'react';
// import { onMessageListener, showLocalNotification, scheduleVotingReminder } from '../services/notificationService';
// import { useAuth } from './useAuth';
// import toast from 'react-hot-toast';
//
// export const useNotifications = () => {
//   const [permission, setPermission] = useState(Notification.permission);
//   const [isSupported, setIsSupported] = useState('Notification' in window);
//   const { user } = useAuth();
//
//   useEffect(() => {
//     if (!isSupported) return;
//
//     // Listen for foreground messages
//     const listenForMessages = async () => {
//       try {
//         const payload = await onMessageListener();
//         
//         // Show toast notification for foreground messages
//         if (payload?.notification) {
//           toast.success(payload.notification.body || 'New notification', {
//             duration: 4000,
//             icon: '🍳',
//           });
//           
//           // Also show browser notification if permission granted
//           if (permission === 'granted') {
//             showLocalNotification(
//               payload.notification.title || 'Breakfast Voting',
//               payload.notification.body || 'New notification'
//             );
//           }
//         }
//       } catch (error) {
//         console.error('Error listening for messages:', error);
//       }
//     };
//
//     listenForMessages();
//
//     // Schedule voting reminders for logged in users
//     if (user && permission === 'granted') {
//       scheduleVotingReminder();
//     }
//   }, [isSupported, permission, user]);
//
//   const requestPermission = async () => {
//     if (!isSupported) {
//       toast.error('Notifications are not supported on this device');
//       return false;
//     }
//
//     try {
//       const newPermission = await Notification.requestPermission();
//       setPermission(newPermission);
//       
//       if (newPermission === 'granted') {
//         toast.success('Notifications enabled!');
//         return true;
//       } else {
//         toast.error('Notification permission denied');
//         return false;
//       }
//     } catch (error) {
//       console.error('Error requesting notification permission:', error);
//       toast.error('Error enabling notifications');
//       return false;
//     }
//   };
//
//   return {
//     permission,
//     isSupported,
//     requestPermission,
//     showNotification: showLocalNotification
//   };
// };
