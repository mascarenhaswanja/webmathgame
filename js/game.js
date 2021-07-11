console.log("Output - Expert Math Frog");
/* players have 60 seconds to correctly answer a series of math multiplication questions. Correctly answering a question advances the user to the next level. To win the game, the player must successfully defeat 5 levels of the game within the specified time
*/
//@TODO: Implement DB player x score

let player
// let question = []

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
            const first = parseInt(Math.floor((Math.random() * 15) + 1));
            const second = parseInt(Math.floor((Math.random() * 10) + 1));
            
            question = `${first} x ${second} = ?`;
            questionArray.push(question)
            answerArray.push(first*second);
    
    return question
}
/// new code -- mayank



const initalSetup = () => {
  for(i = 0; i<5 ; i++){
    generateQuestion();
  }
  console.log("Answer ",answerArray);
  console.log("Questn ",questionArray);
  document.querySelector(".game").innerHTML = `
  <div id="frog">
  <img class="img-frog" src="assets/img/frog_new.png">
  <p class="frog-answer-box">${answerArray[currentAnswerLocation]}</p>
  </div>
  `
  document.querySelector("#frog").style.gridColumn = '20';
  document.querySelector("#frog").style.gridRow = '3';  
  for(let i = 0; i< 5; i++){
    document.querySelector(".game").innerHTML += `
  <div class="location-col-1" id="fly-${i+1}">
  <img   class="img-fly" src="assets/img/fly.png">
  <p class="fly-question-box">${questionArray[i]}</p>
  </div>
  `
  document.querySelector(`#fly-${i+1}`).style.gridColumn = '1'
  document.querySelector(`#fly-${i+1}`).style.gridRow = `${i+1}`
  }

  
};

const setFrogAnswer = () => {
  document.querySelector(".frog-answer-box").innerText = answerArray[currentAnswerLocation]
}
const gameOver = () => {
  if(itemColGameEnd >= 20 || timeleft === 0 || level > 5){
     //game over
      console.log("Game over");
      clearInterval(trigger)
      clearInterval(timerVar);
   
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