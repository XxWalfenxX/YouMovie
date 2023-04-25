import { auth } from "./index.js";
import { signOut } from "firebase/auth";
import { Loading, Notify } from "quasar";

// Definir la función "signOutUser" que cierra sesión en Firebase y devuelve una promesa que se resuelve cuando se cierra sesión correctamente
const signOutUser = () => {
  return new Promise((resolve, reject) => {
    // Mostrar un indicador de carga mientras se cierra sesión
    Loading.show();

    // Utilizar la función "signOut" de Firebase para cerrar sesión
    signOut(auth)
      .then(() => {
        // Ocultar el indicador de carga y resolver la promesa
        Loading.hide();
        resolve();
      })
      .catch((err) => {
        // Ocultar el indicador de carga y mostrar una notificación con el mensaje de error
        Loading.hide();
        Notify.create({
          type: "negative",
          message: err.message,
        });

        // Rechazar la promesa con el mensaje de error
        reject(err.message);
      });
  });
};

// Exportar la función "signOutUser" para que pueda ser utilizada en otros archivos
export default signOutUser;
