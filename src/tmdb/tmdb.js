// https://api.themoviedb.org/3/movie/5559?api_key=2d890a918a8849421840dd697582ee3b&language=es-ES
import { doc, setDoc } from "firebase/firestore";

import { db } from "src/firebase/index";

export default async function CollectionMovie(ID, linkSynology) {
  const url = `https://api.themoviedb.org/3/movie/${ID}?api_key=2d890a918a8849421840dd697582ee3b&language=es-ES`;
  const urlLogo = `https://api.themoviedb.org/3/movie/${ID}/images?api_key=2d890a918a8849421840dd697582ee3b`
  const res = await fetch(url);
  const resJson = await res.json();
  const resLogo = await fetch(urlLogo)
  const resLogoJson = await resLogo.json()

   await setDoc(doc(db, "peliculas", ID), {
      id: resJson.id,
      nombre: resJson.title,
      descripcion: resJson.overview,
      categorias: resJson.genres,
      valoracion: resJson.vote_average,
      poster: "https://image.tmdb.org/t/p/w220_and_h330_face"+resJson.poster_path,
      imagenFondo: "https://www.themoviedb.org/t/p/original"+resJson.backdrop_path,
      logo: "https://www.themoviedb.org/t/p/original"+resLogoJson.logos[0].file_path,
      linkVideostation: linkSynology
    });
}
