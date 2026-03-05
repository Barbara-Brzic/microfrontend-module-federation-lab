import { createApp } from 'vue'
import './style.css'
import Orders from './Orders.vue'

function mount(el: string | Element) {
  createApp(Orders).mount(el)
}

export default { mount }
