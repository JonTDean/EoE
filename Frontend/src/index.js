
const loginButton = document.getElementById("login_button");

loginButton.addEventListener("click", (button) => {
    button.preventDefault();

    fetch("localhost:3000/users")
        .then(resp => resp.json())
        .then(json => console.log(json));
});