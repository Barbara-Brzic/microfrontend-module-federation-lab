<script setup lang="ts">
import { computed } from 'vue'
import Timeline from 'primevue/timeline'
import Button from 'primevue/button'

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

interface Props {
  order: Order
}

type Emits = (e: 'statusChange', orderId: string, newStatus: 'shipped' | 'delivered') => void

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const timelineEvents = computed(() => {
  const events = [
    {
      status: 'Placed',
      date: props.order.createdAt,
      icon: 'pi pi-shopping-cart',
      color: '#22c55e',
    },
  ]

  if (props.order.shippedAt) {
    events.push({
      status: 'Shipped',
      date: props.order.shippedAt,
      icon: 'pi pi-send',
      color: '#3b82f6',
    })
  }

  if (props.order.deliveredAt) {
    events.push({
      status: 'Delivered',
      date: props.order.deliveredAt,
      icon: 'pi pi-check-circle',
      color: '#8b5cf6',
    })
  }

  return events
})

const nextStatus = computed(() => {
  if (props.order.status === 'placed') return 'shipped'
  if (props.order.status === 'shipped') return 'delivered'
  return null
})

const nextStatusLabel = computed(() => {
  if (nextStatus.value === 'shipped') return 'Mark as Shipped'
  if (nextStatus.value === 'delivered') return 'Mark as Delivered'
  return 'Completed'
})

const handleStatusChange = () => {
  if (nextStatus.value) {
    emit('statusChange', props.order.id, nextStatus.value)
  }
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString()
}
</script>

<template>
  <div class="order-timeline grid grid-cols-[auto_1fr] gap-6 items-start">
    <div class="flex items-start pt-2">
      <div v-if="nextStatus">
        <Button
          :label="nextStatusLabel"
          icon="pi pi-arrow-right"
          @click="handleStatusChange"
          size="small"
          severity="secondary"
        />
      </div>
      <div v-else>
        <span class="text-sm text-green-600 font-medium">
          <i class="pi pi-check-circle mr-1"></i>
          Order completed
        </span>
      </div>
    </div>

    <div>
      <Timeline :value="timelineEvents" align="left" class="customized-timeline">
        <template #marker="slotProps">
          <span
            class="flex w-8 h-8 items-center justify-center text-white rounded-full z-10 shadow-sm"
            :style="{ backgroundColor: slotProps.item.color }"
          >
            <i :class="slotProps.item.icon"></i>
          </span>
        </template>
        <template #content="slotProps">
          <div class="ml-3">
            <div class="font-semibold">{{ slotProps.item.status }}</div>
            <div class="text-sm text-gray-500">{{ formatDate(slotProps.item.date) }}</div>
          </div>
        </template>
      </Timeline>
    </div>
  </div>
</template>

<style scoped>
.order-timeline :deep(.p-timeline-event-content) {
  padding-bottom: 1rem;
}
</style>
