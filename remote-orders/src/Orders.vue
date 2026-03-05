<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Button from 'primevue/button'

enum OrderStatus {
  PENDING = 'pending',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
}

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
  status: OrderStatus
  createdAt: string
}

const orders = ref<Order[]>([])

onMounted(() => {
  const state = globalThis.history.state as { usr: { orders?: Order[] } }
  if (state.usr && state.usr.orders) {
    orders.value = state.usr.orders
  }
})

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString()
}

const getButtonLabel = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.PENDING:
      return 'Pending'
    case OrderStatus.SHIPPED:
      return 'Shipped'
    case OrderStatus.DELIVERED:
      return 'Delivered'
    default:
      return 'Unknown'
  }
}
</script>

<template>
  <div class="p-4">
    <h2 class="text-2xl font-bold mb-4">Orders</h2>

    <div v-if="orders.length === 0" class="text-gray-500">
      No orders yet. Add products to cart and place an order.
    </div>

    <div v-else class="flex flex-col space-y-6">
      <div v-for="order in orders" :key="order.id" class="border rounded-lg p-4">
        <div class="flex justify-between items-center mb-3">
          <h3 class="text-lg font-semibold">Order {{ order.id }}</h3>
          <span class="text-sm text-gray-500">{{ formatDate(order.createdAt) }}</span>
        </div>
        <div class="divide-y">
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
        <div class="flex justify-end mt-4">
          <Button>{{ getButtonLabel(order.status) }}</Button>
        </div>
      </div>
    </div>
  </div>
</template>
