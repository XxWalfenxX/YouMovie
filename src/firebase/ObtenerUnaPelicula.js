import { doc, getDoc } from "firebase/firestore";
import { db } from "src/firebase/index";

// Definir una función asincrónica que recibe un id como parámetro
const getUnaPelicula = async (id) => {
  // Crear una referencia a un documento específico dentro de la colección "peliculas" utilizando el id recibido
  const docRef = doc(db, "peliculas", id);

  // Obtener la información del documento utilizando la función getDoc y almacenar el resultado en una variable
  const docSnap = await getDoc(docRef);

  // Verificar si el documento existe y retornar su contenido en caso de que sí exista
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such document!");
    return null;
  }
};

// Exportar la función para que pueda ser utilizada en otras partes de la aplicación
export default getUnaPelicula;
