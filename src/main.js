import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDM1ta8wbLXfKV0yhdm9OMVbol7nbtVZeY",
  authDomain: "project-cs-9146d.firebaseapp.com",
  projectId: "project-cs-9146d",
  storageBucket: "project-cs-9146d.appspot.com",
  messagingSenderId: "576576071342",
  appId: "1:576576071342:web:03c01e398fd01336ec6f3f"
};

// Initialize Firebase
const initFirebase = initializeApp(firebaseConfig);

// Initialze Cloud Firestore and get a reference to the service
initializeApp(firebaseConfig);
export const db = getFirestore(initFirebase);
const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
