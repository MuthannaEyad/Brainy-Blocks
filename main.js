// Select elements from the DOM
const startButton = document.querySelector(".control-buttons span");
const blocksContainer = document.querySelector(".memory-game-blocks");
const blocks = Array.from(blocksContainer.children);
const orderRange = Array.from(Array(blocks.length).keys());
const duration = 1000; // Duration for flip and match effects
const triesElement = document.querySelector('.tries span');

// Event listeners for the start and reset game buttons
startButton.onclick = handleStart;

// Setup blocks with random order and click event
blocks.forEach((block, index) => {
    block.style.order = orderRange[index];
    block.addEventListener('click', () => flipBlock(block));
});

// Handle Start Game Button Click
function handleStart() {
    // Prompt for player name
    let playerName = prompt("Whats Your Name?") || 'Unknown';
    // Display player name on the screen
    document.querySelector(".name span").innerHTML = playerName;
    // Remove the start game button
    document.querySelector(".control-buttons").remove();
    // Reset game when starting a new game
    resetGame();
}

// Function to flip a block
function flipBlock(block) {
    // Add flipped class
    block.classList.add('is-flipped');

    // Check if two blocks are flipped
    let flippedBlocks = blocks.filter(b => b.classList.contains('is-flipped'));
    if (flippedBlocks.length === 2) {
        // Check the two flipped blocks after the duration
        setTimeout(() => {
            checkBlocks(flippedBlocks[0], flippedBlocks[1]);
        }, duration);
    }
}

// Check if two blocks match
function checkBlocks(firstBlock, secondBlock) {
    // Compare data attributes
    if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
        // Match found
        firstBlock.classList.add('has-match');
        secondBlock.classList.add('has-match');
        playSound('success');
    } else {
        // No match
        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');
        incrementTries();
        playSound('fail');
    }
}

// Increment the tries counter
function incrementTries() {
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
}

// Play a sound effect
function playSound(type) {
    document.getElementById(type).play();
}

// Shuffle the elements in the array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
}

// Reset Game Function
function resetGame() {
    // Reset tries counter
    triesElement.innerHTML = '0';

    // Reset all blocks
    blocks.forEach(block => {
        block.classList.remove('is-flipped', 'has-match');
    });

    // Shuffle the blocks again
    shuffle(orderRange);
    blocks.forEach((block, index) => {
        block.style.order = orderRange[index];
    });
}

// Add a reset button to the DOM (if needed)
// You can choose where to append this button in your DOM structure
const resetButton = document.createElement("button");
resetButton.textContent = "Reset Game";
resetButton.addEventListener('click', resetGame);
document.body.appendChild(resetButton);
