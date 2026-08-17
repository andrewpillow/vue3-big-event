import { createPinia } from 'pinia'
import presist from 'pinia-plugin-persistedstate'

const pinia = createPinia()

pinia.use(presist)

export default pinia

// pinia独立维护
