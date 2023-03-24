import { auth } from "./index.js";
import { signOut } from "firebase/auth";
import { Loading, Notify } from "quasar";

const signOutUser = () => {
  return new Promise((resolve, reject) => {
    Loading.show();

    signOut(auth)
      .then(() => {
        Loading.hide();
        resolve();
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

export default signOutUser;
