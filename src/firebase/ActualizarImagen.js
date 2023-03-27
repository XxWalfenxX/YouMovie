import { storage } from "src/firebase/index";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth, updateProfile, onAuthStateChanged } from "firebase/auth";
import { LocalStorage, Notify } from "quasar";

const cambiarImagenCuenta = (evt, user) => {
  const auth = getAuth();
  const formData = new FormData(evt.target);
  const imgRef = "/user-img/" + user.email;
  var imgURL = "";

  for (const [name, value] of formData.entries()) {
    if (value.name.length > 0) {
      // Subir fichero
      uploadBytes(ref(storage, imgRef), value).then((snapshot) => {
        // Conseguir link imagen
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          imgURL = downloadURL;
          // Cambiar imagen en la cuenta
          updateProfile(auth.currentUser, {
            photoURL: imgURL,
          }).then(() => {
            onAuthStateChanged(auth, (user) => {
              if (user) {
                LocalStorage.set("user", user);
              }
            });
            Notify.create({
              type: "positive",
              position: "bottom-right",
              message: "Se ha actulizado la foto de perfil",
            });
          });
        });
      });
    }
  }
};

export default cambiarImagenCuenta;
