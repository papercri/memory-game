let cards = [];
let clics = [];
let maxClics = 50;
let countClics = 0; 
let count = 0; 
let time = 60;
let ids = ["a1", "b1", "a2", "b2", "a3", "b3", "a4", "b4", "a5", "b5", "a6", "b6", "a7", "b7", "a8", "b8"]
let cardId = null;
let newCard = null;
let shuffledCards = null;
let imageUrl = null;
const cardContainer = document.getElementById("cardContainer");
const gameOver = document.getElementById("gameOver");
const gameOverTxt = document.querySelector(".gameOver");
const resetGame = document.querySelectorAll(".resetGame");
resetGame.forEach((resetGame) => {
  resetGame.addEventListener("click", reset);
});
const timeCount = document.querySelector(".timeCount");
const clicsCount = document.querySelector(".clicsCount");

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) { 
    const j = Math.floor(Math.random() * (i + 1)); 
    [array[i], array[j]] = [array[j], array[i]]; 
  } 
  return array;
}

function generateCards() {
  for(i=0;i<ids.length;i++){
    newCard = document.createElement("div");
    newCard.setAttribute("id", ids[i]);
    newCard.classList.add("cardBack", "card", "shuff");
    cards.push(newCard);
    countClics = 0;
  }
  shuffledCards = shuffle(cards); 
  for (let car of shuffledCards){
    cardId = car.id.charAt(1);
    cardContainer.appendChild(car);
    imageUrl = "./images/"+ cardId + ".jpeg";
    car.style.backgroundImage = 'url('+imageUrl+')';
    car.addEventListener("click", turnCard); 
  }
}

function turnCard(event){
  const clickedCard = event.target;
  clickedCard.classList.remove("cardBack", "shuff");
  clickedCard.classList.add("animate", "pointer-none");
  setTimeout(() => {
    clickedCard.classList.remove("animate");
  }, 500);
  clics.push(clickedCard);
  countClicsAdd();

  if (clics.length === 2) {
    checkMatch(); 
  }
}

function checkMatch() {
  const [card1, card2] = clics;
 
  if ((card1.id!=card2.id)&&(card1.id.charAt(1) === card2.id.charAt(1))) {
    count++;
    card1.removeEventListener("click", turnCard);
    card2.removeEventListener("click", turnCard);
    setTimeout(() => {
      card1.classList.add("pointer-none");
      card2.classList.add("pointer-none");
    }, 200);
  } else {
    setTimeout(() => {
      card1.classList.add("cardBack", "animate");
      card1.classList.remove("pointer-none");
      card2.classList.add("cardBack", "animate");
      card2.classList.remove("pointer-none");
    }, 700);
    setTimeout(() => {
      card1.classList.remove("animate");
      card2.classList.remove("animate");
    }, 900);
  }
  
  clics = [];
  if (count === ids.length / 2) {
    gameOverTxt.innerHTML="You Won!"
    setTimeout(() => gOver(), 500);
  }
}
function reset(event){
  if(gameOver.classList.contains("flex")){
    gameOver.classList.add("hidden");
    gameOver.classList.remove("flex");
  }
  location.reload()
}
function countClicsAdd() {
  countClics += 1;
  clicsCount.innerHTML=maxClics-countClics;
  if(countClics>=maxClics){
    gOver();
  }
}

const timer = setInterval(function() {
  time--;
  timeCount.innerHTML=time
  if (time === 0) {
    clearInterval(timer);
    gOver();
  }
}, 1000);

function gOver(){
  if(gameOver.classList.contains("hidden")){
      gameOver.classList.add("flex");
      gameOver.classList.remove("hidden");
  }
}

generateCards()

