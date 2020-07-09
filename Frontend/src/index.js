
const playButton = document.getElementById("playButton");
// const scoreForm = document.getElementById("scoreForm");
const scoreBoard = document.getElementById("scoreBoard");
const scoreOl = document.getElementById("scoreList"); 

// Creates a new score from the incoming form submit
// scoreForm.addEventListener("submit", (e) => {
//     e.preventDefault();

//     console.log(`The Username is: ${e.target.name.value}`);
//     console.log(`The Score is: ${e.target.score.value}`);
    
//     const newScore = {
//         userScore: e.target.score.value,
//         userName: e.target.name.value,
//     };

//     fetch("http://localhost:3000/scores", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(newScore)
//     })
//     .then(resp => resp.json())
//     .then(json => console.log(json))
// });

// Populates the score boards
function populateScoreBoard(){
    fetch(`http://localhost:3000/scores`)
    .then(resp => resp.json())
    .then(json => {
        console.log(json);
        return json;
    })
    .then(json => createMultipleScores(json))
}

// Creates Multiple scores
function createMultipleScores(incomingData){
    incomingData.forEach(createScore) 
}

function createScore(score){
    let scoreLi = document.createElement("li");
    scoreLi.innerHTML = `
    <p>Name: ${score.userName} | Score: ${score.userScore}</p>
    `
    
    scoreOl.appendChild(scoreLi);
}

populateScoreBoard()
