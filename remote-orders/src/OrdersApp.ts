import { createApp } from 'vue'
import Orders from './Orders.vue'

function mount(el: string | Element) {
  createApp(Orders).mount(el)
}

export default { mount }
