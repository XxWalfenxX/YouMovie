// Importa las bibliotecas necesarias
import { doc, setDoc } from "firebase/firestore";
import { Notify } from "quasar";
import { db } from "src/firebase/index";

// Define una función asincrónica llamada "CollectionMovie" que toma dos argumentos, "ID" y "linkSynology"
export default async function CollectionMovie(ID, linkSynology) {
  // Crea URLs para obtener información sobre la película y su logotipo de The Movie Database API
  const url = `https://api.themoviedb.org/3/movie/${ID}?api_key=${process.env.TMDB_API_KEY}&language=es-ES`;
  const urlLogo = `https://api.themoviedb.org/3/movie/${ID}/images?api_key=${process.env.TMDB_API_KEY}&language=en`;
  const urlLogo2 = `https://api.themoviedb.org/3/movie/${ID}/images?api_key=${process.env.TMDB_API_KEY}`;

  // Realiza una solicitud a la API de TMDB para obtener información sobre la película
  const res = await fetch(url);
  const resJson = await res.json();

  // Realiza una solicitud a la API de TMDB para obtener información sobre el logotipo de la película
  const resLogo = await fetch(urlLogo);
  const resLogoJson = await resLogo.json();

  // Realiza otra solicitud a la API de TMDB para obtener información sobre el logotipo de la película en caso de que la primera solicitud no tenga ningún resultado
  const resLogo2 = await fetch(urlLogo2);
  const resLogoJson2 = await resLogo2.json();

  // Determina la ruta de archivo del logotipo de la película
  let filePath;
  if (typeof resLogoJson.logos[0] === "undefined") {
    filePath = resLogoJson2.logos[0].file_path;
  } else {
    filePath = resLogoJson.logos[0].file_path;
  }

  // Agrega la película a la base de datos de Firebase
  await setDoc(doc(db, "peliculas", ID), {
    id: resJson.id,
    nombre: resJson.title,
    descripcion: resJson.overview,
    categorias: resJson.genres,
    valoracion: resJson.vote_average,
    poster:
      "https://image.tmdb.org/t/p/w220_and_h330_face" + resJson.poster_path,
    imagenFondo:
      "https://www.themoviedb.org/t/p/original" + resJson.backdrop_path,
    logo: "https://www.themoviedb.org/t/p/original" + filePath,
    linkVideostation: linkSynology,
  }).then(() => {
    // Notifica al usuario que la película se ha agregado correctamente
    Notify.create({
      type: "positive",
      position: "bottom-right",
      message: "Se ha agregado la pelicula",
    });
  });
}
