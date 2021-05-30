const obstacles = [];
let obstacleHue = 0;

class Obstacles {
    constructor(hue) {
        this.top = Math.random() * canvas.height / 3 + 20;
        this.bottom = Math.random() * canvas.height / 3 + 20;
        this.x = canvas.width;
        this.width = 20;
        this.color = `hsl(${hue}, 100%, 50%)`
        this.isScored = false;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, 0, this.width, this.top);
        ctx.fillRect(this.x, canvas.height - this.bottom, this.width, this.bottom);
    }

    update() {
        this.x -= gameSpeed;
        this.draw();
    }
}

function handlesObstacles() {
    obstacleHue++;
    if (frame % 50 === 0) {
        obstacles.unshift(new Obstacles(obstacleHue));
    }

    obstacles.forEach(obstacle => {
        obstacle.update();
    });

    // work backwards through the obstacles
    // removing the older ones that are off screen
    let index = obstacles.length - 1;
    while(index >= 0) {
        let isOffScreen = obstacles[index].x + obstacles[index].width < 0;
        if(isOffScreen) {
            obstacles.pop();
        } else {
            // if this obstacle is not offscreen
            // odds are good a newer one isn't either
            // so just bail out early
            break;
        }
        index--;
    }
}