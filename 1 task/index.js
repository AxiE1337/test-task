const inputEl = document.querySelector('input')
const buttonEl = document.querySelector('button')
const timerEl = document.querySelector('span')

let interval = null
let elapsed = 0
let start = 0

const createTimerAnimator = () => {
  return (seconds) => {
    elapsed = Math.floor(seconds * 1000)
    start = Date.now() + elapsed

    interval = setInterval(() => {
      elapsed = start - Date.now()
      seconds = Math.floor(elapsed / 1000) + 1
      let textSeconds = seconds % 60
      let textMinutes = Math.floor(seconds / 60) % 60
      let textHours = Math.floor(seconds / 3600)
      textSeconds = textSeconds < 10 ? '0' + textSeconds : textSeconds
      textMinutes = textMinutes < 10 ? '0' + textMinutes : textMinutes
      textHours = textHours < 10 ? '0' + textHours : textHours
      timerEl.innerText = `${textHours + ':' + textMinutes + ':' + textSeconds}`
      if (seconds <= 0) {
        clearInterval(interval)
        interval = null
      }
    }, 1000)
  }
}

const animateTimer = createTimerAnimator()

const getInputValue = () => {
  const value = inputEl.value.trim().replace(/\s/g, '')
  const secs = parseInt(value)
  if (isNaN(secs) || secs < 0) {
    return (inputEl.value = '')
  }
  return secs
}

inputEl.addEventListener('input', (e) => {
  const value = getInputValue()
  if (isNaN(value)) {
    return (e.target.value = '')
  }
  return (e.target.value = getInputValue())
})

buttonEl.addEventListener('click', () => {
  const seconds = getInputValue()
  if (seconds <= 0) return
  if (interval) {
    clearInterval(interval)
  }
  animateTimer(seconds)

  inputEl.value = ''
})
