<template>
  <button id="hidden-btn" @click="handleClick" :class="['hidden-button', { visible: isVisible }]">
    Found me!
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';

const emit = defineEmits<{
  complete: []
}>()

const isVisible = ref(false);
const randomTop = ref(0);
const randomLeft = ref(0);

const setRandomPosition = async () => {
  await nextTick();

  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  const buttonWidth = 220;
  const buttonHeight = 80;

  const margin = 20;

  const maxTop = Math.max(0, viewportHeight - buttonHeight - margin);
  const maxLeft = Math.max(0, viewportWidth - buttonWidth - margin);

  const minTop = margin;
  const minLeft = margin;

  randomTop.value = Math.floor(Math.random() * (maxTop - minTop)) + minTop;
  randomLeft.value = Math.floor(Math.random() * (maxLeft - minLeft)) + minLeft;
};

const handleClick = () => {
  isVisible.value = true;
  emit('complete')
}

onMounted(() => {
  setRandomPosition();
});
</script>

<style scoped>
.hidden-button {
  position: fixed;
  top: v-bind(randomTop + 'px');
  left: v-bind(randomLeft + 'px');
  opacity: 0;
  padding: 15px 30px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  z-index: 1000;
  min-width: max-content;
  transform: translate3d(0, 0, 0);
}

.visible {
  opacity: 1;
  transition: opacity 0.5s ease-in;
}
</style>