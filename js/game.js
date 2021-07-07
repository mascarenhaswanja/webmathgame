console.log("Output - Expert Math Frog");
/* players have 60 seconds to correctly answer a series of math multiplication questions. Correctly answering a question advances the user to the next level. To win the game, the player must successfully defeat 5 levels of the game within the specified time
*/
//@TODO: Implement DB player x score

let player
// let question = []
let score = 0
let fly = []

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
  <img  class="img-frog location-col-5 location-row-3" src="assets/img/frog_new.png">
  `
  for(let i = 0; i< 5; i++){
    document.querySelector(".game").innerHTML += `
  <div class="location-col-1 ">
  <img  class="img-fly" src="assets/img/fly.png">
  <p class="fly-question-box">${generateQuestion()}</p>
  </div>
  `
  }
  
}

const changeFlyLocation = (row,col) => {
  document.querySelector("img-fly").className = `location-row-${row}   location-col-${col}`;
}
const changeFrogLocation = (row) => {
  document.querySelector("img-frog").className += `location-row-${row} `;
}
initalSetup()

