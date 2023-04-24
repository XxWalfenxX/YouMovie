import globals from 'src/globals';
import { boot } from 'quasar/wrappers'
export default boot(({ app }) => {
  app.config.globalProperties.$globals = globals;
})