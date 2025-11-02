<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'

// Game state
const currentLevel = ref(0)
const unlockedLevels = ref([0])
const playerName = ref('')
const gameStarted = ref(false)
const secrets = ref<string[]>([])
const showHint = ref(false)
const consoleOutput = ref<string[]>([])

// Secret konami code sequence
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA']
const keySequence = ref<string[]>([])

// Level definitions
const levels = [
  {
    id: 0,
    title: "Welcome, Developer!",
    description: "Your first challenge: Find the hidden button by inspecting the DOM",
    instruction: "Open DevTools and look for an element with opacity: 0",
    hint: "The button has id='hidden-btn' and needs CSS to make it visible",
    completed: ref(false)
  },
  {
    id: 1,
    title: "CSS Selector Mastery",
    description: "Style all elements with data-puzzle='level1' to have a red background",
    instruction: "Open DevTools, go to Console tab, and write CSS using JavaScript to target elements with attribute selectors",
    hint: "In the console, create a style element: const style = document.createElement('style'); style.textContent = '[data-puzzle=\"level1\"] { background-color: red !important; }'; document.head.appendChild(style);",
    completed: ref(false)
  },
  {
    id: 2,
    title: "JavaScript Console Challenge",
    description: "Execute the secret function in the browser console",
    instruction: "Type 'window.secretFunction()' in the browser console",
    hint: "Open DevTools console and call the function that's attached to window",
    completed: ref(false)
  },
  {
    id: 3,
    title: "Local Storage Secret",
    description: "Set a localStorage key 'puzzleKey' with value 'unlocked'",
    instruction: "Use localStorage.setItem() to store the secret key",
    hint: "localStorage.setItem('puzzleKey', 'unlocked')",
    completed: ref(false)
  },
  {
    id: 4,
    title: "Event Listener Challenge",
    description: "Add a click event to the mystery box that logs 'Box clicked!'",
    instruction: "Use addEventListener to attach a click handler",
    hint: "document.getElementById('mystery-box').addEventListener('click', ...)",
    completed: ref(false)
  },
  {
    id: 5,
    title: "The Final Boss: Konami Code",
    description: "Enter the legendary Konami Code sequence",
    instruction: "Use keyboard: ↑↑↓↓←→←→BA",
    hint: "Focus on the page and enter the classic cheat code sequence",
    completed: ref(false)
  }
]

// Computed properties
const currentLevelData = computed(() => {
  const level = levels[currentLevel.value]
  return level || levels[0] // Fallback to first level
})
const allLevelsCompleted = computed(() => levels.every(level => level.completed.value))
const secretsCount = computed(() => secrets.value.length)

// Methods
const generateUniqueId = () => {
  return 'xxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

const generateLevelSecret = (levelId: number, playerName: string) => {
  const secretPhrases = [
    "DOM_INSPECTOR_MASTER",
    "CSS_SELECTOR_WIZARD", 
    "CONSOLE_COMMANDER",
    "STORAGE_GUARDIAN",
    "EVENT_LISTENER_SAGE",
    "KONAMI_CODE_LEGEND"
  ];
  
  const secretData = {
    level: levelId + 1,
    skill: secretPhrases[levelId] || "UNKNOWN_SKILL",
    developer: playerName,
    timestamp: new Date().toISOString(),
    hash: generateUniqueId(),
    achievement: `LEVEL_${levelId + 1}_MASTERY`
  };
  
  return `🔐 ${secretData.skill}_${secretData.hash}: ${btoa(JSON.stringify(secretData))}`;
}

const startGame = () => {
  if (playerName.value.trim()) {
    gameStarted.value = true
    addToConsole(`Welcome ${playerName.value}! Let the challenges begin...`)
  }
}

const addToConsole = (message: string) => {
  consoleOutput.value.push(`> ${message}`)
  if (consoleOutput.value.length > 10) {
    consoleOutput.value.shift()
  }
}

const nextLevel = () => {
  if (currentLevel.value < levels.length - 1) {
    currentLevel.value++
    showHint.value = false // Hide hint when automatically advancing
    if (!unlockedLevels.value.includes(currentLevel.value)) {
      unlockedLevels.value.push(currentLevel.value)
    }
    addToConsole(`Level ${currentLevel.value + 1} unlocked!`)
  }
}

const completeLevel = (levelId: number) => {
  if (levelId >= 0 && levelId < levels.length) {
    const level = levels[levelId]
    if (level) {
      level.completed.value = true
      addToConsole(`Level ${levelId + 1} completed! 🎉`)
      
      if (levelId === currentLevel.value && levelId < levels.length - 1) {
        setTimeout(nextLevel, 1000)
      }
      
      // Add secret for completing level
      const secret = generateLevelSecret(levelId, playerName.value)
      if (!secrets.value.includes(secret)) {
        secrets.value.push(secret)
        addToConsole(`Secret unlocked: ${secret.split(':')[0]}`)
      }
    }
  }
}

const toggleHint = () => {
  showHint.value = !showHint.value
}

const changeLevel = (levelIndex: number) => {
  currentLevel.value = levelIndex
  showHint.value = false // Hide hint when manually changing levels
}

// Level-specific handlers
const handleHiddenButton = () => {
  completeLevel(0)
}

const handleSecretFunction = () => {
  completeLevel(2)
  addToConsole("Secret function executed! Well done!")
}

const handleMysteryBoxClick = () => {
  completeLevel(4)
  addToConsole("Box clicked! Event listener working perfectly!")
}

// Konami code handler
const handleKeyDown = (event: KeyboardEvent) => {
  keySequence.value.push(event.code)
  if (keySequence.value.length > konamiCode.length) {
    keySequence.value.shift()
  }
  
  if (keySequence.value.length === konamiCode.length) {
    const isKonamiCode = keySequence.value.every((key, index) => key === konamiCode[index])
    if (isKonamiCode) {
      completeLevel(5)
      keySequence.value = []
      addToConsole("KONAMI CODE ACTIVATED! 🎮")
      
      // Generate special Konami secret
      const konamiSecret = {
        type: "ULTIMATE_ACHIEVEMENT",
        title: "KONAMI_CODE_MASTER",
        developer: playerName.value,
        unlocked: new Date().toISOString(),
        legacy: "↑↑↓↓←→←→BA",
        hash: generateUniqueId(),
        message: "You are a true developer and gaming legend!"
      };
      secrets.value.push(`🏆 ULTIMATE_SECRET_${konamiSecret.hash}: ${btoa(JSON.stringify(konamiSecret))}`)
    }
  }
}

// Check localStorage
const checkLocalStorage = () => {
  if (localStorage.getItem('puzzleKey') === 'unlocked') {
    completeLevel(3)
  }
}

// Watchers
watch(() => localStorage.getItem('puzzleKey'), (newValue) => {
  if (newValue === 'unlocked') {
    completeLevel(3)
  }
})

// Lifecycle
onMounted(() => {
  // Attach secret function to window
  ;(window as any).secretFunction = handleSecretFunction
  
  // Check localStorage periodically
  setInterval(checkLocalStorage, 1000)
  
  // Add keyboard listener for Konami code
  document.addEventListener('keydown', handleKeyDown)
  
  addToConsole("System initialized. Ready for challenges...")
})
</script>

<template>
  <div id="app">
    <!-- Header -->
    <header class="header">
      <h1>🧩 Frontend Developer Puzzle Challenge</h1>
      <div class="stats">
        <span>Level: {{ currentLevel + 1 }}/{{ levels.length }}</span>
        <span>Secrets Found: {{ secretsCount }}</span>
        <span v-if="allLevelsCompleted" class="crown">👑 MASTER DEVELOPER</span>
      </div>
    </header>

    <!-- Start Screen -->
    <div v-if="!gameStarted" class="start-screen">
      <h2>Ready to test your frontend skills?</h2>
      <p>Enter your developer name to begin the challenge:</p>
      <input 
        v-model="playerName" 
        @keyup.enter="startGame"
        placeholder="Enter your name" 
        class="name-input"
      />
      <button @click="startGame" :disabled="!playerName.trim()">Start Challenge</button>
    </div>

    <!-- Game Screen -->
    <div v-else class="game-container">
      <!-- Level Navigation -->
      <div class="level-nav">
        <button 
          v-for="(level, index) in levels" 
          :key="level.id"
          @click="changeLevel(index)"
          :class="{ 
            active: index === currentLevel, 
            completed: level.completed.value,
            locked: !unlockedLevels.includes(index)
          }"
          :disabled="!unlockedLevels.includes(index)"
        >
          {{ index + 1 }}
        </button>
      </div>

      <!-- Current Level -->
      <div v-if="currentLevelData" class="level-content">
        <h2>{{ currentLevelData.title }}</h2>
        <p class="description">{{ currentLevelData.description }}</p>
        <div class="instruction">
          <strong>Instructions:</strong> {{ currentLevelData.instruction }}
        </div>
        
        <button @click="toggleHint" class="hint-btn">
          {{ showHint ? '🔒 Hide Hint' : '💡 Show Hint' }}
        </button>
        
        <div v-if="showHint" class="hint">
          <strong>Hint:</strong> {{ currentLevelData.hint }}
        </div>

        <!-- Level-specific elements -->
        <div class="level-elements">
          <!-- Level 0: Hidden Button -->
          <button 
            v-if="currentLevel === 0" 
            id="hidden-btn"
            @click="handleHiddenButton"
            class="hidden-button"
          >
            Found me!
          </button>

          <!-- Level 1: CSS Challenge Elements -->
          <div v-if="currentLevel === 1" class="css-challenge">
            <div data-puzzle="level1">Target me with CSS!</div>
            <div data-puzzle="level1">Me too!</div>
            <div data-puzzle="other">Not me though</div>
            <p><strong>Where to write CSS:</strong> Open DevTools → Console tab → Create a style element with JavaScript</p>
            <div class="code-example">
              const style = document.createElement('style');<br>
              style.textContent = '[data-puzzle="level1"] { background-color: red !important; }';<br>
              document.head.appendChild(style);
            </div>
            <button @click="completeLevel(1)" class="check-btn">Check Solution</button>
          </div>

          <!-- Level 2: Console Challenge -->
          <div v-if="currentLevel === 2" class="console-challenge">
            <p>Open your browser's DevTools console and call the secret function!</p>
            <div class="code-example">window.secretFunction()</div>
          </div>

          <!-- Level 3: LocalStorage Challenge -->
          <div v-if="currentLevel === 3" class="storage-challenge">
            <p>Set the localStorage key from your DevTools console:</p>
            <div class="code-example">localStorage.setItem('puzzleKey', 'unlocked')</div>
          </div>

          <!-- Level 4: Event Listener Challenge -->
          <div v-if="currentLevel === 4" class="event-challenge">
            <div id="mystery-box" class="mystery-box">
              🎁 Mystery Box
            </div>
            <p>Add a click event listener to this box using JavaScript!</p>
            <div class="code-example">
              document.getElementById('mystery-box').addEventListener('click', () => console.log('Box clicked!'))
            </div>
          </div>

          <!-- Level 5: Konami Code -->
          <div v-if="currentLevel === 5" class="konami-challenge">
            <p>Enter the legendary Konami Code:</p>
            <div class="konami-display">↑ ↑ ↓ ↓ ← → ← → B A</div>
            <p>Focus on this page and use your keyboard!</p>
          </div>
        </div>

        <!-- Completion Status -->
        <div v-if="currentLevelData?.completed.value" class="completed">
          ✅ Level Completed!
        </div>
      </div>

      <!-- Console Output -->
      <div class="console">
        <h3>Developer Console</h3>
        <div class="console-output">
          <div v-for="(line, index) in consoleOutput" :key="index" class="console-line">
            {{ line }}
          </div>
        </div>
      </div>

      <!-- Secrets Panel -->
      <div v-if="secrets.length > 0" class="secrets-panel">
        <h3>🔐 Secrets Discovered</h3>
        <div v-for="secret in secrets" :key="secret" class="secret">
          {{ secret }}
        </div>
      </div>

      <!-- Final Victory -->
      <div v-if="allLevelsCompleted" class="victory">
        <h2>🎉 CONGRATULATIONS! 🎉</h2>
        <p>You've mastered all the frontend challenges!</p>
        <p>You are now a certified Puzzle Solver! 🏆</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
#app {
  font-family: 'Courier New', monospace;
  background: #2c3e50;
  min-height: 100vh;
  color: white;
  padding: 20px;
}

.header {
  text-align: center;
  margin-bottom: 30px;
}

.header h1 {
  margin: 0;
  font-size: 2.5em;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
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
  from { text-shadow: 0 0 10px #ffd700; }
  to { text-shadow: 0 0 20px #ffd700, 0 0 30px #ffd700; }
}

.start-screen {
  text-align: center;
  background: rgba(255,255,255,0.1);
  padding: 40px;
  border-radius: 15px;
  max-width: 500px;
  margin: 0 auto;
}

.name-input {
  padding: 15px;
  font-size: 18px;
  border: none;
  border-radius: 8px;
  margin: 20px;
  width: 250px;
  text-align: center;
}

.game-container {
  max-width: 1200px;
  margin: 0 auto;
}

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
  background: rgba(255,255,255,0.2);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.level-nav button:hover:not(:disabled) {
  transform: scale(1.1);
}

.level-nav button.active {
  background: #4CAF50;
  box-shadow: 0 0 15px rgba(76,175,80,0.6);
}

.level-nav button.completed {
  background: #2196F3;
}

.level-nav button.locked {
  background: rgba(255,255,255,0.1);
  cursor: not-allowed;
  opacity: 0.5;
}

.level-content {
  background: rgba(255,255,255,0.1);
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

.instruction {
  background: rgba(0,0,0,0.4);
  padding: 20px;
  border-radius: 8px;
  margin: 15px 0;
  border: 1px solid #4CAF50;
  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
}

.hint-btn {
  background: #FF9800;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin: 10px 0;
}

.hint {
  background: rgba(255,152,0,0.15);
  padding: 20px;
  border-radius: 8px;
  margin: 15px 0;
  border: 1px solid #FF9800;
  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
}

.level-elements {
  margin: 20px 0;
  min-height: 100px;
}

.hidden-button {
  opacity: 0;
  padding: 15px 30px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
}

.css-challenge div[data-puzzle="level1"] {
  padding: 20px;
  margin: 10px 0;
  border: 1px dashed white;
  border-radius: 8px;
  background: rgba(255,255,255,0.05);
  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
}

.css-challenge div[data-puzzle="other"] {
  padding: 20px;
  margin: 10px 0;
  border: 1px dashed #666;
  border-radius: 8px;
  opacity: 0.5;
  background: rgba(102,102,102,0.05);
  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
}

.console-challenge, .storage-challenge, .event-challenge {
  text-align: center;
}

.code-example {
  background: #1e1e1e;
  color: #f8f8f2;
  padding: 20px;
  border-radius: 8px;
  font-family: 'Courier New', monospace;
  margin: 15px 0;
  border: 1px solid #444;
  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
}

.mystery-box {
  width: 150px;
  height: 150px;
  background: #27ae60;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px auto;
  border-radius: 15px;
  font-size: 24px;
  cursor: pointer;
  transition: transform 0.3s;
  border: 1px solid white;
  box-shadow: 0 4px 12px rgba(0,0,0,0.4);
}

.mystery-box:hover {
  transform: scale(1.05);
}

.konami-challenge {
  text-align: center;
}

.konami-display {
  font-size: 24px;
  background: rgba(0,0,0,0.5);
  padding: 20px;
  border-radius: 10px;
  margin: 20px 0;
  letter-spacing: 5px;
}

.completed {
  background: rgba(76,175,80,0.3);
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  margin: 20px 0;
  border: 1px solid #4CAF50;
  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
}

.console {
  background: #1e1e1e;
  color: #00ff00;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  font-family: 'Courier New', monospace;
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

.secrets-panel {
  background: rgba(255,193,7,0.15);
  padding: 25px;
  border-radius: 10px;
  margin-bottom: 20px;
  border: 1px solid #FFC107;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
}

.secret {
  background: rgba(0,0,0,0.4);
  padding: 15px;
  margin: 10px 0;
  border-radius: 5px;
  font-family: 'Courier New', monospace;
  word-break: break-all;
  border: 1px solid rgba(255,193,7,0.3);
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
}

.victory {
  text-align: center;
  background: #27ae60;
  padding: 40px;
  border-radius: 20px;
  margin: 20px 0;
  box-shadow: 0 0 30px rgba(39,174,96,0.5);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
}

.victory h2 {
  font-size: 2.5em;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

button {
  background: #2196F3;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s;
}

button:hover:not(:disabled) {
  background: #1976D2;
  transform: translateY(-2px);
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.check-btn {
  background: #4CAF50;
  margin-top: 15px;
}

.check-btn:hover {
  background: #45a049;
}

</style>

<style>
div[data-puzzle='level1'] { background-color: red; }
</style>
