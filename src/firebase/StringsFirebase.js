export function errorMSG(mensaje) {
  switch (mensaje) {
    case "auth/email-already-in-use":
      return "Este correo ya está en uso";
    case "auth/internal-error":
      return "Error interno";
    case "auth/invalid-email":
      return "Correo electrónico invalido";
    case "auth/user-not-found":
      return "Usuario no encontrado"
    case "auth/wrong-password":
      return "La contraseña es incorrecta"
    case "auth/admin-restricted-operation":
      return "Operación restringida o los campos están vacios"
    case "auth/weak-password":
      return "La contraseña debe incluir como mínimo 6 caracteres"
    case "auth/missing-email":
      return "Introduce un correo electrónico"
    default:
      return mensaje;
  }
}
