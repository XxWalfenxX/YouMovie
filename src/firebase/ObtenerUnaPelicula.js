import { doc, getDoc } from "firebase/firestore";
import { db } from "src/firebase/index";

const getUnaPelicula = async (id) => {
  const docRef = doc(db, "peliculas", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such document!");
    return null;
  }
}

export default getUnaPelicula;
