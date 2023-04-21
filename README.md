# YouMovie (youmovie)

Ver peliculas online

## Instalar las dependencias

```bash
yarn
# o
npm install
```

### Configura las variables de entorno (API KEYS)
```bash
cp .env.dist .env
```
Edita el archivo .env y agrega las claves:
- [TMDB](https://www.themoviedb.org/settings/api)
### Inicie la aplicación en modo de desarrollo (recarga de código activo, informe de errores, etc.)

```bash
quasar dev
```

### Limpiar los archivos

```bash
yarn lint
# o
npm run lint
```

### Formatear los archivos

```bash
yarn format
# o
npm run format
```

### Crear la aplicación para producción

```bash
quasar build
```

### Personalizar la configuración

Véase [Configuración quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).
