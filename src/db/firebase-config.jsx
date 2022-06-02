import { initializeApp, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
export let app = '';
try {
  app = getApp();
} catch (error) {
  app = initializeApp({
    apiKey: "AIzaSyD3J2vokrbQHyyXoTPGBnJIDmEuwmtjFjo",
    authDomain: "lotificaciones-e3d64.firebaseapp.com",
    projectId: "lotificaciones-e3d64",
    storageBucket: "lotificaciones-e3d64.appspot.com",
    messagingSenderId: "894093680084",
    appId: "1:894093680084:web:0b094cab642cd145360a41"
  })
}

export const db = getFirestore();

