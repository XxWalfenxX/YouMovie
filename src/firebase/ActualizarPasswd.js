import { getAuth, updatePassword } from "firebase/auth";
import { Notify } from "quasar";

const actualizarPasswd = (newPassword) => {
  const auth = getAuth();
  const user = auth.currentUser;

  updatePassword(user, newPassword)
    .then(() => {
      Notify.create({
        type: "positive",
        position: "bottom-right",
        message: "Se ha actualizado la contraseña",
      });
    })
    .catch((error) => {
      Notify.create({
        type: "negative",
        position: "bottom-right",
        message: error.message,
      });
    });
};

export default actualizarPasswd;
