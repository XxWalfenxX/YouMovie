import { auth } from "./index.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Loading, Notify } from "quasar";
import signOutUser from "./firebase-signout.js";
const login = (data) => {
  return new Promise((resolve, reject) => {
    Loading.show();
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        Loading.hide();
        if (userCredential.user.emailVerified == true) {
          resolve(userCredential.user);
        } else {
          signOutUser();
        }
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
export default login;
