class Score {
    constructor(name, level){
      this.gName = name;
      this.gLevel = level;
    }
}
  

const recoveryScore = () => {
  let highscoreArray = new Array()
  if("highscore" in localStorage) {
    highscoreArray = JSON.parse(localStorage.getItem("highscore"))
    console.log("Existing List - High Score ", highscoreArray)
    document.querySelector(".score").innerHTML = `<ul>`
    for (i = 0; i < highscoreArray.length; i++) {
      console.log(i+1, " - " + highscoreArray[i].gName + " " + highscoreArray[i].gLevel)
      document.querySelector(".score").innerHTML += `
        <li>${i+1}. ${highscoreArray[i].gName} - Level ${highscoreArray[i].gLevel}</li>`
    }
    document.querySelector(".score").innerHTML += `</ul>`
      
  }
  else {
    console.log("No Score saved yet ", highscoreArray)
  }
}

recoveryScore()
