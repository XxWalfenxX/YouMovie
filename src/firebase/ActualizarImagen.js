// Importar los módulos necesarios de Firebase y Quasar
import { storage } from "src/firebase/index";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth, updateProfile, onAuthStateChanged } from "firebase/auth";
import { LocalStorage, Notify } from "quasar";

// Función para cambiar la imagen de perfil del usuario
const cambiarImagenCuenta = (evt, user) => {
  // Obtener el objeto auth de Firebase
  const auth = getAuth();
  // Crear un objeto FormData a partir del evento que ha provocado la llamada a esta función
  const formData = new FormData(evt.target);
  // Crear una referencia a la imagen que se va a subir, que se almacenará en "/user-img/[email del usuario]"
  const imgRef = "/user-img/" + user.email;
  // Variable que almacenará la URL de la imagen subida
  var imgURL = "";

  // Iterar sobre los elementos del objeto FormData
  for (const [name, value] of formData.entries()) {
    // Comprobar si el valor actual es un fichero
    if (value.name.length > 0) {
      // Subir el fichero a Firebase Storage
      uploadBytes(ref(storage, imgRef), value).then((snapshot) => {
        // Obtener la URL de descarga de la imagen subida
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          imgURL = downloadURL;
          // Actualizar la imagen de perfil del usuario en Firebase Authentication
          updateProfile(auth.currentUser, {
            photoURL: imgURL,
          }).then(() => {
            // Actualizar el estado del usuario en LocalStorage
            onAuthStateChanged(auth, (user) => {
              if (user) {
                LocalStorage.set("user", user);
              }
            });
            // Mostrar una notificación de éxito al usuario
            Notify.create({
              type: "positive",
              position: "bottom-right",
              message: "Se ha actualizado la foto de perfil",
            });
          });
        });
      });
    }
  }
};

// Exportar la función para que pueda ser utilizada desde otros módulos
export default cambiarImagenCuenta;
