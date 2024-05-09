importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js",
);

const firebaseConfig = {
  apiKey: "AIzaSyALZvbmwKVBUXia4-u2Wv__C6ST6GFbBUQ",
  authDomain: "myworkout-ca350.firebaseapp.com",
  projectId: "myworkout-ca350",
  storageBucket: "myworkout-ca350.appspot.com",
  messagingSenderId: "334976118267",
  appId: "1:334976118267:web:2547d2f91a0235d1aa2f5e",
  measurementId: "G-BTFG0DLT3J",
};

// Firebase Messaging setup and other service worker code here
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
messaging.onBackgroundMessage(payload => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload,
  );
  const title = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "https://firebasestorage.googleapis.com/v0/b/myworkout-ca350.appspot.com/o/favicon.ico?alt=media&token=ee7ccd36-e269-4811-bdbb-048c2db34c54",
    image: payload.notification.image,
    badge: "https://firebasestorage.googleapis.com/v0/b/myworkout-ca350.appspot.com/o/favicon.ico?alt=media&token=ee7ccd36-e269-4811-bdbb-048c2db34c54",
  };
  self.registration.showNotification(title, notificationOptions);
});
