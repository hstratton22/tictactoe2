let player1 = true; 
let play = true;
let clickCount = 0;
let gameWinner;
let game = {
    "1": null,
    "2": null,
    "3": null,
    "4": null,
    "5": null,
    "6": null,
    "7": null,
    "8": null,
    "9": null,
    "winner": null
};

if (document.getElementById("game")) {
    //window.setTimeout(function(){ document.location.reload(true); }, 15000); // this is to refresh the page every 15 seconds
    player1Turn = document.getElementById("player1Turn").value;
    const user = document.getElementById("user").innerText;
    const player1 = document.getElementById("player1").value;
    const player2 = document.getElementById("player2").value;
    console.log(play);
    console.log(typeof player1Turn);
    console.log(user);
    console.log(player1);
    console.log(player2);

    if (user == player1){
        document.getElementById("playerNumber").innerHTML = "You are Player 1.";
        document.getElementById("playerSymbol").innerHTML = "Your symbol is: X";
    } else {
        document.getElementById("playerNumber").innerHTML = "You are Player 2.";
        document.getElementById("playerSymbol").innerHTML = "Your symbol is: O";
    }

    function playerturn() {
        if (this.innerHTML == ''){
            if (play) {
                if (player1Turn && player1 == user) {
                    this.innerHTML = 'X';
                    game[this.id] = this.innerHTML;
                    console.log(game);
                    player1Turn = false;
                    clickCount++;
                } 
                if (player2 == user && player1Turn == 'false') {
                    this.innerHTML = 'O';
                    game[this.id] = this.innerHTML;
                    console.log(game);
                    player1Turn = true;
                    clickCount++;
                }
            }
        }
        console.log("player1Turn");
        console.log(player1Turn);
        checkwin();
        sendJson();
    }
} else {
    function playerturn() {
        if (this.innerHTML == ''){
            if (play) {
                if (player1Turn) {
                    this.innerHTML = 'X';
                    game[this.id] = this.innerHTML;
                    console.log(game);
                    player1Turn = false;
                }
                else {
                    this.innerHTML = 'O';
                    game[this.id] = this.innerHTML;
                    console.log(game);
                    player1Turn = true;
                }
            }
            clickCount++;
        }
        checkwin();
    }
}

function checkwin() {
    grid = document.querySelectorAll('#myTable td');
    // check vert
    let i = 0;
    for (i = 0; i < 3; i++) {
        if (grid[i].innerHTML != ''){
            if (grid[i].innerHTML === grid[i+3].innerHTML && grid[i+3].innerHTML === grid[i+6].innerHTML){
                checkWinner(i, i, i+3, i+6);
            }
        }
    }
    // check horizontal
    for (i = 0; i < 7; i += 3) {
        if (grid[i].innerHTML != ''){
            if (grid[i].innerHTML === grid[i+1].innerHTML && grid[i+1].innerHTML === grid[i+2].innerHTML) {
                checkWinner(i, i, i+1, i+2);
            }
        }
    }
    // diagonal down
    if (grid[0].innerHTML != ''){
        if (grid[0].innerHTML == grid[4].innerHTML && grid[4].innerHTML == grid[8].innerHTML) {
            checkWinner(0, 0, 4, 8);
        }
    }
    // diagonal up
    if (grid[2].innerHTML != ''){
        if (grid[2].innerHTML == grid[4].innerHTML && grid[4].innerHTML == grid[6].innerHTML) {
            checkWinner(2, 2, 4, 6);
        }
    }
    // tie game
    if (clickCount == 9 && play == true) {
        document.getElementById("title").innerText = "Tie Game!";
        document.querySelectorAll('#myTable td').forEach(e => e.classList.add("winner"));
        gameWinner = "tie";
        play = false;
    }
}

function checkWinner(input, a, b, c){
    if (grid[input].innerHTML === 'X'){
        document.getElementById("title").innerText = "Player 1 Wins!";
        gameWinner = "player1";
        background(a, b, c)
        play = false;
    } else {
        document.getElementById("title").innerText = "Player 2 Wins!";
        gameWinner = "player2";
        background(a, b, c)
        play = false;
    }
}

function background(a, b, c){
    grid[a].classList.add("winner");
    grid[b].classList.add("winner");
    grid[c].classList.add("winner");
}

if (document.getElementById("reset")) {
    document.getElementById("reset").addEventListener("click", reset);

    function reset() {
        document.querySelectorAll('#myTable td').forEach(e => e.innerHTML = "");
        document.querySelectorAll('#myTable td').forEach(e => e.classList.remove("winner"));
        document.getElementById("title").innerText = "Tic Tac Toe"
        player1Turn = true;
        play = true;
        clickCount = 0;
    }
}

function sendJson() {
    const gameGrid = JSON.stringify(game);
    document.getElementById("play").value = play;
    console.log("player1Turn");
    console.log(player1Turn);
    document.getElementById("player1Turn").value = String(player1Turn);
    document.getElementById("gameWinner").value = gameWinner;
    document.getElementById("gameGrid").value = gameGrid;
    document.getElementById("game").submit();
}


    document.getElementById("1").addEventListener("click", playerturn);
    document.getElementById("2").addEventListener("click", playerturn);
    document.getElementById("3").addEventListener("click", playerturn);
    document.getElementById("4").addEventListener("click", playerturn);
    document.getElementById("5").addEventListener("click", playerturn);
    document.getElementById("6").addEventListener("click", playerturn);
    document.getElementById("7").addEventListener("click", playerturn);
    document.getElementById("8").addEventListener("click", playerturn);
    document.getElementById("9").addEventListener("click", playerturn);
