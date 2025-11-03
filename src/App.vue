<script setup lang="ts">
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import {
  PhPuzzlePiece,
  PhArrowCounterClockwise,
  PhLightbulb,
  PhLock,
  PhCheckCircle,
  PhTrophy,
  PhCrown
} from '@phosphor-icons/vue'
import Level0 from './components/Level0.vue'
import Level1 from './components/Level1.vue'
import Level4 from './components/Level4.vue'
import VictoryScreen from './components/VictoryScreen.vue'
import CertificateVerification from './components/CertificateVerification.vue'
import SecretsPanel from './components/SecretsPanel.vue'
import DeveloperConsole from './components/DeveloperConsole.vue'
import LevelNavigation from './components/LevelNavigation.vue'
import { levels } from './config/levels'
import { KONAMI_CODE, GAME_CONFIG } from './config/constants'
import pdf from './pdf.ts'

const currentLevel = ref(-1)
const unlockedLevels = ref([0])
const gameStarted = ref(false)
const secrets = ref<string[]>([])
const showHint = ref(false)
const consoleOutput = ref<string[]>([])
const showCertificateScreen = ref(false)
const showVictoryScreen = ref(true)

const keySequence = ref<string[]>([])

const currentLevelData = computed(() => {
  const level = levels[currentLevel.value]
  return level || levels[0]
})
const allLevelsCompleted = computed(() => levels.every(level => level.completed.value))
const secretsCount = computed(() => secrets.value.length)

const currentLevelComponent = computed(() => {
  const componentMap: Record<number, any> = {
    0: Level0,
    1: Level1,
    4: Level4
  }
  return componentMap[currentLevel.value] || Level0
})

const handleLevelComplete = () => {
  completeLevel(currentLevel.value)
}

const saveGameState = () => {
  const gameState = {
    currentLevel: currentLevel.value,
    unlockedLevels: unlockedLevels.value,
    gameStarted: gameStarted.value,
    secrets: secrets.value,
    completedLevels: levels.map(level => level.completed.value),
    showCertificateScreen: showCertificateScreen.value,
    showVictoryScreen: showVictoryScreen.value
  }
  localStorage.setItem('puzzleGameState', JSON.stringify(gameState))
}

const loadGameState = () => {
  const savedState = localStorage.getItem('puzzleGameState')
  if (savedState) {
    try {
      const gameState = JSON.parse(savedState)
      currentLevel.value = gameState.currentLevel || -1
      unlockedLevels.value = gameState.unlockedLevels || [0]
      gameStarted.value = gameState.gameStarted || false
      secrets.value = gameState.secrets || []

      if (gameState.completedLevels) {
        gameState.completedLevels.forEach((completed: boolean, index: number) => {
          if (levels[index]) {
            levels[index].completed.value = completed
          }
        })
      }

      showCertificateScreen.value = gameState.showCertificateScreen || false
      showVictoryScreen.value = gameState.showVictoryScreen !== undefined ? gameState.showVictoryScreen : true

      if (gameStarted.value && currentLevel.value === -1) {

        const firstIncomplete = levels.findIndex((level, index) =>
          !level.completed.value && unlockedLevels.value.includes(index)
        )

        if (firstIncomplete !== -1) {
          currentLevel.value = firstIncomplete
        } else {

          currentLevel.value = Math.max(...unlockedLevels.value)
        }
      }
    } catch (error) {
      console.error('Failed to load game state:', error)
    }
  }
}

const resetGame = () => {
  currentLevel.value = -1
  unlockedLevels.value = [0]
  gameStarted.value = false
  secrets.value = []
  showHint.value = false
  consoleOutput.value = []
  keySequence.value = []

  showCertificateScreen.value = false

  levels.forEach(level => {
    level.completed.value = false
  })

  localStorage.removeItem('puzzleGameState')
  localStorage.removeItem('puzzleKey')

  addToConsole("Game reset! Starting fresh...")
}

const generateUniqueId = () => {
  return 'xxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

const generateLevelSecret = (levelId: number) => {
  return btoa(generateUniqueId())
}

const startGame = () => {
  currentLevel.value++;
  gameStarted.value = true
  addToConsole("Welcome! Let the challenges begin...")
}

const addToConsole = (message: string) => {
  consoleOutput.value.push(`> ${message}`)
  if (consoleOutput.value.length > GAME_CONFIG.CONSOLE_MAX_LINES) {
    consoleOutput.value.shift()
  }
}

const nextLevel = () => {
  if (currentLevel.value < levels.length - 1) {
    currentLevel.value++
    showHint.value = false
    if (!unlockedLevels.value.includes(currentLevel.value)) {
      unlockedLevels.value.push(currentLevel.value)
    }
    addToConsole(`Level ${currentLevel.value + 1} unlocked!`)
  }
}

const completeLevel = (levelId: number) => {
  if (levelId >= 0 && levelId < levels.length) {
    const level = levels[levelId]
    if (level && !level.completed.value) {
      level.completed.value = true
      addToConsole(`Level ${levelId + 1} completed!`)

      if (levelId === currentLevel.value && levelId < levels.length - 1) {
        setTimeout(nextLevel, GAME_CONFIG.LEVEL_TRANSITION_DELAY)
      }

      const secret = generateLevelSecret(levelId)
      if (!secrets.value.includes(secret)) {
        secrets.value.push(secret)
        addToConsole(`Secret unlocked!`)
      }

      if (levels.every(level => level.completed.value)) {
        showVictoryScreen.value = true
      }
    }
  }
}

const toggleHint = () => {
  showHint.value = !showHint.value
}

const changeLevel = (levelIndex: number) => {
  currentLevel.value = levelIndex
  showHint.value = false
}

const backToLevels = () => {
  currentLevel.value = 4
  showCertificateScreen.value = false
  showHint.value = false
  showVictoryScreen.value = false
}

const copyToClipboard = async (text: string) => {
  await navigator.clipboard.writeText(text)
  addToConsole(`Secret copied to clipboard!`)
}

const showCertificate = () => {
  showCertificateScreen.value = true
}

const generateCertificate = async () => {
  const certWindow = window.open('', '_blank', 'width=800,height=600')

  if (certWindow) {
    const currentDate = new Date().toLocaleDateString()

    try {
      const htmlContent = await pdf(currentDate, secrets.value.length);
      certWindow.document.write(htmlContent)
      certWindow.document.close()
    } catch (error) {
      console.error('Error generating certificate:', error);
      certWindow.close()
    }
  }
}

const handleSecretFunction = () => {
  completeLevel(2)
  addToConsole("Secret function executed! Well done!")
}

const handleMysteryBoxClick = () => {
  completeLevel(4)
  addToConsole("Box clicked! Event listener working perfectly!")
}

const handleKeyDown = (event: KeyboardEvent) => {
  keySequence.value.push(event.code)
  if (keySequence.value.length > KONAMI_CODE.length) {
    keySequence.value.shift()
  }

  if (keySequence.value.length === KONAMI_CODE.length) {
    const isKonamiCode = keySequence.value.every((key, index) => key === KONAMI_CODE[index])
    if (isKonamiCode) {
      keySequence.value = []
      addToConsole("KONAMI CODE ACTIVATED! Easter egg found!")

      secrets.value.push(btoa(generateUniqueId()))
    }
  }
}

let localStorageInterval: number | null = null

const checkLocalStorage = () => {
  if (localStorage.getItem('puzzleKey') === 'unlocked') {
    completeLevel(3)
  }
}

const stopLocalStorageCheck = () => {
  if (localStorageInterval) {
    clearInterval(localStorageInterval)
    localStorageInterval = null
  }

  if ((window as any).__puzzleStorageCleanup) {
    ; (window as any).__puzzleStorageCleanup()
    delete (window as any).__puzzleStorageCleanup
  }
}

const startLocalStorageCheck = () => {
  if (localStorageInterval || levels[3]?.completed.value) {
    return
  }

  checkLocalStorage()

  localStorageInterval = setInterval(checkLocalStorage, 100)

  const handleStorageChange = (e: StorageEvent) => {
    if (e.key === 'puzzleKey' && e.newValue === 'unlocked') {
      checkLocalStorage()
    }
  }

  window.addEventListener('storage', handleStorageChange)

  const cleanup = () => {
    window.removeEventListener('storage', handleStorageChange)
  }

    ; (window as any).__puzzleStorageCleanup = cleanup
}

watch(() => levels[3]?.completed.value, (isCompleted) => {
  if (isCompleted) {
    stopLocalStorageCheck()
  }
})

watch([currentLevel, unlockedLevels, gameStarted, secrets, showCertificateScreen], () => {
  if (gameStarted.value) {
    saveGameState()
  }
}, { deep: true })

watch(() => levels.map(level => level.completed.value), () => {
  if (gameStarted.value) {
    saveGameState()
  }
}, { deep: true })

watch(() => currentLevel.value, (newLevel, oldLevel) => {
  if (oldLevel === 3) {
    stopLocalStorageCheck()
  }

  if (newLevel === 3 && !levels[3]?.completed.value) {
    startLocalStorageCheck()
  }
})

onMounted(async () => {
  loadGameState()

  await nextTick()

  localStorage.removeItem('puzzleKey')

    ; (window as any).secretFunction = handleSecretFunction
    ; (window as any).mysteryBoxClick = handleMysteryBoxClick

  if (currentLevel.value === 3 && !levels[3]?.completed.value) {
    startLocalStorageCheck()
  }

  document.addEventListener('keydown', handleKeyDown)

  addToConsole("System initialized. Ready for challenges...")
})
</script>

<template>
  <div id="vue-app">
    <header class="header">
      <div class="header-content">
        <h1>
          <PhPuzzlePiece class="inline-icon" /> <span>Frontend Puzzle Challenge</span>
        </h1>
        <button @click="resetGame" class="reset-btn" title="Reset Challenge">
          <PhArrowCounterClockwise class="inline-icon" /> Reset
        </button>
      </div>
      <div class="stats">
        <span>Level: {{ currentLevel + 1 }}/{{ levels.length }}</span>
        <span>Secrets Found: {{ secretsCount }}</span>
      </div>
      <span v-if="allLevelsCompleted" class="stats crown">
        <PhCrown class="inline-icon" /> MASTER FRONTEND
        <PhCrown class="inline-icon" />
      </span>

      <button v-if="allLevelsCompleted && !showVictoryScreen" @click="showVictoryScreen = true"
        class="victory-screen-btn header-victory-btn" title="View Victory Screen & Certificate">
        <PhTrophy class="inline-icon" /> Victory Screen
      </button>
    </header>

    <div v-if="!gameStarted" class="start-screen">
      <h2>Ready to test your frontend skills?</h2>
      <p>Click the button below to begin the challenge!</p>
      <p><strong>All puzzles can be solved using the in-browser console</strong></p>
      <button @click="startGame" class="start-btn">Start Challenge</button>
    </div>

    <div v-else class="game-container">
      <LevelNavigation :levels="levels" :current-level="currentLevel" :unlocked-levels="unlockedLevels"
        :all-levels-completed="allLevelsCompleted" :show-victory-screen="showVictoryScreen" @change-level="changeLevel"
        @back-to-levels="backToLevels" />

      <div v-if="currentLevelData && (!allLevelsCompleted || !showVictoryScreen)" class="level-content">
        <h2>{{ currentLevelData.title }}</h2>
        <p class="description">{{ currentLevelData.description }}</p>
        <div class="hint-container">
          <button @click="toggleHint" class="hint-btn">
            <template v-if="showHint">
              <PhLock class="inline-icon" /> <span>Hide Hint</span>
            </template>
            <template v-else>
              <PhLightbulb class="inline-icon" /> <span>Show Hint</span>
            </template>
          </button>

          <div v-if="showHint" class="hint">
            <strong>Hint: </strong>
            <span v-if="!currentLevelData.link">{{ currentLevelData.hint }}</span>
            <span v-else>
              <a :href="currentLevelData.link" target="_blank" rel="noopener">{{ currentLevelData.hint }}</a>
            </span>
          </div>
        </div>

        <div class="level-elements">
          <component :is="currentLevelComponent" @complete="handleLevelComplete" />
        </div>

        <div v-if="currentLevelData?.completed.value" class="completed">
          <PhCheckCircle class="inline-icon" /> Level Completed!
        </div>
      </div>

      <div v-else-if="allLevelsCompleted && showVictoryScreen" class="level-content">
        <VictoryScreen v-if="!showCertificateScreen" :secrets-count="secretsCount"
          @show-certificate="showCertificate" />

        <CertificateVerification v-else :secrets="secrets" @generate-certificate="generateCertificate"
          @add-to-console="addToConsole" />
      </div>

      <DeveloperConsole :console-output="consoleOutput" />

      <SecretsPanel :secrets="secrets" @copy-to-clipboard="copyToClipboard" />

    </div>
  </div>
</template>

<style scoped>
#vue-app {
  font-family: "Google Sans Code", monospace;
  font-optical-sizing: auto;
  min-height: 100vh;
  color: white;
  padding: 20px;
}

.header {
  text-align: center;
  margin-bottom: 30px;
}

.header-content {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
}

.header h1 {
  display: flex;
  justify-content: center;
  gap: .5em;
  align-items: center;
  margin: 0;
  font-size: 2.5em;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.reset-btn {
  position: absolute;
  right: 0;
  background: #ff4757;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 5px;
}

.reset-btn:hover {
  background: #ff3742 !important;
  transform: translateY(-1px);
}

.start-btn {
  background: #4CAF50;
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  transition: all 0.3s;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.start-btn:hover {
  background: #45a049;
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}

.stats {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 10px;
  font-weight: bold;
}

.crown {
  color: #ffd700;
  animation: glow 2s ease-in-out infinite alternate;
}

@keyframes glow {
  from {
    text-shadow: 0 0 10px #ffd700;
  }

  to {
    text-shadow: 0 0 20px #ffd700, 0 0 30px #ffd700;
  }
}

.start-screen {
  text-align: center;
  background: rgba(255, 255, 255, 0.1);
  padding: 40px;
  border-radius: 15px;
  max-width: 500px;
  margin: 0 auto;
}

.game-container {
  max-width: 1200px;
  margin: 0 auto;
}

.level-content {
  background: rgba(255, 255, 255, 0.1);
  padding: 30px;
  border-radius: 15px;
  margin-bottom: 20px;
  backdrop-filter: blur(10px);
}

.level-content h2 {
  margin-top: 0;
  color: #ffd700;
}

.description {
  font-size: 18px;
  margin-bottom: 15px;
}

.hint-container {
  margin-bottom: 15px;
  min-height: 100px;
}

.hint-btn {
  background: #FF9800;
  color: white;
  border: 1px white solid;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin: 15px 0;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 8px;
}

.hint {
  background: rgba(255, 152, 0, 0.15);
  padding: 10px 20px;
  border-radius: 8px;
  margin: 15px 0;
  border: 1px solid #FF9800;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
}

.level-elements {
  margin: 20px 0;
  min-height: 100px;
}

.completed {
  background: rgba(76, 175, 80, 0.3);
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  margin: 20px 0;
  border: 1px solid #4CAF50;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}
</style>