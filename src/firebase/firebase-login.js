import { auth } from "./index.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Loading, Notify } from "quasar";
const login = (data) => {
  return new Promise((resolve, reject) => {
    Loading.show();
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
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
export default login;
