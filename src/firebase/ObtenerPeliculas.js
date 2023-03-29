import { collection, getDocs } from "firebase/firestore";
import { db } from "src/firebase/index";


const getPeliculas = new Promise(async (resolve, reject) => {
  const querySnapshot = await getDocs(collection(db, "peliculas"));
  let listaRadios = [];
  querySnapshot.forEach((doc) => {
    const pelicula = {
      id: doc.id,
      nombre: doc.data().nombre,
      descripcion: doc.data().descripcion,
      categorias: doc.data().categorias,
      valoracion: doc.data().valoracion,
      poster: doc.data().poster,
      imagenFondo: doc.data().imagenFondo,
      logo: doc.data().logo,
      linkVideostation: doc.data().linkVideostation,
    };
    listaRadios.push(pelicula);
  });
  resolve(listaRadios);
});

export default getPeliculas;
