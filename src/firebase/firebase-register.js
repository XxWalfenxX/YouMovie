import { auth } from "./index.js";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Loading, Notify } from "quasar";
import { doc, setDoc } from "firebase/firestore";
import { db } from "src/firebase/index";

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

        Loading.hide();
        resolve(userCredential.user);
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
