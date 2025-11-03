<script setup lang="ts">
import { ref, computed } from 'vue'
import { PhCheckCircle, PhTrophy, PhArrowSquareIn } from '@phosphor-icons/vue'

const props = defineProps<{
    secrets: string[]
}>()

const emit = defineEmits<{
    generateCertificate: []
    addToConsole: [message: string]
}>()

const secretInputs = ref<string[]>(new Array(props.secrets.length).fill(''))
const certificateVerified = ref(false)

const isVerifyDisabled = computed(() =>
    secretInputs.value.some(input => !input.trim())
)

const verifyCertificate = () => {
    const allCorrect = secretInputs.value.every((input, index) =>
        input.trim() === props.secrets[index]
    )

    if (allCorrect && secretInputs.value.length === props.secrets.length) {
        certificateVerified.value = true
        emit('addToConsole', "All secrets verified! Certificate unlocked!")
    } else {
        emit('addToConsole', "Some secrets are incorrect. Please check your entries.")
    }
}

const handleGenerateCertificate = () => {
    emit('generateCertificate')
}

const insertSecret = (index: number) => {
    const secret = props.secrets[index]
    if (secret) {
        secretInputs.value[index] = secret
        emit('addToConsole', `Secret ${index + 1} inserted!`)
    }
}
</script>

<template>
    <div class="certificate-verification">
        <h2>🏆 Certificate Verification</h2>
        <p>Enter all the secrets you collected during the challenge to unlock your official certificate:</p>

        <div class="secret-verification">
            <div v-for="(secret, index) in secrets" :key="index" class="secret-input-group">
                <label>Secret {{ index + 1 }}:</label>
                <div class="input-with-button">
                    <button @click="insertSecret(index)" class="insert-btn" title="Insert secret automatically">
                        <span>Insert Secret</span>
                        <PhArrowSquareIn class="inline-icon" />
                    </button>
                    <input v-model="secretInputs[index]" type="text"
                        :placeholder="'Enter secret ' + (index + 1) + '...'" class="secret-input" />
                </div>
            </div>
        </div>

        <div class="certificate-actions">
            <button @click="verifyCertificate" class="verify-btn" :disabled="isVerifyDisabled">
                <PhCheckCircle class="inline-icon" /> Verify Secrets
            </button>

            <div v-if="certificateVerified" class="certificate-ready">
                <p>✅ All secrets verified! You are now eligible for your certificate.</p>
                <button @click="handleGenerateCertificate" class="generate-btn">
                    <PhTrophy class="inline-icon" /> Generate Certificate PDF
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.certificate-verification {
    text-align: center;
    padding: 20px;
}

.certificate-verification h2 {
    color: #FFD700;
    margin-bottom: 20px;
    font-size: 2em;
}

.secret-verification {
    margin: 30px 0;
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-width: 600px;
    margin: 30px auto;
}

.secret-input-group {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
}

.secret-input-group label {
    font-weight: bold;
    color: #FFD700;
}

.input-with-button {
    display: flex;
    gap: 8px;
    width: 100%;
    align-items: center;
}

.insert-btn {
    background: #2196F3;
    color: white;
    border: none;
    padding: 12px;
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    transition: all 0.3s;
    flex-shrink: 0;
    min-width: 44px;
    height: 44px;
    font-family: 'Courier New', monospace;
}

.insert-btn:hover {
    background: #1976D2;
    transform: translateY(-1px);
}

.secret-input {
    flex: 1;
    padding: 12px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 6px;
    background: rgba(0, 0, 0, 0.3);
    color: white;
    font-family: 'Courier New', monospace;
    font-size: 14px;
}

.secret-input:focus {
    outline: none;
    border-color: #4CAF50;
    background: rgba(0, 0, 0, 0.5);
}

.certificate-actions {
    margin: 30px 0;
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
}

.verify-btn {
    background: #4CAF50 !important;
    padding: 12px 24px;
    font-weight: bold;
    border: none;
    border-radius: 6px;
    color: white;
    cursor: pointer;
    font-family: "Google Sans Code", monospace;
    font-optical-sizing: auto;
    font-size: 16px;
    transition: all 0.3s;
    display: inline-flex;
    align-items: center;
    gap: 8px;
}

.verify-btn:hover:not(:disabled) {
    background: #45a049 !important;
    transform: translateY(-2px);
}

.verify-btn:disabled {
    background: #666 !important;
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
}

.certificate-ready {
    background: rgba(76, 175, 80, 0.2);
    padding: 20px;
    border-radius: 10px;
    border: 2px solid #4CAF50;
}

.generate-btn {
    background: #FFD700 !important;
    color: #333 !important;
    padding: 15px 30px;
    font-size: 18px;
    font-weight: bold;
    margin-top: 15px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-family: "Google Sans Code", monospace;
    font-optical-sizing: auto;
    transition: all 0.3s;
    display: inline-flex;
    align-items: center;
    gap: 8px;
}

.generate-btn:hover {
    background: #FFC107 !important;
    transform: translateY(-2px);
}
</style>