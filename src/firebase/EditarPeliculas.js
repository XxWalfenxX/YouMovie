import { db } from "src/firebase/index"; // Importa la instancia de la base de datos de Firebase
import { doc, writeBatch } from "firebase/firestore"; // Importa las funciones necesarias para actualizar datos
import { Notify } from "quasar"; // Importa la biblioteca Quasar para mostrar notificaciones

export default async function EditarDatos(pelis) {
  const batch = writeBatch(db); // Crea una transacción batch

  pelis.forEach((peli) => {
    // Itera sobre cada película a actualizar
    batch.update(doc(db, "peliculas", peli.id), {
      // Agrega una operación de actualización al batch
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
    .commit() // Ejecuta el batch para actualizar los documentos
    .then(() => {
      console.log("Documentos actualizados exitosamente"); // Muestra un mensaje en la consola si todo sale bien
      Notify.create({
        type: "positive",
        position: "bottom-right",
        message: "Se ha actulizado la base de datos", // Crea una notificación en la parte inferior derecha de la pantalla utilizando Quasar
      });
    })
    .catch((error) => {
      console.error("Error al actualizar documentos: ", error); // Muestra un mensaje de error en la consola si algo sale mal
    });
}
