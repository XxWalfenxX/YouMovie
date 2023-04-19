import { db } from "src/firebase/index";
import { doc, updateDoc } from "firebase/firestore";

export default async function EditarDatos(pelis) {
  //const batch = db.batch();
  pelis.forEach(async (peli) => {
    console.log(peli.nombre);
    const washingtonRef = doc(db, "peliculas", peli.id);
    await updateDoc(washingtonRef, {
      id: parseInt(peli.id, 10),
      nombre: peli.nombre,
      descripcion: peli.descripcion,
      categorias: peli.categorias,
      valoracion: parseInt(peli.valoracion, 10),
      poster: peli.poster,
      imagenFondo: peli.imagenFondo,
      logo: peli.logo,
      linkVideostation: peli.linkVideostation,
    });
  });
}
