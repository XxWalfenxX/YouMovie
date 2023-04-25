import { collection, getDocs } from "firebase/firestore";
import { db } from "src/firebase/index";
const getPeliculas = new Promise(async (resolve, reject) => {
  // Crea una promesa para obtener las películas
  const querySnapshot = await getDocs(collection(db, "peliculas")); // Obtiene una instantánea de la colección de documentos de "peliculas" y la guarda en la constante querySnapshot
  let listaRadios = []; // Crea un arreglo vacío para almacenar las películas
  querySnapshot.forEach((doc) => {
    // Itera sobre cada documento en querySnapshot
    const pelicula = {
      // Crea un objeto pelicula para cada documento
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
    listaRadios.push(pelicula); // Agrega el objeto pelicula al arreglo listaRadios
  });
  resolve(listaRadios); // Resuelve la promesa con el arreglo de películas
});

export default getPeliculas; // Exporta la función getPeliculas para su uso en otros archivos del proyecto
