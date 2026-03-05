import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import 'primeicons/primeicons.css'
import Orders from './Orders.vue'

function mount(el: string | Element) {
  const app = createApp(Orders)
  app.use(PrimeVue, {
    theme: {
      preset: Aura,
    },
  })
  app.mount(el)
}

export default { mount }
