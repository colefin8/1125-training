<script setup lang="ts">
import { PhConfetti, PhTrophy, PhKey } from '@phosphor-icons/vue'

defineProps<{
    secretsCount: number
}>()

const emit = defineEmits<{
    showCertificate: []
}>()

const handleShowCertificate = () => {
    emit('showCertificate')
}
</script>

<template>
    <div class="victory-content">
        <h2>
            <PhConfetti class="inline-icon" /> CONGRATULATIONS!
            <PhConfetti class="inline-icon" />
        </h2>
        <p class="victory text">You've mastered all the frontend challenges! You are now a certified Puzzle Solver!</p>

        <div class="certificate-unlock">
            <p>Ready to claim your official certificate?</p>
            <button @click="handleShowCertificate" class="certificate-btn">
                <PhKey class="inline-icon" /> Unlock Certificate
            </button>
        </div>
    </div>
</template>

<style scoped>
.victory-content {
    text-align: center;
    background: #27ae60;
    padding: 40px;
    border-radius: 20px;
    margin: 20px 0;
    box-shadow: 0 0 30px rgba(39, 174, 96, 0.5);
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.02);
    }

    100% {
        transform: scale(1);
    }
}

.victory-content h2 {
    font-size: 2.5em;
    margin: 0 0 20px 0;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.certificate-unlock {
    margin-top: 30px;
    padding: 20px;
    border-radius: 10px;
}

.certificate-btn {
    background: #FF9800 !important;
    color: white;
    padding: 15px 30px;
    font-size: 18px;
    font-weight: bold;
    margin-top: 15px;
    transition: all 0.3s;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-family: "Google Sans Code", monospace;
    font-optical-sizing: auto;
    display: inline-flex;
    align-items: center;
    gap: 8px;
}

.certificate-btn:hover {
    background: #F57C00 !important;
    transform: translateY(-2px);
}
</style>