//create playerFactory
const playerFactory = (player, sign, ai) => {
  return {player, sign, ai};
};

//create player1, player2, playerAI with playerFactory
const player1 = playerFactory("player1", "X", "off")
const playerHuman = playerFactory("player2", "O", "off")
const playerAI = playerFactory("playerAI", "O", "on")

// Work on the AI option later. The code to enable AI option is ready.

const gamePlayFlow = (() => {
  
  let startButton = document.querySelector(".start");
  let vsPlayer = document.querySelector(".vsPlayer");
  let vsAI = document.querySelector(".vsAI");
  let restartButton = document.querySelector(".restart");
  let box = document.querySelectorAll(".box");
  let announcement = document.querySelector("h2")
  let player2 = playerHuman;;
  let currentPlayer = player1;
  let winner;
  
  function startGame() {
    //start button disappear
    startButton.style.display = "none"
    initializeGameBoard();

    //2players button appear, Computer button remain hidden
    //vsPlayer.style.display = "block";
    //vsAI.style.display = "block";

    //click vs2players
    vsPlayer.addEventListener("click", humanPlay);
    vsAI.addEventListener("click", aiPlay);
    
    announcement.innerText = "Player1 Go First"
  };

  //if choose human player, initializeGameBoard
  function humanPlay() {
    player2 = playerHuman;
    initializeGameBoard();
    console.log(player2);
      return {player2};;
  };
   
  //else, choose Ai player, initializeGameBoard
  function aiPlay() {
    player2 = playerAI;
    initializeGameBoard();
    console.log(player2);
      return {player2};
  };

    //after chose playerHuman or Computer
  function initializeGameBoard() {
    //hide both player and ai  button
    vsPlayer.style.display = "none";
    vsAI.style.display = "none";

    //show restart button
    restartButton.style.display = "block";
    restartButton.addEventListener("click", restartGame);
          
    //let box become clickable
    box.forEach(item => item.addEventListener("click", putInPlayerSign));
  }
  
  //switch player each turn
  function switchPlayer() {
    if (currentPlayer == player1) {
      currentPlayer = player2
      announcement.innerText = "Player2's Turn"
    } else {
    if (currentPlayer == player2) {
      currentPlayer = player1
      announcement.innerText = "Player1's Turn"
    }}
  };
  
  //record each player's move on the gameboard
  let gameBoard = {
    gameBoardArray: ["","","","","","","","",""]
  };
  
  let player1Array = [];
  let player2Array = [];
  let array = gameBoard.gameBoardArray;
  let playerNow = currentPlayer.player
  
  //check if there's a winner
  function checkWinning() {
    
    let winningArray = [
      ["0","1","2"],
      ["3","4","5"],
      ["6","7","8"],
      ["0","3","6"],
      ["1","4","7"],
      ["2","5","8"],
      ["0","4","8"],
      ["2","4","6"],
    ]
    
    /*
    function checkWinningCombination(num) {
      if (playerNow == player1) {
        return player1Array.indexOf(num) != -1;
      }
      
      if (playerNow == player2) {
        return player2Array.indexOf(num) != -1;
      }
    };
    */
    
    //check if player1 is winner
    for (let i = 0; i < winningArray.length; i++) {
      if (winningArray[i].every(num => player1Array.indexOf(num) != -1)) {
        announcement.innerText = "The Winner is Player1 !"
        announcement.style.color = "#7c3aed";
        announcement.style.fontSize = "2.5rem";
        box.forEach(item => item.removeEventListener("click", putInPlayerSign));
        return;
    }}
    
    //check if player2 is winner
    for (let i = 0; i < winningArray.length; i++) {
      if (winningArray[i].every(num => player2Array.indexOf(num) != -1)) {
        announcement.innerText = "The Winner is Player2 !";
        announcement.style.color = "#7c3aed";
        announcement.style.fontSize = "2.5rem";
        box.forEach(item => item.removeEventListener("click", putInPlayerSign));
        return;
    }}
    
    if (array.every(num => num != "")){
      announcement.innerText = "Tie! Play Again!";
      return;
    }
    
    //if no winner, then switch to next player
    switchPlayer();
  };
  
  
  //once player clicked the gameboard, they put own sign into the box
  function putInPlayerSign(e){
    //if (player2 == playerAI) {
    //  function AI()
    //}
    if (e.target.innerText == "") {
      e.target.innerText = currentPlayer.sign;
      } else {
        return;
      }
    
    let boxNumber = e.target.getAttribute("data-type");
    array[boxNumber] = currentPlayer.player;
    
    if (currentPlayer == player1) {
      player1Array.push(boxNumber)
    }
    
    if (currentPlayer == player2) {
      player2Array.push(boxNumber)
    }
    
    checkWinning();
  }
  
  //click restart button to clear the array and box's signs
  let restartGame = () => {
    player1Array = [];
    player2Array = [];
    array = ["","","","","","","","",""]
    announcement.innerText = "Let's Start! Player1 First";
    box.forEach(box => box.innerText = "");
    box.forEach(item => item.addEventListener("click", putInPlayerSign));
  };

    //Function Footer
    return {startGame,humanPlay};
})();

//Start Here

let button = document.querySelector("button");
button.addEventListener("click", gamePlayFlow.startGame);

console.log("ok")