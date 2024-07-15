// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCfaaSLIc21Y_otQCF74oeLh1bLH0YnY5w",
  authDomain: "todo-7da3d.firebaseapp.com",
  projectId: "todo-7da3d",
  storageBucket: "todo-7da3d.appspot.com",
  messagingSenderId: "757827181944",
  appId: "1:757827181944:web:faa4de7146d6b93e86bc8d",
  measurementId: "G-W6JGP1RPJP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

logEvent(analytics, "notification_received");

function sendAnalyticsEvent(nameEvent = "", options = {}) {
  return logEvent(analytics, nameEvent, options);
}

export { sendAnalyticsEvent };
