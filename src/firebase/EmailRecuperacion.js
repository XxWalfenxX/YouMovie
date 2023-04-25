import { auth } from "src/firebase/index";
import { sendPasswordResetEmail } from "firebase/auth";
import { Notify } from "quasar";

export default function restablecerPass(email) {
  sendPasswordResetEmail(auth, email) // Envía el correo de restablecimiento de contraseña al correo electrónico proporcionado
    .then(() => {
      // Si la función se completa correctamente, muestra una notificación de éxito
      Notify.create({
        type: "positive",
        position: "bottom-right",
        message: "Se ha enviado un correo a " + email, // Muestra un mensaje indicando que se ha enviado un correo electrónico al usuario
      });
    })
    .catch((error) => {
      // Si la función falla, muestra un mensaje de error
      const errorCode = error.code; // Obtiene el código de error (si existe)
      const errorMessage = error.message; // Obtiene el mensaje de error (si existe)
    });
}
