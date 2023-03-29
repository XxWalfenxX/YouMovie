import { doc, getDoc } from "firebase/firestore";
import { db } from "./index.js";

const AdminAuth = async (email) => {
    const docRef = doc(db, "users", email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data().admin;
    } else {
        return false
    }
};

export default AdminAuth;
