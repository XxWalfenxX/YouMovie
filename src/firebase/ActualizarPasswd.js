// Importar los módulos necesarios de Firebase y Quasar
import { auth } from "./index";
import { updatePassword } from "firebase/auth";
import { Notify } from "quasar";

// Función para actualizar la contraseña del usuario
const actualizarPasswd = (newPassword) => {
  // Obtener el objeto auth de Firebase y el usuario actual
  const user = auth.currentUser;

  // Actualizar la contraseña del usuario actual en Firebase Authentication
  updatePassword(user, newPassword)
    .then(() => {
      // Mostrar una notificación de éxito al usuario
      Notify.create({
        type: "positive",
        position: "bottom-right",
        message: "Se ha actualizado la contraseña",
      });
    })
    .catch((error) => {
      // Mostrar una notificación de error al usuario si se produce un error al actualizar la contraseña
      Notify.create({
        type: "negative",
        position: "bottom-right",
        message: error.message,
      });
    });
};

// Exportar la función para que pueda ser utilizada desde otros módulos
export default actualizarPasswd;
