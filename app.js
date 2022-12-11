const colors = [
  '#FFFFFF',
  '#2196F3',
  '#4CAF50',
  '#FF9800',
  '#009688',
  '#795548',
]

const startBtn = document.getElementById('start')
const screens = document.querySelectorAll('.screen')
const timeList = document.getElementById('time-list')
const timeElem = document.getElementById('time')
const board = document.getElementById('board')
let time = 0
let score = 0
let timeNewGame = 0
startBtn.addEventListener('click', (e) => {
  e.preventDefault()
  screens[0].classList.add('up')
})

timeList.addEventListener('click', (e) => {
  if (e.target.dataset.time) {
    screens[1].classList.add('up')
    time = timeNewGame = parseInt(e.target.dataset.time)
    startGame()
  }
})

board.addEventListener('click', (e) => {
  if (e.target.classList.contains('circle')) {
    score += 1
    e.target.remove()
    createRandomCircle()
  }
})

function startGame() {
  setInterval(decreaseTime, 1000)
  createRandomCircle()
  setTime(time)
}

function decreaseTime() {
  if (time === 0) {
    finishGame()
  } else {
    let current = (time -= 1)
    if (current < 10) {
      current = `0${current}`
    }
    setTime(current)
  }
}

function setTime(value) {
  timeElem.innerHTML = `00:${value}`
}

function finishGame() {
  timeElem.parentElement.classList.add('hide')
  board.innerHTML = `<h1>счёт: <span class='primary'>${score}</span></h1>`
}

function createRandomCircle() {
  const circle = document.createElement('div')

  const size = getRandomNumber(10, 30)

  const { width, height } = board.getBoundingClientRect()
  const x = getRandomNumber(0, width - size)
  const y = getRandomNumber(0, height - size)

  circle.classList.add('circle')
  circle.style.width = `${size}px`
  circle.style.height = `${size}px`
  circle.style.top = `${x}px`
  circle.style.left = `${y}px`
  const color = getRandomColor(colors)
  circle.style.background = color
  board.append(circle)
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

function getRandomColor(colors) {
  const index = Math.floor(Math.random() * colors.length)
  return colors[index]
}
