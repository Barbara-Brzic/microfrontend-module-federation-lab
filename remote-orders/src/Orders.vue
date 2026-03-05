<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Product {
  id: number
  name: string
  description: string
}

interface CartItem {
  product: Product
  quantity: number
}

const orderItems = ref<CartItem[]>([])

onMounted(() => {
  // Access router state from history
  const state = globalThis.history.state as { usr: { orderItems?: CartItem[] } }
  if (state.usr && state.usr.orderItems) {
    orderItems.value = state.usr.orderItems
  }
})
</script>

<template>
  <div class="p-4">
    <h2 class="text-2xl font-bold mb-4">Orders</h2>

    <div v-if="orderItems.length === 0" class="text-gray-500">
      No orders yet. Add products to cart and place an order.
    </div>

    <div v-else class="space-y-4">
      <h3 class="text-xl font-semibold">Current Order</h3>
      <div class="border rounded-lg p-4 divide-y">
        <div
          v-for="item in orderItems"
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
    </div>
  </div>
</template>
