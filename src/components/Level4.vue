<template>
  <div class="event-challenge">
    <div id="mystery-box" class="mystery-box">
      <PhGift />
      <span class="box-text">Mystery Box</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PhGift } from '@phosphor-icons/vue'
</script>

<style scoped>
.event-challenge {
  text-align: center;
}

.mystery-box {
  width: 150px;
  height: 150px;
  background: #27ae60;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px auto;
  border-radius: 15px;
  cursor: pointer;
  transition: transform 0.3s;
  border: 1px solid white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  gap: 8px;
}

.mystery-box:hover {
  transform: scale(1.05);
}

.box-text {
  font-size: 14px;
  font-weight: bold;
  text-align: center;
}
</style>