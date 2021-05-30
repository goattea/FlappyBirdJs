const particles = [];
let hue = 0;

class Particle {
    constructor(hue) {
        this.x = bird.x;
        this.y = bird.y;
        this.size = Math.random() * 7 + 3;
        this.speedY = (Math.random() * 1) - 0.5;
        this.color = `hsla(${hue}, 100%, 50%, 0.8)`;
    }

    update() {
        this.x -= gameSpeed;
        this.y += this.speedY;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function handleParticles() {
    // add new element to the top of our array
    particles.unshift(new Particle(++hue));
    for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];
        particle.update();
        particle.draw();
    }

    // work backwards through the particles
    // removing the older ones that are off screen
    let index = particles.length - 1;
    while(index >= 0) {
        let isOffScreen = particles[index].x + particles[index].size < 0;
        if(isOffScreen) {
            particles.pop();
        } else {
            // if this particle is not offscreen
            // odds are good a newer one isn't either
            // so just bail out early
            break;
        }
        index--;
    }

}