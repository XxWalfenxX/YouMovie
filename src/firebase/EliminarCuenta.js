// Importación de las dependencias necesarias
import { db, auth } from "./index.js";
import { doc, deleteDoc } from "firebase/firestore";
import { deleteUser } from "firebase/auth";

// Función asincrónica que elimina un usuario y su información de la base de datos
export default async function EliminarUsuario(email) {
  // Obtener el usuario actual
  const user = auth.currentUser;

  // Borrar el documento del usuario de la colección "users" de la base de datos
  await deleteDoc(doc(db, "users", email))
    .then(() => {
      // Si se eliminó el documento exitosamente, borrar la cuenta del usuario
      deleteUser(user)
        .then((u) => {
          // Si se borra la cuenta del usuario exitosamente, devolver verdadero
          return true;
        })
        .catch((error) => {
          // Si ocurre un error al borrar la cuenta del usuario, devolver falso
          return false;
        });
    })
    .catch((err) => {
      // Si ocurre un error al borrar el documento del usuario, devolver falso
      console.log(err);
      return false;
    });
}
