console.log("Menu - Expert Math Frog");

let player

const initializeSelectors = () => {
    // document.querySelector('#background').volume = 0.2
    document.querySelector("#btn-start").addEventListener("click",startGame)
    document.querySelector("#btn-rules").addEventListener("click",viewRules)
    document.querySelector("#btn-scores").addEventListener("click",viewScores)
    document.querySelector("#btn-nomusic").addEventListener("click",playMusic)
    console.log("Initialize")
}

const startGame = () => {
    console.log("Go to game - next page");
    location.replace("play.html")
}
 
const viewRules = () => {
    console.log("View Rules");
    location.replace("rules.html")
}

const viewScores = () => {
    console.log("View Scores");
    location.replace("scores.html")
}

const playMusic = () => {
    console.log("Play Music");
}


initializeSelectors()