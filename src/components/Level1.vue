<template>
  <div class="css-challenge">
    <div data-puzzle="level1">Target me with CSS!</div>
    <div data-puzzle="level1">Me too!</div>
    <div data-puzzle="other">Not me though</div>
    <button @click="$emit('complete')" class="check-btn">Check Solution</button>
  </div>
</template>

<script setup lang="ts">
defineEmits<{
  complete: []
}>()
</script>

<style scoped>
.css-challenge div[data-puzzle="level1"] {
  padding: 20px;
  margin: 10px 0;
  border: 1px dashed white;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.css-challenge div[data-puzzle="other"] {
  padding: 20px;
  margin: 10px 0;
  border: 1px dashed #666;
  border-radius: 8px;
  opacity: 0.5;
  background: rgba(102, 102, 102, 0.05);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.check-btn {
  background: #4CAF50;
  margin-top: 15px;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s;
}

.check-btn:hover {
  background: #45a049;
  transform: translateY(-2px);
}
</style>