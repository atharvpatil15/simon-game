let divbtn = document.querySelectorAll('.divbtn');
let heading = document.querySelector('h3');

// arr1 stores the game pattern (flashed sequence)
// arr2 stores the user clicks
let arr1 = [];
let arr2 = [];

let proceed = false; // Set to true after first click to start the game
let level = 0;

// Array of button IDs to select random button
let arrBtn = ['btn1', 'btn2', 'btn3', 'btn4'];

//  Function to flash a random button and store it in arr1 (game pattern)
function flashRandom() {
    let rdiv = Math.floor(Math.random() * divbtn.length); // random index from 0 to 3
    let ranflash = document.getElementById(arrBtn[rdiv]); // get the button element
    console.log('🔦 Random flash:', ranflash.id);

    // Visually flash the button by changing color
    ranflash.style.background = 'white';

    // Remove flash after 300ms
    setTimeout(() => {
        ranflash.removeAttribute('style');
    }, 300);

    // Store the ID in the game pattern (arr1)
    arr1.push(arrBtn[rdiv]);
    console.log('🧠 Game pattern (arr1):', arr1);
}

// ✅ Add event listener for each button
for (let i = 0; i < divbtn.length; i++) {
    divbtn[i].addEventListener('click', function () {
        let clickedId = divbtn[i].id; // Get the id of clicked button
        console.log('👆 Button clicked:', clickedId);

        // ✅ START THE GAME ONLY ON FIRST CLICK
        if (!proceed) {
            proceed = true;
            level++;
            heading.innerText = `🎮 Game started - Level ${level}`;

            flashRandom(); // Show first pattern
        } else {
            // ✅ USER CLICKED DURING GAME - STORE IN USER PATTERN (arr2)
            arr2.push(clickedId);
            console.log('🧍‍♂️ User pattern (arr2):', arr2);

            // ✅ NEW LOGIC: COMPARE USER PATTERN WITH GAME PATTERN STEP BY STEP
            let currentIndex = arr2.length - 1; // current step index

            // ✅ Check if user click is correct at this step
            if (arr2[currentIndex] === arr1[currentIndex]) {
                console.log('✅ Correct input');

                // If the user finished current level's full pattern
                if (arr2.length === arr1.length) {
                    console.log('🎉 Level complete! Going to next level...');
                    setTimeout(() => {
                        level++;
                        heading.innerText = `🎮 Level ${level}`;
                        arr2 = []; // Reset user input for next round
                        flashRandom(); // Add new flash to sequence
                    }, 1000);
                }
            } else {
                // ❌ USER CLICKED WRONG BUTTON - GAME OVER
                console.log('❌ Wrong input - Game Over!');
                heading.innerText = '💀 Game Over. Press refresh to restart.';

                // Reset everything
                arr1 = [];
                arr2 = [];
                proceed = false;
                level = 0;
            }
        }
    });
}
