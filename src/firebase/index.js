import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { LocalStorage } from "quasar";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID,
};

// Inicializamos Firebase con la configuración anterior
export const app = initializeApp(firebaseConfig);

// Obtenemos los servicios necesarios de Firebase
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);

// Observamos el estado de autenticación del usuario
onAuthStateChanged(auth, (user) => {
  if (user) {
    // Si el usuario está autenticado, almacenamos su información en LocalStorage
    LocalStorage.set("user", user);
  } else {
    // Si el usuario no está autenticado, removemos su información de LocalStorage
    LocalStorage.remove("user");
  }
});
