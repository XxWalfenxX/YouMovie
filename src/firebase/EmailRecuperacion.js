import { auth } from "src/firebase/index";
import { sendPasswordResetEmail } from "firebase/auth";
import { Notify } from "quasar";

export default function restablecerPass(email) {
  sendPasswordResetEmail(auth, email)
    .then(() => {
      Notify.create({
        type: "positive",
        position: "bottom-right",
        message: "Se ha enviado un correo a " + email,
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
}
