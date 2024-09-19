const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const scoreElement = document.getElementById("score");

const box = 20; // Taille d'une case
let snake = [];
snake[0] = {
    x: 10 * box,
    y: 10 * box
};

let direction = null;

let food = {
    x: Math.floor(Math.random() * (canvas.width / box)) * box,
    y: Math.floor(Math.random() * (canvas.height / box)) * box
};

let score = 0;

document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
    let key = event.keyCode;
    if (key == 37 && direction != "RIGHT") {
        direction = "LEFT";
    } else if (key == 38 && direction != "DOWN") {
        direction = "UP";
    } else if (key == 39 && direction != "LEFT") {
        direction = "RIGHT";
    } else if (key == 40 && direction != "UP") {
        direction = "DOWN";
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dessiner le serpent
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? "#0f0" : "#8f8";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.strokeStyle = "#000";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    // Dessiner la nourriture
    ctx.fillStyle = "#f00";
    ctx.fillRect(food.x, food.y, box, box);

    // Position de la tête du serpent
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Mise à jour de la position en fonction de la direction
    if (direction == "LEFT") snakeX -= box;
    if (direction == "UP") snakeY -= box;
    if (direction == "RIGHT") snakeX += box;
    if (direction == "DOWN") snakeY += box;

    // Si le serpent mange la nourriture
    if (snakeX == food.x && snakeY == food.y) {
        // Générer une nouvelle nourriture
        food = {
            x: Math.floor(Math.random() * (canvas.width / box)) * box,
            y: Math.floor(Math.random() * (canvas.height / box)) * box
        };
        // Augmenter le score
        score++;
        scoreElement.innerHTML = "Score : " + score;
    } else {
        // Enlever la queue
        snake.pop();
    }

    // Nouvelle tête du serpent
    let newHead = {
        x: snakeX,
        y: snakeY
    };

    // Fin du jeu si le serpent se heurte aux murs ou à lui-même
    if (
        snakeX < 0 ||
        snakeY < 0 ||
        snakeX >= canvas.width ||
        snakeY >= canvas.height ||
        collision(newHead, snake)
    ) {
        clearInterval(game);
        alert("Game Over. Votre score est : " + score);
        return;
    }

    // Ajouter la nouvelle tête au début du serpent
    snake.unshift(newHead);
}

function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}

// Démarrer le jeu
let game = setInterval(draw, 100);
