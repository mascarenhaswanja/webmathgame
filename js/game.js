console.log("Output - Expert Math Frog");
/* players have 60 seconds to correctly answer a series of math multiplication questions. Correctly answering a question advances the user to the next level. To win the game, the player must successfully defeat 5 levels of the game within the specified time
*/
//@TODO: Implement DB player x score

let question = []
const startGame = () => {
    console.log("Start Game");
    /* @TODO: In each level, enemies move from left to right at random speeds.
     Some enemies will move faster; others will move slower. */

    question = generateQuestions()
}

const viewRules = () => {
    console.log("View Rules");

}

const viewScores = () => {
    console.log("View Scores");
}

document.querySelector("#btn-start").addEventListener("click",startGame)
document.querySelector("#btn-rules").addEventListener("click",viewRules)
document.querySelector("#btn-scores").addEventListener("click",viewScores)

/*  For each row generate the question with random numbers
Each multiplication question must consist of two randomly generated numbers.
  The first number must be between 1-15.
  The second number must be a value between 1-10.
*/ 
const generateQuestions = () => {
    for (let i = 0 ; i < 5 ; i ++) {
        // generate different questions for each level

            const first = Math.floor((Math.random() * 15) + 1)
            const second = Math.floor((Math.random() * 10) + 1)
            
            question[i] = `${first} * ${second} = ?`
    
    } 
}

