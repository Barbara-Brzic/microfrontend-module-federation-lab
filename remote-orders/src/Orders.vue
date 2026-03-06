<script setup lang="ts">
import { ref, onMounted } from 'vue'
import OrderTimeline from './components/OrderTimeline.vue'

interface Product {
  id: number
  name: string
  description: string
}

interface CartItem {
  product: Product
  quantity: number
}

interface Order {
  id: string
  items: CartItem[]
  createdAt: string
  shippedAt?: string
  deliveredAt?: string
  status: 'placed' | 'shipped' | 'delivered'
}

const props = defineProps<{
  orders?: Order[]
}>()

const orders = ref<Order[]>(props.orders || [])

onMounted(() => {
  if (props.orders) {
    orders.value = props.orders.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  }
})

const handleStatusChange = (orderId: string, newStatus: 'shipped' | 'delivered') => {
  const order = orders.value.find(o => o.id === orderId)
  if (!order) return

  const now = new Date().toISOString()

  if (newStatus === 'shipped') {
    order.shippedAt = now
    order.status = 'shipped'
  } else if (newStatus === 'delivered') {
    order.deliveredAt = now
    order.status = 'delivered'
  }

  globalThis.dispatchEvent(
    new CustomEvent('order:statusUpdate', {
      detail: { orderId, status: newStatus, timestamp: now },
    })
  )
}

const calculateTotalItems = (order: Order) => {
  return order.items.reduce((acc, a) => acc + a.quantity, 0)
}
</script>

<template>
  <div class="p-4">
    <h2 class="text-2xl font-bold mb-4">Orders</h2>

    <div v-if="orders.length === 0" class="text-gray-500">
      No orders yet. Add products to cart and place an order.
    </div>

    <div v-else class="flex flex-col space-y-6">
      <div v-for="order in orders" :key="order.id" class="border rounded-lg p-6">
        <h3 class="text-lg font-semibold mb-4">Order {{ order.id }}</h3>

        <div class="grid md:grid-cols-2 gap-6">
          <div>
            <h4 class="text-sm font-medium text-gray-500 mb-3">Items</h4>
            <div>
              <div
                v-for="item in order.items"
                :key="item.product.id"
                class="flex justify-between items-center py-2"
              >
                <div>
                  <div class="font-medium">{{ item.product.name }}</div>
                  <div class="text-sm text-gray-600">{{ item.product.description }}</div>
                </div>
                <div class="text-gray-700">Qty: {{ item.quantity }}</div>
              </div>
            </div>
            <div class="border-t pt-4 flex justify-between items-center">
              <p class="font-semibold">Total items:</p>
              <p>
                <span>Qty: </span>
                <span class="font-semibold">
                  {{ calculateTotalItems(order) }}
                </span>
              </p>
            </div>
          </div>

          <div class="border-l pl-4">
            <h4 class="text-sm font-medium text-gray-500 mb-3">Order Status</h4>
            <OrderTimeline :order="order" @status-change="handleStatusChange" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
