import { auth } from "./index.js";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { Loading, Notify, Dialog } from "quasar";
import { doc, setDoc } from "firebase/firestore";
import { db } from "src/firebase/index";
import signOutUser from "./firebase-signout.js";
import { errorMSG } from "./StringsFirebase.js";

// Esta función toma un objeto con la información del usuario y crea una cuenta con esos datos
// Retorna una promesa que resuelve en el objeto user o rechaza con un mensaje de error
const register = (data) => {
  return new Promise((resolve, reject) => {
    Loading.show();

    // Crea la cuenta en Firebase usando el email y password proporcionados
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // Actualiza el perfil del usuario con el nombre proporcionado
        updateProfile(userCredential.user, {
          displayName: data.name,
        });

        // Crea un nuevo documento en la colección 'users' con la información del nuevo usuario
        setDoc(doc(db, "users", data.email), {
          admin: false,
          pelisID: [],
        });

        // Envía un correo de verificación al usuario
        sendEmailVerification(userCredential.user).then(() => {
          // Muestra un diálogo al usuario para informarle que se ha enviado un correo de verificación a su dirección de email
          Dialog.create({
            title: "Verificación de email",
            message: "Se ha enviado un correo de verificación a " + data.email,
            ok: true,
          });
        });

        // Desconecta al usuario de Firebase
        signOutUser();
      })
      .catch((err) => {
        Loading.hide();
        console.log(err.code);

        // Muestra una notificación con el mensaje de error correspondiente
        Notify.create({
          type: "negative",
          message: errorMSG(err.code),
        });

        // Rechaza la promesa con el mensaje de error
        reject(err.message);
      });
  });
};

export default register;
