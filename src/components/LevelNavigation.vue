<script setup lang="ts">
import { PhArrowCounterClockwise } from '@phosphor-icons/vue'
import type { Level } from '../config/levels'

defineProps<{
    levels: Level[]
    currentLevel: number
    unlockedLevels: number[]
    allLevelsCompleted: boolean
    showVictoryScreen: boolean
}>()

const emit = defineEmits<{
    changeLevel: [index: number]
    backToLevels: []
}>()

const handleChangeLevel = (index: number) => {
    emit('changeLevel', index)
}

const handleBackToLevels = () => {
    emit('backToLevels')
}
</script>

<template>
    <div class="level-nav">
        <!-- Show Back to Levels button when victory screen is showing -->
        <button v-if="allLevelsCompleted && showVictoryScreen" @click="handleBackToLevels"
            class="back-to-levels-nav-btn" title="Return to Level Navigation">
            <PhArrowCounterClockwise class="inline-icon" /> Back to Levels
        </button>

        <!-- Show regular level buttons when not on victory screen -->
        <template v-else>
            <button v-for="(level, index) in levels" :key="level.id" @click="handleChangeLevel(index)" :class="{
                active: index === currentLevel,
                completed: level.completed.value,
                locked: !unlockedLevels.includes(index)
            }" :disabled="!unlockedLevels.includes(index)">
                {{ index + 1 }}
            </button>
        </template>
    </div>
</template>

<style scoped>
.level-nav {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 30px;
}

.level-nav button {
    width: 50px;
    height: 50px;
    border: none;
    border-radius: 50%;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s;
    background: rgba(255, 255, 255, 0.2);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
}

.level-nav button:hover:not(:disabled) {
    transform: scale(1.1);
}

.level-nav button.completed:hover {
    background: #45a049 !important;
    transform: scale(1.1);
}

.level-nav button.active {
    transform: scale(1.2);
}

.level-nav button.active.completed {
    background: #4CAF50 !important;
    transform: scale(1.2);
}

.level-nav button.completed {
    background: #4CAF50;
}

.level-nav button.locked {
    background: rgba(255, 255, 255, 0.1);
    cursor: not-allowed;
    opacity: 0.5;
}

.back-to-levels-nav-btn {
    background: #2196F3 !important;
    color: white !important;
    padding: 12px 24px !important;
    border-radius: 25px !important;
    font-size: 16px !important;
    font-weight: bold;
    width: auto !important;
    height: auto !important;
    min-width: 200px;
    display: flex;
    align-items: center;
    gap: 8px;
    justify-content: center;
}

.back-to-levels-nav-btn:hover {
    background: #1976D2 !important;
    transform: translateY(-2px);
}
</style>