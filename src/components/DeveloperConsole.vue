<script setup lang="ts">
defineProps<{
    consoleOutput: string[]
}>()
</script>

<template>
    <div class="console">
        <h3>Developer Console</h3>
        <div class="console-output">
            <div v-for="(line, index) in consoleOutput" :key="index" class="console-line">
                {{ line }}
            </div>
        </div>
    </div>
</template>

<style scoped>
.console {
    background: #1e1e1e;
    color: #00ff00;
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 20px;
    font-family: "Google Sans Code", monospace;
    font-optical-sizing: auto;
}

.console h3 {
    margin-top: 0;
    color: #00ff00;
}

.console-output {
    height: 150px;
    overflow-y: auto;
    background: #000;
    padding: 10px;
    border-radius: 5px;
}

.console-line {
    margin: 5px 0;
}
</style>