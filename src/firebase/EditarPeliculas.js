import { db } from "src/firebase/index";
import { doc, writeBatch } from "firebase/firestore";
import { Notify } from "quasar";

export default async function EditarDatos(pelis) {
  const batch = writeBatch(db);

  pelis.forEach((peli) => {
    batch.update(doc(db, "peliculas", peli.id), {
      id: peli.id,
      nombre: peli.nombre,
      descripcion: peli.descripcion,
      categorias: peli.categorias,
      valoracion: peli.valoracion,
      poster: peli.poster,
      imagenFondo: peli.imagenFondo,
      logo: peli.logo,
      linkVideostation: peli.linkVideostation,
    });
  });

  await batch
    .commit()
    .then(() => {
      console.log("Documentos actualizados exitosamente");
      Notify.create({
        type: "positive",
        position: "bottom-right",
        message: "Se ha actulizado la base de datos",
      });
    })
    .catch((error) => {
      console.error("Error al actualizar documentos: ", error);
    });
}
