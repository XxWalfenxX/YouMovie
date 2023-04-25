import { auth } from "./index.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Loading, Notify, Dialog } from "quasar";
import signOutUser from "./firebase-signout.js";
import { errorMSG } from "./StringsFirebase.js";

const login = (data) => {
  return new Promise((resolve, reject) => {
    Loading.show();
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        Loading.hide();
        if (userCredential.user.emailVerified == true) {
          resolve(userCredential.user);
        } else {
          Dialog.create({
            title: "Verificación de email",
            message: "Por favor verifica tu correo electrónico",
            ok: true
           })
          signOutUser();
        }
      })
      .catch((err) => {
        Loading.hide();
        Notify.create({
          type: "negative",
          message: errorMSG(err.code) ,
        });
        reject(err.message);
      });
  });
};
export default login;
