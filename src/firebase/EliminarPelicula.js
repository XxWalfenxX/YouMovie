import { db } from "src/firebase/index";
import { doc, deleteDoc } from "firebase/firestore";
import { Notify } from "quasar";

export default async function EliminarID(ID) {
  await deleteDoc(doc(db, "peliculas", ID)) // Eliminar el documento con el ID especificado de la colección "peliculas"
    .then(() => {
      // Si la eliminación es exitosa, mostrar una notificación positiva al usuario
      Notify.create({
        type: "positive",
        position: "bottom-right",
        message: "Se ha eliminado la pelicula",
      });
    });
}
