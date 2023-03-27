import { getAuth, updateProfile, onAuthStateChanged } from "firebase/auth";
import { LocalStorage, Notify } from "quasar";

const cambiarNombreUsuario = (username) => {
  if (username != "") {
    const auth = getAuth();
    updateProfile(auth.currentUser, {
      displayName: username,
    })
      .then(() => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            LocalStorage.set("user", user);
            Notify.create({
              type: "positive",
              position: "bottom-right",
              message: "Se ha actualizado el nombre de usuario",
            });
          }
        });
      })
      .catch((error) => {
        Notify.create({
          type: "negative",
          position: "bottom-right",
          message: error.message,
        });
      });
  }
};

export default cambiarNombreUsuario;
