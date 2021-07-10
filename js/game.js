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

    // question = generateQuestions()
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
            question = `${parseInt(first)} * ${parseInt(second)}`
    
    return question
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


const initalSetup = () => {
  document.querySelector(".game").innerHTML = `
  <img  class="img-frog" src="assets/img/frog_new.png">
  `
  document.querySelector(".img-frog").style.gridColumn = '20';
  document.querySelector(".img-frog").style.gridRow = '3';  
  for(let i = 0; i< 5; i++){
    document.querySelector(".game").innerHTML += `
  <div class="location-col-1 " id="fly-${i+1}">
  <img   class="img-fly" src="assets/img/fly.png">
  <p class="fly-question-box">${generateQuestion()}</p>
  </div>
  `
  document.querySelector(`#fly-${i+1}`).style.gridColumn = '1'
  document.querySelector(`#fly-${i+1}`).style.gridRow = `${i+1}`
  }

  
}
let itemColGameEnd = 0
const gameOver = () => {
  if(itemColGameEnd === 20){
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
    }
    gameOver();
    console.log("Fly col" ,newFlyCol)
    document.querySelector(`#fly-${selectedFly}`).style.gridColumn = `${newFlyCol}`;
    document.querySelector(`#fly-${selectedFly}`).style.gridRowStart = `${selectedFly}`;
  // }




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

initalSetup()
gameFlyLocation()
var trigger ;

const gameLogic = () => {
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
  console.log(question);
}

gameLogic();
