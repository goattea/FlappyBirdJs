const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 400;

let spacePressed = false;
let frame = 0;
let score = 0;
let gameSpeed = 2;

// event listeners for space bar
window.addEventListener('keydown', (e) => {
    if (e.code === 'Space') spacePressed = true;
});

window.addEventListener('keyup', (e) => {
    if (e.code === 'Space') spacePressed = false;
});

const scoreGradient = ctx.createLinearGradient(0, 0, 0, 70);
scoreGradient.addColorStop('0.4', '#fff');
scoreGradient.addColorStop('0.5', '#000');
scoreGradient.addColorStop('0.55', '#4040ff');
scoreGradient.addColorStop('0.6', '#000');
scoreGradient.addColorStop('0.9', '#fff');

function handleScore() {
    ctx.fillStyle = scoreGradient;
    ctx.font = '90px Georgia';
    ctx.strokeText(score, 450, 70);
    ctx.fillText(score, 450, 70);
}

const bang = new Image();
bang.src = 'assets/bang.png';

function handleCollision() {
    for (let i = 0; i < obstacles.length; i++) {
        const obstacle = obstacles[i];
        let isPast = obstacle.x + obstacle.width < bird.x;
        let isComing = obstacle.x > bird.x + bird.width;
        if(isPast && !obstacle.isScored) {
            score++;
            obstacle.isScored = true;
        }
        if (!isPast && !isComing) {
            let isBetween = bird.y > obstacle.top && bird.y < canvas.height - obstacle.bottom;
            if (isBetween) break;         
            // we have hit something!
            ctx.drawImage(bang, bird.x, bird.y, 50, 50);
            ctx.fillStyle = 'black';
            ctx.font = "25px Georgia";
            ctx.fillText(`Game Over! Your score is ${score}`, 160, canvas.height / 2 - 10);
            return true;
        }
    }
    return false;
}

function animate() {
    frame++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handlesObstacles();
    bird.update();
    bird.draw();
    handleParticles();
    handleScore();
    if(handleCollision()) return;
    requestAnimationFrame(animate);
}

animate();