// Get the canvas element and its context
let canvas = document.getElementById('gameCanvas');
let context = canvas.getContext('2d');

// Initialize the score
let score = 0;

// Define the size of each square in the grid
let box = 20;

// Initialize the snake as an array of objects with x and y coordinates
let snake = [];
snake[0] = {x: 10 * box, y: 10 * box};

// Initialize the obstacles as an array of objects with x and y coordinates
let obstacles = [
    {x: Math.floor(Math.random() * 15 + 1) * box, y: Math.floor(Math.random() * 15 + 1) * box},
    {x: Math.floor(Math.random() * 15 + 1) * box, y: Math.floor(Math.random() * 15 + 1) * box},
    {x: Math.floor(Math.random() * 15 + 1) * box, y: Math.floor(Math.random() * 15 + 1) * box},
    // Add more obstacles as needed
];

// Set the initial direction of the snake
let direction = "RIGHT";

// Create the food object with random x and y coordinates
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

// The main game function
function draw() {
    // Clear the canvas and set its background color
    context.fillStyle = 'white';
    context.fillRect(0, 0, 400, 400);

    // Draw the snake
    for(let i = 0; i < snake.length; i++) {
        context.fillStyle = 'green';
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }

    // Draw the obstacles
    for(let i = 0; i < obstacles.length; i++) {
        context.fillStyle = 'gray';
        context.fillRect(obstacles[i].x, obstacles[i].y, box, box);
    }

    // Draw the food
    context.fillStyle = 'red';
    context.fillRect(food.x, food.y, box, box);

    // Save the head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Update the head position based on the direction
    if(direction == "RIGHT") snakeX = (snakeX + box) % 400;
    if(direction == "LEFT") snakeX = (snakeX - box + 400) % 400;
    if(direction == "UP") snakeY = (snakeY - box + 400) % 400;
    if(direction == "DOWN") snakeY = (snakeY + box) % 400;

    // Check if the snake has eaten the food
    if(snakeX == food.x && snakeY == food.y) {
        // Increment the score
        score++;

        // Create new food
        food = {
            x: Math.floor(Math.random() * 15 + 1) * box,
            y: Math.floor(Math.random() * 15 + 1) * box
        }
    } else {
        // Remove the tail of the snake
        snake.pop();
    }

    // Create the new head of the snake
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    // Check if the game is over
    if (
        snakeX < 0 ||
        snakeX > 19 * box ||
        snakeY < 0 ||
        snakeY > 19 * box ||
        collision(newHead, snake) ||
        collision(newHead, obstacles)) {
        clearInterval(game);
    }

    // Update the score display
    document.getElementById('score').innerHTML = 'Score: ' + score;

    // Add the new head to the snake
    snake.unshift(newHead);
}

// Update the direction based on the key pressed
function directionUpdate(event) {
    let key = event.keyCode;
    if(key == 37 && direction != "RIGHT") {
        direction = "LEFT";
    } else if(key == 38 && direction != "DOWN") {
        direction = "UP";
    } else if(key == 39 && direction != "LEFT") {
        direction = "RIGHT";
    } else if(key == 40 && direction != "UP") {
        direction = "DOWN";
    }
}

// Check if the head collides with the body
function collision(head, array) {
    for(let i = 0; i < array.length; i++) {
        if(head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}

// Listen for keydown events to update the direction
document.addEventListener('keydown', directionUpdate);

// Start the game loop
let game = setInterval(draw, 100);

// Update the score when the snake eats the food
if(snakeX == food.x && snakeY == food.y) {
    score++;
    food = {
        x : Math.floor(Math.random()*((canvas.width/box)-1)+1) * box,
        y : Math.floor(Math.random()*((canvas.height/box)-1)+1) * box
    }
} else {
    // remove the tail
    snake.pop();
}
