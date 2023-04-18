import { db } from "src/firebase/index";
import { doc } from "firebase/firestore";

export default async function EliminarID(ID) {
    await deleteDoc(doc(db, "cities", ID));
}