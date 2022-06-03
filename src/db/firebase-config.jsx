import { initializeApp, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
export let app = '';
try {
  app = getApp();
} catch (error) {
  app = initializeApp({
    apiKey: "AIzaSyDtIK2suXTMHrEZBdSV8apqan1rzCV22U0",
    authDomain: "lotificaciones-3b3dc.firebaseapp.com",
    projectId: "lotificaciones-3b3dc",
    storageBucket: "lotificaciones-3b3dc.appspot.com",
    messagingSenderId: "488096541206",
    appId: "1:488096541206:web:de7d7baaf7cb23a6aa2337"
  })
}

export const db = getFirestore();

