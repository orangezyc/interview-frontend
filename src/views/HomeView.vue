<script setup lang="ts">
import { useCounterStore } from '../store'

const counter = useCounterStore()
</script>

<template>
  <div class="home">
    <h1>Vue3 + TS + Vite</h1>
    <p>count: {{ counter.count }} | double: {{ counter.doubleCount }}</p>
    <div class="btns">
      <button @click="counter.increment">+</button>
      <button @click="counter.decrement">-</button>
    </div>
  </div>
</template>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  gap: 16px;
}
.btns {
  display: flex;
  gap: 12px;
}
button {
  padding: 8px 24px;
  font-size: 18px;
  cursor: pointer;
  border-radius: 6px;
  border: 1px solid #ccc;
}
</style>
