let divbtn = document.querySelectorAll(".divbtn");
let heading = document.querySelector("h3");
let body = document.querySelector("body");
let highscoreDisplay = document.querySelector("#highScore");

let arr1 = []; // Game pattern
let arr2 = []; // User input pattern

let proceed = false; // Game state
let level = 0;
let highscoreValue = 0; // Stores highest level reached

let arrBtn = ["btn1", "btn2", "btn3", "btn4"]; // Button IDs

// Flash a random button and update game pattern
function flashRandom() {
  let rdiv = Math.floor(Math.random() * divbtn.length);
  let ranflash = document.getElementById(arrBtn[rdiv]);
  console.log("🔦 Random flash:", ranflash.id);

  ranflash.style.background = "white";
  setTimeout(() => {
    ranflash.removeAttribute("style");
  }, 300);

  arr1.push(arrBtn[rdiv]);
  console.log("🧠 Game pattern (arr1):", arr1);
}

// Update high score display if new level is higher
function hScore() {
  if (level > highscoreValue) {
    highscoreValue = level;
    highscoreDisplay.innerText = `🏆 High Score: ${highscoreValue}`;
  }
}

// Start game on any key press
document.addEventListener("keypress", function () {
  if (!proceed) {
    proceed = true;
    level++;
    heading.innerText = `🎮 Game started - Level ${level}`;
    flashRandom();
  }
});

// Handle user clicks on color buttons
for (let i = 0; i < divbtn.length; i++) {
  divbtn[i].addEventListener("click", function () {
    let clickedId = divbtn[i].id;
    console.log("👆 Button clicked:", clickedId);

    // Flash black briefly on click
    divbtn[i].classList.add("clicked");
    setTimeout(() => {
      divbtn[i].classList.remove("clicked");
    }, 50);

    if (proceed) {
      arr2.push(clickedId);
      console.log("🧍‍♂️ User pattern (arr2):", arr2);

      let currentIndex = arr2.length - 1;

      if (arr2[currentIndex] === arr1[currentIndex]) {
        console.log("✅ Correct input");

        if (arr2.length === arr1.length) {
          console.log("🎉 Level complete! Next round...");
          setTimeout(() => {
            level++;
            heading.innerText = `🎮 Level ${level}`;
            hScore();
            arr2 = [];
            flashRandom();
          }, 1000);
        }
      } else {
        console.log("❌ Wrong input - Game Over!");
        heading.innerText = "💀 Game Over. Press any key to restart.";

        body.classList.add("gameOver");
        setTimeout(() => {
          body.classList.remove("gameOver");
        }, 500);

        // Reset game state
        arr1 = [];
        arr2 = [];
        proceed = false;
        level = 0;
      }
    }
  });
}
