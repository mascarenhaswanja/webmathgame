console.log("Output - Expert Math Frog");
/* players have 60 seconds to correctly answer a series of math multiplication questions. Correctly answering a question advances the user to the next level. To win the game, the player must successfully defeat 5 levels of the game within the specified time
*/
//@TODO: Implement DB player x score

let player
// let question = []
let score = 0
let fly = []
const x = document.body.clientWidth;
const y = document.body.clientHeight;

const startGame = () => {
    console.log("Start Game");
    /* @TODO: In each level, enemies move from left to right at random speeds.
     Some enemies will move faster; others will move slower. */
    for (let i = 0; i < 5; i++) {
        fly.push(new Fly(10))
    }
}


/*  For each row generate the question with random numbers
Each multiplication question must consist of two randomly generated numbers.
  The first number must be between 1-15.
  The second number must be a value between 1-10.
*/ 
const generateQuestion= () => {
        // generate different questions for each level

        let question = ""
            const first = Math.floor((Math.random() * 15) + 1)
            const second = Math.floor((Math.random() * 10) + 1)
            question = `${parseInt(first)} x ${parseInt(second)} = ?`
            result = first * second

    return [question,result]
}

class Fly {
    constructor(speed) {
      this.speed = speed
      this.randomSpeed()
    }
  
    randomSpeed() {
      this.speed = Math.floor(Math.random() * 10) + this.speed / 10
    }
}


startGame()



/// new code -- mayank

const level = 0; 
let timeleft = 60; 
var trigger ;
let itemColGameEnd = 0

const initalSetup = () => {
  const selectedQuestion = Math.floor((Math.random() * 5))
  let selectedResult

  for(let i = 0; i< 5; i++){
    let [question, result] = generateQuestion()
    document.querySelector(".game").innerHTML += `
  <div class="location-col-1 " id="fly-${i+1}">
  <img   class="img-fly" src="assets/img/fly.png">
  <p class="fly-question-box">${question}</p>
  `

  document.querySelector(`#fly-${i+1}`).style.gridColumn = '1'
  document.querySelector(`#fly-${i+1}`).style.gridRow = `${i+1}`

    if (i === selectedQuestion) {
      selectedResult = result
    }
  }

  // document.querySelector(".game").innerHTML = `
  // <img  class="img-frog" src="assets/img/frog_new.png">
  // `
  document.querySelector(".game").innerHTML += `
  <div class="frog">
    <img class="img-frog" src="assets/img/frog_new.png">
    <div class="frog-answer-box">${selectedResult}</div>
  </div>
  `
  document.querySelector(".frog").style.gridColumn = '20'
  document.querySelector(".frog").style.gridRow = '3'
  // document.querySelector(".img-frog").style.gridColumn = '20';
  // document.querySelector(".img-frog").style.gridRow = '3';  
}
const gameOver = () => {
  if(itemColGameEnd === 20 || timeleft === 0 || level >= 5){
     //game over
      console.log("Game over");
      clearInterval(trigger)
      document.querySelector(".game-over").innerText = "GAME OVER"

      document.querySelector(".game-over").style.color = "wheat"
      document.querySelector(".game-over").style.size = "200px"

      document.querySelector("button").classList.remove("hidden")

    }else{
    return
  }
}
  
const gameOver = () => {
  if(itemColGameEnd === 20 || timeleft === 0 || level >= 5){
     //game over
      console.log("Game over");
      clearInterval(trigger)
    }else{
    return;
  }
}
const changeFlyLocation = (col) => {
    let selectedFly = Math.floor(Math.random() * 5) + 1;
    let currentFlyCol = document.querySelector(`#fly-${selectedFly}`).style.gridColumn
    
    let newFlyCol = parseInt(currentFlyCol) + col ;
    if(newFlyCol >= itemColGameEnd){
      itemColGameEnd = newFlyCol;
      console.log(itemColGameEnd);
      gameOver();
    }
    if(newFlyCol <= 20){
      console.log("Fly col" ,newFlyCol)
      document.querySelector(`#fly-${selectedFly}`).style.gridColumn = `${newFlyCol}`;
      document.querySelector(`#fly-${selectedFly}`).style.gridRowStart = `${selectedFly}`;
    }

}
const changeFrogLocation = (row) => {
  document.querySelector(".img-frog").style.gridRow = row;
}
const randomSpeed = () => {
  const speed = Math.floor(Math.random() * 4) + 1;
  return speed;

}
const gameFlyLocation = () => {
    let col = randomSpeed();
    changeFlyLocation(col)
}

const gameLogic = () => {
  timer();
  initalSetup();
  gameFlyLocation();
  trigger = setInterval(gameFlyLocation,1000);
}


let currentFrogRow = 3;
  document.onkeydown = function (event) {
  
      switch (event.keyCode) {
        case 38:
           //console.log("Up key is pressed.");
           if(currentFrogRow <= 1){
             return;
           }else{
            currentFrogRow -= 1;
            changeFrogLocation(currentFrogRow)
           }
           
           break;
        case 40:
           //console.log("Down key is pressed.");
           if(currentFrogRow >= 5){
             return;
           }else{
            currentFrogRow += 1;
            changeFrogLocation(currentFrogRow)
           }
        
           break;

        case 32:
          //console.log("Space bar pressed");
          checkAnswer();
          break;
     }
    
   
 };
const checkAnswer = () => {
  let frogRow = document.querySelector(".img-frog").style.gridRow
  let flyRow = document.querySelector(`#fly-${frogRow.charAt(0)}`)
  let question = flyRow.querySelector(".fly-question-box").innerText
  removeFlyOnCorrectAnswer(frogRow.charAt(0));
  console.log(question);
}
const timer = () => {
  var downloadTimer = setInterval(function(){
  if(timeleft <= 0){
    clearInterval(downloadTimer);
  }else{
    timeleft -= 1;
  }
  document.querySelector("#remaining").innerText = timeleft;
}, 1000);
}

// gameLogic();

const removeFlyOnCorrectAnswer = (fly_id) => {
  document.querySelector(`#fly-${fly_id}`).innerHTML = ""
}

const setLevel = (level) => {
  document.querySelector("#level").innerText = level;
  let checkIfFlyExist = document.querySelector(".img-fly")
  if(checkIfFlyExist == ""){
     if(level >= 5){
       gameOver();
     }else{
       
     }
  }else{
    level += 1;
    gameLogic();
    //need to fix running after level clearance
    
  }
}
setLevel(1);
