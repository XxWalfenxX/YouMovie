// Importar los módulos necesarios de Firebase
import { doc, getDoc } from "firebase/firestore";
import { db } from "./index.js";

// Función para verificar si un usuario es administrador
const AdminAuth = async (email) => {
  // Obtener una referencia al documento del usuario en la colección "users" de Firestore
  const docRef = doc(db, "users", email);

  // Obtener una instantánea del documento
  const docSnap = await getDoc(docRef);

  // Verificar si el documento existe y si el usuario es administrador
  if (docSnap.exists()) {
    return docSnap.data().admin;
  } else {
    return false;
  }
};

// Exportar la función para que pueda ser utilizada desde otros módulos
export default AdminAuth;
