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

const register = (data) => {
  return new Promise((resolve, reject) => {
    Loading.show();

    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        updateProfile(userCredential.user, {
          displayName: data.name,
        });
        setDoc(doc(db, "users", data.email), {
          admin: false,
          pelisID: [],
        });
        sendEmailVerification(userCredential.user).then(() => {
          Dialog.create({
            title: "Verificación de email",
            message: "Se ha enviado un correo de verificación a " + data.email,
            ok: true
           })
        });
        signOutUser();
      })
      .catch((err) => {
        Loading.hide();
        Notify.create({
          type: "negative",
          message: err.message,
        });
        reject(err.message);
      });
  });
};

export default register;
