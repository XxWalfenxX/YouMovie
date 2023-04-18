import { db } from "src/firebase/index";
import { doc, deleteDoc } from "firebase/firestore";
import { Notify } from "quasar";

export default async function EliminarID(ID) {
    await deleteDoc(doc(db, "peliculas", ID)).then(() => {
        Notify.create({
            type: "positive",
            position: "bottom-right",
            message: "Se ha eliminado la pelicula",
          });
    });
}