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

let level = 1; 
let timeleft = 60; 
let trigger ;
let timerVar ;
let gameContinueCheck ;
let itemColGameEnd = 0;
let currentFrogRow = 3;
let answerArray = new Array();
let questionArray = new Array();
let currentAnswerLocation = 0;
let answerSetUp = [2,5,1,4,3];

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
/// new code -- mayank



const initalSetup = () => {
  const selectedQuestion = Math.floor((Math.random() * 5))
  let selectedResult

  for(let i = 0; i< 5; i++){
    let [question, result] = generateQuestion()
    document.querySelector(".game").innerHTML += `
  <div class="location-col-1" id="fly-${i+1}">
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
  if(itemColGameEnd >= 20 || timeleft === 0 || level > 5){
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
};
const changeFlyLocation = (col) => {
    let selectedFly = Math.floor(Math.random() * 5) + 1;
    let currentFlyCol = document.querySelector(`#fly-${selectedFly}`).style.gridColumn
    
    let newFlyCol = parseInt(currentFlyCol) + col ;
    if(newFlyCol >= itemColGameEnd){
      itemColGameEnd = newFlyCol;
      gameOver();
    }
    if(newFlyCol <= 20){
      document.querySelector(`#fly-${selectedFly}`).style.gridColumn = `${newFlyCol}`;
      document.querySelector(`#fly-${selectedFly}`).style.gridRowStart = `${selectedFly}`;
    }

};
const changeFrogLocation = (row) => {
  document.querySelector("#frog").style.gridRow = row;
};

const animateFly = () => {
    let col = Math.floor(Math.random() * 4) + 1;
    changeFlyLocation(col)
};

const startGame = () => {
  questionArray = [];
  answerArray = [];
  currentAnswerLocation = 0;
  initalSetup();
  trigger = setInterval(animateFly,1000);
};
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
          setFrogAnswer();
          checkIfLevelCleared();
          break;
     }
    
   
 };
const checkAnswer = () => {
  let frogRow = document.querySelector("#frog").style.gridRow
  console.log(document.querySelector(".frog-answer-box").innerText)
  let flyRow = document.querySelector(`#fly-${frogRow.charAt(0)}`)
  let answerForFly = answerArray[frogRow.charAt(0) - 1];
  console.log("answer for fly", answerForFly);
  console.log("answer", answerArray[currentAnswerLocation]);

  if(answerForFly === answerArray[currentAnswerLocation]){
    console.log("Correct answer");
    currentAnswerLocation += 1;
    setFrogAnswer();

  }else{
    console.log("incorrect answer");
  }
  console.log(answerForFly);

  removeFlyOnCorrectAnswer(frogRow.charAt(0));
};
const timer = () => {
  timerVar = setInterval(function(){
  if(timeleft <= 0){
    clearInterval(timerVar);
  }else{
    timeleft -= 1;
  }
  document.querySelector("#remaining").innerText = timeleft;
}, 1000);
};
const removeFlyOnCorrectAnswer = (fly_id) => {
  document.querySelector(`#fly-${fly_id}`).innerHTML = ""
};

const checkIfLevelCleared = () => {
  let checkIfFlyExist = document.querySelector(".img-fly")
  if(checkIfFlyExist == null && level <5 ){
    startGame();
    level += 1;
    document.querySelector("#level").innerText = level;

  }else{

    console.log("max level reached")
    gameOver();
    return;
  }
}

timer();

startGame();