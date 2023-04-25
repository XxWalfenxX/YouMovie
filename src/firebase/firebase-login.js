import { auth } from "./index.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Loading, Notify, Dialog } from "quasar";
import signOutUser from "./firebase-signout.js";
import { errorMSG } from "./StringsFirebase.js";

// Esta función recibe un objeto que contiene el email y la contraseña del usuario.
// Devuelve una Promesa que se resuelve con el objeto de usuario o se rechaza con un mensaje de error.
const login = (data) => {
  return new Promise((resolve, reject) => {
    // Muestra un indicador de carga mientras el usuario inicia sesión.
    Loading.show();

    // Usa la función signInWithEmailAndPassword de Firebase para iniciar sesión con el usuario.
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // Oculta el indicador de carga.
        Loading.hide();

        // Si el correo electrónico del usuario está verificado, resuelve la Promesa con el objeto de usuario.
        if (userCredential.user.emailVerified == true) {
          resolve(userCredential.user);
        } else {
          // Si el correo electrónico del usuario no está verificado, muestra un cuadro de diálogo que les pide que verifiquen su correo electrónico.
          Dialog.create({
            title: "Verificación de email",
            message: "Por favor verifica tu correo electrónico",
            ok: true,
          });

          // Cierra la sesión del usuario en Firebase y rechaza la Promesa.
          signOutUser();
        }
      })
      .catch((err) => {
        // Oculta el indicador de carga.
        Loading.hide();

        // Muestra una notificación con el mensaje de error.
        Notify.create({
          type: "negative",
          message: errorMSG(err.code),
        });

        // Rechaza la Promesa con el mensaje de error.
        reject(err.message);
      });
  });
};

// Exporta la función de inicio de sesión para que se pueda usar en otros archivos.
export default login;
