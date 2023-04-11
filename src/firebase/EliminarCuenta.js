import { db, auth } from "./index.js";
import { doc, deleteDoc } from "firebase/firestore";
import { deleteUser } from "firebase/auth";

export default async function EliminarUsuario(email) {
  const user = auth.currentUser;
  await deleteDoc(doc(db, "users", email))
    .then(() => {
      deleteUser(user)
        .then((u) => {
          return true;
        })
        .catch((error) => {
          return false;
        });
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
}
