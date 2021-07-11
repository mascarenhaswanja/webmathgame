//@TODO: Implement Local Storage x score
//@TODO: To win the game, the player must successfully defeat 5 levels of the game within the specified time.

// Global Variables 
let player
let score = 0
let fly = []
let currentLevel = 0
let timeRemaining = 60
let currentTime 
let trigger
let currentFrogRow = 3
const x = document.body.clientWidth
const y = document.body.clientHeight

class Fly {
  constructor(speed) {
    this.speed = speed
    this.randomSpeed()
  }

  randomSpeed() {
    this.speed = Math.floor(Math.random() * 10) + this.speed / 10
  }
}

const startGame = () => {
    console.log("Start Game")
    /* @TODO: In each level, enemies move from left to right at random speeds.
     Some enemies will move faster; others will move slower. */
    for (let i = 0; i < 5; i++) {
        fly.push(new Fly(10))
    }
    currentLevel++
}

/*  For each row generate the question with random numbers
Each multiplication question must consist of two randomly generated numbers.
  The first number must be between 1-15.
  The second number must be a value between 1-10.
*/ 

//@TODO: Implement distinct question and answer - Not use the same result
const generateQuestion = () => {
      let question = ""
      const first = Math.floor((Math.random() * 15) + 1)
      const second = Math.floor((Math.random() * 10) + 1)
      question = `${parseInt(first)} * ${parseInt(second)}`
      result = first * second

    return [question,result]
}

// Start game until timeRemaining < 60 seg and itemCol < 50
startGame()


const initalSetup = () => {
  const selectedQuestion = Math.floor((Math.random() * 5))

  let selectedResult
  for(let i = 0; i< 5; i++){
    let [question, result] = generateQuestion()
    document.querySelector(".game").innerHTML += `
  <div class="location-col-1 " id="fly-${i+1}">
  <img   class="img-fly" src="assets/img/fly.png">
  <p class="fly-question-box">${question}</p>
  </div>
  ` 

    if (i === selectedQuestion) {
      selectedResult = result
    }
  }

  document.querySelector(".game").innerHTML += `
  <div class="frog">
    <img class="img-frog" src="assets/img/frog_new.png">
    <div class="frog-answer-box">${selectedResult}</div>
  </div>
  `
  document.querySelector(".frog").style.gridColumn = '50'
  document.querySelector(".frog").style.gridRow = '3'
}

const changeFlyLocation = (col) => {
  let selectedFly = Math.floor(Math.random() * 5) + 1;
  let currentFlyCol = document.querySelector(`#fly-${selectedFly}`).style.gridColumn

  if(currentFlyCol === ""){
      document.querySelector(`#fly-${selectedFly}`).style.gridColumn = "1";
      document.querySelector(`#fly-${selectedFly}`).style.gridRow = `${selectedFly}`
  }else{
    let newFlyCol = parseInt(currentFlyCol) + col
    gameOver(newFlyCol)
    //console.log("Fly col" ,newFlyCol)
    document.querySelector(`#fly-${selectedFly}`).style.gridColumn = `${newFlyCol}`
    document.querySelector(`#fly-${selectedFly}`).style.gridRowStart = `${selectedFly}`
  }
}

const changeFrogLocation = (row) => {
   document.querySelector(".img-frog").style.gridRow = row
  //document.querySelector("frog").style.gridRow = row
}

const randomSpeed = () => {
  const speed = Math.floor(Math.random() * 4) + 1
  return speed;

}
const gameFlyLocation = () => {
    let col = randomSpeed()
    changeFlyLocation(col)
}

const gameLogic = () => {
  trigger = setInterval(gameFlyLocation,1000)
}

const gameTime = () => {
  document.querySelector(".results").innerHTML = `
  <p>Level <span>${currentLevel}</span> of 5</p>
  <p>Time Remaining: <span>${timeRemaining}</span> seconds</p>
  `
  currentTime = setInterval(initalSetup,1000)
  timeRemaining -= currentTime
}

const gameOver = (itemCol) => {
  //@TODO Game over itemCol === 50 or Time === 60 seg
  console.log("itemCol ", itemCol)
    if(itemCol === 50){
      //game over
      console.log("Game over  itemCol ", itemCol)
      document.querySelector(".game-over").innerText = "GAME OVER"

      document.querySelector(".game-over").style.color = "wheat"
      document.querySelector(".game-over").style.size = "200px"

      document.querySelector("button").classList.remove("hidden")

      clearInterval(trigger)
      // Show Results and button Play again
      // clearInterval when time > 60 seg
      clearInterval(timeRemaining)

    }else{
      return
    }
}


  document.onkeydown = function (event) {
  
      switch (event.keyCode) {
        case 38:
           //console.log("Up key is pressed.");
           if(currentFrogRow <= 1){
             return
           }else{
            currentFrogRow -= 1
            changeFrogLocation(currentFrogRow)
           }
           
           break
        case 40:
           //console.log("Down key is pressed.");
           if(currentFrogRow >= 5){
             return
           }else{
            currentFrogRow += 1;
            changeFrogLocation(currentFrogRow)
           }
        
           break

        case 32:
          //console.log("Space bar pressed")
          checkAnswer()
          break
     }
    
   
 };

const checkAnswer = () => {
  //let frogRow = document.querySelector(".img-frog").style.gridRow
  let frogRow = document.querySelector(".frog").style.gridRow
  let flyRow = document.querySelector(`#fly-${frogRow.charAt(0)}`)
}

// GAME
initalSetup()
gameFlyLocation()
gameLogic();
