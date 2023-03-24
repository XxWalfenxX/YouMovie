import { initializeApp } from "firebase/app"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { LocalStorage } from 'quasar'

const firebaseConfig = {
  apiKey: "AIzaSyBcgG1H11irNfOTglZqpjQRA3k3yshOP0M",
  authDomain: "youmovie-10082.firebaseapp.com",
  projectId: "youmovie-10082",
  storageBucket: "youmovie-10082.appspot.com",
  messagingSenderId: "674100460556",
  appId: "1:674100460556:web:58aa17e24a4917c01f0229"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
 if (user) {
  LocalStorage.set('user', user)
 } else {
  LocalStorage.remove('user')
 }
});
