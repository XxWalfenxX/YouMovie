import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "src/firebase/index";

export default async function GuardarPeliUsuario(ID, email) {
  const docRef = doc(db, "users", email);
  const getUsuario = await getDoc(docRef);

  if (getUsuario.exists()) {
    const data = getUsuario.data();
    let pelisID = data.pelisID;

    
    let result;
    if (pelisID.includes(ID)) {
      result = pelisID.filter((e) => e !== ID);
    } else {
      result = pelisID.filter((e) => e !== ID);
      result.push(ID);
    }

    await updateDoc(docRef, {
      pelisID: result,
    });
  } else {
    console.log("No such document!");
  }
}

export const ListaPelis = async (email) => {
  const docRef = doc(db, "users", email);
  const getUsuario = await getDoc(docRef);
  if (getUsuario.exists()) {
    const data = getUsuario.data();
    return data
  } else {
    console.log("No such document!");
  }
}
