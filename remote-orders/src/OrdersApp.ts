import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import 'primeicons/primeicons.css'
import Orders from './Orders.vue'

function mount(el: string | Element, props = {}) {
  const app = createApp(Orders, props)
  app.use(PrimeVue, {
    theme: {
      preset: Aura,
    },
  })
  app.mount(el)

  return () => {
    app.unmount()
  }
}

export default { mount }
