<script setup lang="ts">
import { PhKey } from '@phosphor-icons/vue'

defineProps<{
    secrets: string[]
}>()
</script>

<template>
    <div v-if="secrets.length > 0" class="secrets-panel">
        <h3>
            <PhKey class="inline-icon" /> Secrets Discovered
        </h3>
        <div v-for="(secret, index) in secrets" :key="secret" class="secret">
            <div class="secret-content">
                <span class="secret-text">{{ secret }}</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.secrets-panel {
    background: rgba(255, 193, 7, 0.15);
    padding: 25px;
    border-radius: 10px;
    margin-bottom: 20px;
    border: 1px solid #FFC107;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.secrets-panel h3 {
    margin-top: 0;
    color: #FFC107;
    display: flex;
    align-items: center;
    gap: 8px;
}

.secret {
    background: rgba(0, 0, 0, 0.4);
    padding: 15px;
    margin: 10px 0;
    border-radius: 5px;
    border: 1px solid rgba(255, 193, 7, 0.3);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

.secret-content {
    display: flex;
    align-items: center;
    gap: 10px;
}

.secret-text {
    font-family: "Google Sans Code", monospace;
    font-optical-sizing: auto;
    word-break: break-all;
    flex: 1;
    padding: 5px;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 3px;
    color: white;
}
</style>