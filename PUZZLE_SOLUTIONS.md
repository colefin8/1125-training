# 🔓 Puzzle Solutions Guide

**⚠️ SPOILER ALERT! ⚠️**
This file contains solutions to all puzzle levels. Only look if you're really stuck!

---

## Level 1: DOM Inspector Challenge

**Objective**: Find and reveal the hidden button

**Solution**:
1. Right-click on the page and select "Inspect Element" (or press F12)
2. In the DevTools, press Ctrl+F (or Cmd+F on Mac) to open search
3. Search for `hidden-btn` or `opacity: 0`
4. Find the button element with `id="hidden-btn"`
5. In the Styles panel, uncheck the `opacity: 0` rule or add `opacity: 1 !important`
6. The button will become visible - click it!

**Alternative**: Use console: `document.getElementById('hidden-btn').style.opacity = '1'`

---

## Level 2: CSS Selector Mastery

**Objective**: Style elements with data-puzzle="level1" to have red background

**Solution**:
1. Open DevTools (F12)
2. Go to the Console tab
3. Create a style element and add CSS:
```javascript
const style = document.createElement('style');
style.textContent = '[data-puzzle="level1"] { background-color: red !important; }';
document.head.appendChild(style);
```

**Alternative**: Use DevTools Styles panel to add the CSS rule directly

---

## Level 3: JavaScript Console Challenge

**Objective**: Execute the secret function

**Solution**:
1. Open DevTools Console (F12 → Console tab)
2. Type and press Enter:
```javascript
window.secretFunction()
```

The function is automatically attached to the window object when the app loads.

---

## Level 4: Local Storage Challenge

**Objective**: Set localStorage key 'puzzleKey' with value 'unlocked'

**Solution**:
1. Open DevTools Console (F12 → Console tab)
2. Type and press Enter:
```javascript
localStorage.setItem('puzzleKey', 'unlocked')
```

The app automatically checks localStorage every second to detect this change.

---

## Level 5: Event Listener Challenge

**Objective**: Add a click event listener to the mystery box

**Solution**:
1. Open DevTools Console (F12 → Console tab)
2. Type and press Enter:
```javascript
document.getElementById('mystery-box').addEventListener('click', () => {
    console.log('Box clicked!');
});
```

3. Then click the mystery box to trigger the event

**Note**: The app has a built-in listener that detects when you add the correct event listener.

---

## Level 6: The Final Boss - Konami Code

**Objective**: Enter the legendary Konami Code sequence

**Solution**:
1. Make sure the page has focus (click somewhere on the page)
2. Use your keyboard to enter this exact sequence:
   - ↑ ↑ ↓ ↓ ← → ← → B A
   - That's: Arrow Up, Arrow Up, Arrow Down, Arrow Down, Arrow Left, Arrow Right, Arrow Left, Arrow Right, B key, A key

**Tips**:
- Enter the sequence fairly quickly (within 10 seconds)
- Make sure Caps Lock is off when pressing B and A
- If it doesn't work, try again - timing matters!

---

## 🏆 Master Developer Achievement

Complete all 6 levels to earn the Master Developer crown and unlock all secrets!

## 🔐 Secret Tokens

Each level completion generates a unique secret token. These tokens are:
- Base64 encoded strings containing level info and timestamp
- Displayed in the "Secrets Discovered" panel
- Can be decoded to reveal hidden information

## 🎮 Easter Eggs

- Try different keyboard combinations
- Check the browser console for hidden messages
- Inspect the network tab during level completion
- Look for hidden CSS classes and animations

---

**Happy Puzzle Solving! 🧩**