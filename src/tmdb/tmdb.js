// https://api.themoviedb.org/3/movie/5559?api_key=2d890a918a8849421840dd697582ee3b&language=es-ES

export default async function CollectionMovie(ID) {
    const url = `https://api.themoviedb.org/3/movie/${ID}?api_key=2d890a918a8849421840dd697582ee3b&language=es-ES`
    const res = await fetch(url);
    const resJson = await res.json();
    console.log(resJson);
}