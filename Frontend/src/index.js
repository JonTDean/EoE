
const playButton = document.getElementById("playButton");
const gameContainer = document.getElementById("gameContainer");
const scoreForm = document.getElementById("scoreForm");

playButton.addEventListener("click", (button) => {
    button.preventDefault();
    console.log(gameContainer.classList)

    if (gameContainer.classList < 1){
        gameContainer.classList = "hidden";
    }
    else{
        gameContainer.classList = "";
    }
});

scoreForm.addEventListener("submit", (e) => {
    e.preventDefault();

    console.log(`The Username is: ${e.target.name.value}`);
    console.log(`The Score is: ${e.target.score.value}`);
    
    const newScore = {
        userScore: e.target.score.value,
        userName: e.target.name.value,
    }

    fetch("http://localhost:3000/scores", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newScore)
    })
    .then(resp => resp.json())
    .then(json => console.log(json))
});

