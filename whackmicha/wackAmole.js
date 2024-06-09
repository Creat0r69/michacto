/*
HERE IS THE JS TO RUN THE GAME
*/
const holes = document.querySelectorAll(".hole"); // .hole from css
const scoreBoard = document.querySelector(".score"); // .score from css
const professors = document.querySelectorAll(".professor"); // .professor from css
const professors2 = document.querySelectorAll(".professor2");
const timer = document.querySelector(".time");
const character = [professors, professors2];
const holeUp = [];
let lastHole; // let are variables.
let timeUp;
let score;
let timeCount;
let timeAmount = 20000;
var play = false;
let hit = new Audio("./audio/Bat_hit.wav");
let music = new Audio("./audio/GameMusic.mp3");
let ouch = new Audio("./audio/ouch.mp3");

function randChar(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function randAmount(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
//Function to give a random time to show the image
function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

/*
This randomHole function is to control the professor pop up from which hole.
using a random gen to get a random hole.
creating array for the holes. 1 - 9
*/
function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];
  // if the hole is the same as the previews holes, this if will run.
  if (hole === lastHole) {
    return randomHole(holes);
  }
  lastHole = hole; // save the hole into lastHole for if statement in next run.
  return hole; // return the hole to peep() function.
}

/*
This peep function is to control the speed and timeframes of the image
to show in each hole. The numbers are big because it counts in millisecond
*/
function peep() {
  let hole;
  const time = randomTime(800, 1000);
  const holeAmount = randAmount(1,3); // call randAmount function to generate an amount of hole.
  for(let i =0; i < holeAmount; i++) { // for loop for the amount of hole.
    hole = randomHole(holes); // decide which hole will pop up
    holeUp[i] = hole; // store the hole in an array for later
    hole.classList.add("up"); // creating a class list on hole and added up to it. up is in the css.\
  }
 // document.getElementsByClassName("professor").game.zIndex = "2";
  setTimeout(() => {
    for(let i =0; i < holeUp.length; i++) {
      hole = holeUp[i];
      hole.classList.remove("up"); // remove up so go down
    }
   // document.getElementsByClassName("professor").game.zIndex = "2";
    //timeCount = timeUp;
    if (!timeUp) peep(); // When time is not up, it will call the peep() method again.
    if (timeUp) {
      play = false;
      document.querySelector('.game').style.cursor = "auto";
      music.pause();
      music.currentTime = 0;
    } // When the time is up, play will turn back to false.
  }, time); // when the time is reach, the professor will pop back in.
}

/*
This startGame function is to control and stop the game
when the time is up.
*/

function startGame() {
  music.play();
  // this code start first.
  if(play == true) { // This if statement is to prevent the click of play button more than once.
    console.log("You are playing the game right now!");
  }
  if(play == false) {
    tick();
    document.querySelector('.game').style.cursor = "url(gameImage/hammer_sprite.png), pointer";
    play = true; // change the play to true, when the player press play.
    timeCount = timeAmount / 1000;
    //timer.textContent = timeCount; // display the time.
    scoreBoard.textContent = 0; // score will display 0.
    timeUp = false; // time will be false up until time is over.
    score = 0; // score start from 0.
    peep(); // call the peep() function.
    setTimeout(() => (timeUp = true), timeAmount); // This change the length of the game.
  }
}


/*
This bonk is to control the score counter when you hit a professor.
if isTrusted is used to prevent other use JS to fake
the game in order to win, not too necessary.
*/
function bonk(e) {
  if (!e.isTrusted) return;
  hit.play();
  ouch.play();
  hit.currentTime = 0;
  ouch.currentTime = 0;
  score = score + 10;
  this.parentNode.classList.remove("up");
  scoreBoard.textContent = score;
}

function tick() {
  setTimeout(() => {
    if(timeCount > 0){
    timeCount--;
    timer.textContent = timeCount;
    }
    if(timeCount <= 0){
      clearTimeout();
    }else{
      tick();
    }
  },1000)
}

professors.forEach((professor) => professor.addEventListener("click", bonk));
professors2.forEach((professor2) => professor2.addEventListener("click", bonk));
