let player
// let question = []

let level = 1; 
// let timeleft = 60; 
let trigger ;
let timerVar ;
let gameContinueCheck ;
let itemColGameEnd = 0;
let currentFrogRow = 3;
let answerArray = new Array();
let questionArray = new Array();
let currentAnswerLocation = 0;
let answerSetUp = new Array();
let boolGameOver = false;

const generateRandomAnswers = () => {
do {
  const number = parseInt(Math.floor((Math.random() * 5) + 0));
    if(!answerSetUp.includes(number)){
      answerSetUp.push(number);
    }
    console.log("Answer set",answerSetUp);
    console.log("Array length", answerSetUp.length)
} while (answerSetUp.length < 5);
}
/*  For each row generate the question with random numbers
Each multiplication question must consist of two randomly generated numbers.
  The first number must be between 1-15.
  The second number must be a value between 1-10.
*/ 
class Score {
  constructor(name, level){
    this.gName = name;
    this.gLevel = level;
  }
}

const savePlayerData = () => {

  let highscoreArray = new Array();
  let playerName = "Mayank"
  if("highscore" in localStorage){
    highscoreArray = JSON.parse(localStorage.getItem('highscore'));
    const scoreItem = new Score(playerName,level);
    highscoreArray.push(scoreItem);
    localStorage.setItem('highscore', JSON.stringify(highscoreArray));
  }else{
    const scoreItem = new Score(playerName,level);
    highscoreArray.push(scoreItem);
    localStorage.setItem('highscore', JSON.stringify(highscoreArray));
  }
};
const generateQuestion= () => {
        // generate different questions for each level

        let question = ""
            const first = parseInt(Math.floor((Math.random() * 15) + 1));
            const second = parseInt(Math.floor((Math.random() * 10) + 1));
            
            question = `${first} x ${second} = ?`;
            questionArray.push(question)
            answerArray.push(first*second);
    
    return question
};
/// new code -- mayank



const initalSetup = () => {
  for(i = 0; i<5 ; i++){
    generateQuestion();
  }
  generateRandomAnswers();
  console.log("Answer ",answerArray);
  console.log("Questn ",questionArray);
  document.querySelector(".game").innerHTML = `
  <div id="frog">
  <img class="img-frog" src="assets/img/frog_new.png">
  <p class="frog-answer-box">${answerArray[answerSetUp[currentAnswerLocation]]}</p>
  </div>
  `
  console.log("answer inital frog ",answerSetUp[currentAnswerLocation]);
  document.querySelector("#frog").style.gridColumn = '20';
  document.querySelector("#frog").style.gridRow = '3';  
  for(let i = 0; i< 5; i++){
    document.querySelector(".game").innerHTML += `
  <div class="location-col-1" id="fly-${i+1}">
  <img   class="img-fly" src="assets/img/fly.png">
  <p class="fly-question-box" id="fly-quesiton-${i+1}">${questionArray[i]}</p>
  </div>
  `
  document.querySelector(`#fly-${i+1}`).style.gridColumn = '1'
  document.querySelector(`#fly-${i+1}`).style.gridRow = `${i+1}`
  }
};

const setFrogAnswer = () => {
  document.querySelector(".frog-answer-box").innerText = answerArray[answerSetUp[currentAnswerLocation]]
};
const gameOver = () => {
      boolGameOver = true;
      timeleft = 0;
      savePlayerData();
      gameStatus("Game over!");
      clearInterval(timerVar);
      level = 1;
      document.onkeydown = ""
};
const changeFlyLocation = (col) => {
    let selectedFly = Math.floor(Math.random() * 5) + 1;
    // let currentFlyCol = document.querySelector(`#fly-${selectedFly}`).style.gridColumn
    let fly = document.querySelector(`#fly-${selectedFly}`)
    if(fly != null && boolGameOver === false){
      let currentFlyCol = document.querySelector(`#fly-${selectedFly}`).style.gridColumn

    
      let newFlyCol = parseInt(currentFlyCol) + col ;
      if(newFlyCol >= 20){
        document.querySelector(`#fly-${selectedFly}`).style.gridColumn = `20`;
        itemColGameEnd = newFlyCol;
        gameOver();
      }
      if(newFlyCol < 20 ){
        document.querySelector(`#fly-${selectedFly}`).style.gridColumn = `${newFlyCol}`;
        document.querySelector(`#fly-${selectedFly}`).style.gridRowStart = `${selectedFly}`;
      }
    }
   

};
const changeFrogLocation = (row) => {
  document.querySelector("#frog").style.gridRow = row;
};
const animateFly = () => {
    let col = Math.floor(Math.random() * 4) + 1;
    changeFlyLocation(col);
};
const startGame = () => {
  questionArray = [];
  answerArray = [];
  initalSetup();
  currentAnswerLocation = 0;
  setKeyDown();
  boolGameOver = false;
  clearInterval(trigger)
  trigger = setInterval(animateFly,800);
  console.log("game started");
};
const setKeyDown = () => {
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
};
const changeQuestion = (loc) => {
   const first = parseInt(Math.floor((Math.random() * 15) + 1));
   const second = parseInt(Math.floor((Math.random() * 10) + 1));
   
   const newQuestion = `${first} x ${second} = ?`;
   const newAnswer = first*second;
   questionArray[loc-1] = newQuestion;
   answerArray[loc-1] = newAnswer;
   document.querySelector(`#fly-quesiton-${loc}`).innerHTML = newQuestion

 };
const checkAnswer = () => {
  let frogRow = document.querySelector("#frog").style.gridRow
  console.log(document.querySelector(".frog-answer-box").innerText)
  let currentFlyLocation = frogRow.charAt(0)
  let flyRow = document.querySelector(`#fly-${currentFlyLocation}`)
  let answerForFly = answerArray[currentFlyLocation - 1];


  if(answerForFly === answerArray[answerSetUp[currentAnswerLocation]]){
    console.log("Correct answer");
    currentAnswerLocation += 1;
    setFrogAnswer();
    removeFlyOnCorrectAnswer(currentFlyLocation);

  }else{
    console.log("incorrect answer");
    changeQuestion(currentFlyLocation);

  }

};
const timer = () => {
  clearInterval(timerVar);
  let timeleft = 60;
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
  document.querySelector(`#fly-${fly_id}`).gridColumn = ""
  document.querySelector(`#fly-${fly_id}`).id = ""

};

const checkIfLevelCleared = () => {
  let checkIfFlyExist = document.querySelector(".img-fly")

  if(checkIfFlyExist === null && level <5 ){
    startGame();
    setFrogAnswer();
    level += 1;
    document.querySelector("#level").innerText = level;

    if(level === 5){
      console.log("level == 6");
      level = 6;
    }

  }else if(checkIfFlyExist === null && level > 5 ){
      level = 5;
      document.querySelector(".frog-answer-box").innerText = "I am full!"
      console.log("game won", checkIfFlyExist);
      gameStatus("You win!")
      boolGameOver = true;
      timeleft = 0;
      savePlayerData();
      clearInterval(timerVar);
      level = 1;
      document.onkeydown = ""
  }
};
const gameStatus = (status) => {
  document.querySelector(".game-over-container").classList.remove("hidden")
  document.querySelector(".game-over").innerText = status;
  document.querySelector("#play-again").addEventListener("click", () => {
    timer();
    startGame();
    document.querySelector("#level").innerText = 1;
    document.querySelector("#remaining").innerText = 60;

    document.querySelector(".game-over-container").classList.add("hidden");
  })
  document.querySelector("#high-scores").addEventListener("click", () => {
    location.replace("scores.html")

  })
  if(level == 6){
    document.querySelector("#level-game-over").innerText = 5
  }else{
    document.querySelector("#level-game-over").innerText = level

  }
};

timer();
startGame();


