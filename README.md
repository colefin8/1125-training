# 🧩 Frontend Developer Puzzle Challenge

A Vue.js interactive puzzle game designed to test and teach frontend development skills!

## 🎮 How to Play

This is an interactive puzzle app that challenges frontend developers with 6 progressively difficult levels, each testing different web development skills.

### 🚀 Setup & Run

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to the local development URL (usually http://localhost:5173)

## 🎯 Puzzle Levels

### Level 1: DOM Inspector Challenge
- **Skill**: DevTools & DOM manipulation
- **Task**: Find the hidden button by inspecting the DOM
- **Hint**: Look for an element with `opacity: 0` and make it visible

### Level 2: CSS Selector Mastery
- **Skill**: CSS attribute selectors
- **Task**: Style elements with specific data attributes
- **Hint**: Use `[data-puzzle='level1']` selector to target elements

### Level 3: JavaScript Console Challenge
- **Skill**: Browser console & global functions
- **Task**: Execute a secret function from the console
- **Solution**: Type `window.secretFunction()` in browser DevTools console

### Level 4: Local Storage Challenge
- **Skill**: Browser storage APIs
- **Task**: Set a localStorage value
- **Solution**: `localStorage.setItem('puzzleKey', 'unlocked')` in console

### Level 5: Event Listener Challenge
- **Skill**: DOM events & JavaScript
- **Task**: Add a click event listener to the mystery box
- **Solution**: `document.getElementById('mystery-box').addEventListener('click', () => console.log('Box clicked!'))`

### Level 6: The Final Boss - Konami Code
- **Skill**: Keyboard events & gaming culture
- **Task**: Enter the legendary Konami Code
- **Solution**: ↑↑↓↓←→←→BA (Use arrow keys and B, A keys)

## 🔐 Hidden Features

### Secrets System
- Each completed level unlocks a secret token
- Secrets are displayed in the "Secrets Discovered" panel
- Completing the Konami Code unlocks the ultimate secret

### Easter Eggs
- Beautiful animations and visual feedback
- Developer console output tracking
- Progressive level unlocking system
- Master Developer crown for completing all levels

## 🛠️ Technologies Used

- **Vue 3** with Composition API
- **TypeScript** for type safety
- **Vite** for development and building
- **CSS3** with animations and gradients
- **Browser APIs**: localStorage, DOM events, DevTools

## 🎨 Features

- **Responsive Design**: Works on desktop and mobile
- **Progressive Difficulty**: Levels get harder as you advance
- **Visual Feedback**: Animations, colors, and state changes
- **Educational**: Each level teaches real frontend skills
- **Gamified**: Points, secrets, and achievement system

## 🧠 Skills Tested

1. **DevTools Proficiency** - Inspecting and modifying DOM
2. **CSS Mastery** - Selectors, styling, and layout
3. **JavaScript Fundamentals** - Functions, events, and APIs
4. **Browser APIs** - localStorage, console, DOM manipulation
5. **Problem Solving** - Debugging and creative thinking
6. **Web Culture Knowledge** - Gaming references and easter eggs

## 🏆 Completion Rewards

- **Crown Badge** for master developers
- **Secret Collection** with encoded tokens
- **Console Achievement Log** tracking your progress
- **Bragging Rights** as a certified puzzle solver!

## 📚 Educational Value

This puzzle is perfect for:
- **Junior developers** learning frontend basics
- **Bootcamp students** practicing real-world skills
- **Interview preparation** for frontend positions
- **Team building** activities for dev teams
- **Teaching tools** for coding instructors

## 🤝 Contributing

Feel free to add more levels, improve existing puzzles, or enhance the UI/UX!

## 📄 License

MIT License - Have fun and happy coding! 🚀
