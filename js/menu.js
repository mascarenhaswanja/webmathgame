console.log("Menu - Expert Math Frog");

let player

const initializeSelectors = () => {
    // document.querySelector('#background').volume = 0.2
    document.querySelector("#btn-start").addEventListener("click",startGame)
    document.querySelector("#btn-rules").addEventListener("click",viewRules)
    document.querySelector("#btn-scores").addEventListener("click",viewScores)
    document.querySelector("#btn-music").addEventListener("click",playMusic)
    document.querySelector("input").addEventListener("mouseenter",clearPlayer)
    console.log("Initialize")
}

const clearPlayer = () => {
    document.getElementById("player").value = ""
    document.querySelector(".output").innerHTML = ""
}

const startGame = () => {
    let playerName = document.getElementById("player").value
    console.log("startGame Name = ", playerName)

    if (playerName === "") {
        document.querySelector(".output").innerHTML = `
            <p>You must provide the name to start the game</p>
        `
    } else { 
        localStorage.setItem("playerName",playerName)
        location.replace("play.html")
    }
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