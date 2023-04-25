import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "src/firebase/index";

// Esta función guarda el ID de una película en la lista de películas del usuario en Firestore.
export default async function GuardarPeliUsuario(ID, email) {
  const docRef = doc(db, "users", email);
  const getUsuario = await getDoc(docRef);

  if (getUsuario.exists()) {
    const data = getUsuario.data();
    let pelisID = data.pelisID;

    // Verifica si la película ya está en la lista del usuario.
    // Si lo está, la elimina de la lista.
    // Si no está en la lista, la agrega a la lista.
    let result;
    if (pelisID.includes(ID)) {
      result = pelisID.filter((e) => e !== ID);
    } else {
      result = pelisID.filter((e) => e !== ID);
      result.push(ID);
    }

    // Actualiza la lista de películas del usuario en Firestore.
    await updateDoc(docRef, {
      pelisID: result,
    });
  } else {
    console.log("No such document!");
  }
}

// Esta función devuelve la lista de películas del usuario desde Firestore.
export const ListaPelis = async (email) => {
  const docRef = doc(db, "users", email);
  const getUsuario = await getDoc(docRef);
  if (getUsuario.exists()) {
    const data = getUsuario.data();
    return data;
  } else {
    console.log("No such document!");
  }
};
