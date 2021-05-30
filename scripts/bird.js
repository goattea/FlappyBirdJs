let angle = 0;

class Bird {
    constructor() {
        this.x = 150;
        this.y = 200;
        this.vy = 0; // velocity y, determines vertical speed
        this.width = 20;
        this.height = 20;
        this.weight = 1; // amount of force pulling down
    }

    update() {
        // use the angle to give the bird a fluctuating sinusoidal movement
        angle += 0.12;
        let curve = Math.sin(angle) * 20;

        const lowestPosition = canvas.height - (this.height * 3) + curve;
        if (this.y > lowestPosition) {
            // make sure we can't fall off the screen
            this.y = lowestPosition;
            this.vy = 0;
        }
        else if (this.y < this.height) {
            // make sure we can't fly up off screen
            this.y = this.height;
            this.vy = 0;
        }
        else {
            // increases the velocity with each update
            // based on current weight and moves the player down
            this.vy += this.weight;
            this.vy *= 0.9; // helps regulate "flap" rate
            this.y += this.vy;
        }


        if (spacePressed && this.y > this.height * 3) this.flap();
    }

    draw() {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    flap() {
        this.vy -= 2;
    }
}

const bird = new Bird();
