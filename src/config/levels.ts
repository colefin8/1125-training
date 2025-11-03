import { ref } from 'vue'

export interface Level {
  id: number
  title: string
  description: string
  hint: string
  link?: string
  completed: ReturnType<typeof ref<boolean>>
}

export const levels: Level[] = [
  {
    id: 0,
    title: "Welcome, Challenger!",
    description: "Your first challenge: Find the hidden button by inspecting the DOM",
    hint: "There are multiple ways to find it, even some that don't require inspecting elements if you *focus*",
    completed: ref(false)
  },
  {
    id: 1,
    title: "CSS Selector Mastery",
    description: "Style all elements with the attribute data-puzzle='level1' to have a red background",
    hint: "Create a style element in the console and append it to document.head",
    link: "https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent",
    completed: ref(false)
  },
  {
    id: 2,
    title: "JavaScript Console Challenge",
    description: "Execute the secret function in the browser console",
    hint: "find the function that's attached to window",
    completed: ref(false)
  },
  {
    id: 3,
    title: "Local Storage Secret",
    description: "Set a localStorage key 'puzzleKey' with value 'unlocked'",
    hint: "localStorage API",
    link: "https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage",
    completed: ref(false)
  },
  {
    id: 4,
    title: "Event Listener Challenge",
    description: "Add a click event to the mystery box that logs 'Box clicked!', the callback function for the event listener should be `window.mysteryBoxClick`",
    hint: "addEventListener",
    link: "https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener",
    completed: ref(false)
  }
]