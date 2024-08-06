import p5 from "p5";
import {
    sin, cos, pi
} from "mathjs";
import * as v from "./vectors";
import * as pt from "./particles";

let particles = [];

const setup = (p: p5) => {
    p.createCanvas(p.displayWidth, p.displayHeight);
    p.background(255);

    // Spawn particles at each pixel
    for (let x = 0; x < p.width; x += 100) {
        for (let y = 0; y < p.height; y += 100) {
            particles.push(pt.createParticle(x, y, 0, 0, 0.5));
        }
    }
}

const draw = (p: p5) => {
    p.background(255);
    // Fx(x, y) => x-coord of vector field at (x, y)
    const Fx = (x, y) => {
        return sin(x+y);
    }

    // Fy(x, y) => y-coord of vector field at (x, y)
    const Fy = (x, y) => {
        return cos(x-y);
    }

    // Draw the vector field
    const vectorField = v.vectorFieldDo(Fx, Fy);
    for (let x = 0; x < p.width; x += 50) {
        for (let y = 0; y < p.height; y += 50) {
            const vector = vectorField(v.getVector(x, y));
            p.push();
            p.translate(x, y);
            p.stroke(0);
            p.strokeWeight(2);
            p.line(0, 0, vector.x * 20, vector.y * 20);
            p.pop();
        }
    }

    // Apply the vector field to the particles
    const force: pt.Force = (particle: pt.Particle) => {
        const x = particle.pos.x;
        const y = particle.pos.y;
        const vector = vectorField(v.getVector(x, y));
        const ret =  v.vec2vec(vector as v.Vector).div(particle.m);
        console.log(ret);
        return ret;
    }
    particles = particles.map(particle => pt.applyForce(particle, force));

    // Update the particles
    particles = particles.map(particle => pt.update(particle));

    // Draw the particles
    particles.forEach(particle => {
        p.push();
        p.translate(particle.pos.x, particle.pos.y);
        p.stroke(0);
        p.strokeWeight(3);
        p.point(0, 0);
        p.pop();
    });
}

let sketch = (p: p5) => {
    p.preload = () => {

    };

    p.setup = () => {
        setup(p);
    };

    p.mouseClicked = () => {
    };

    p.draw = () => {
        draw(p);
    };
};

new p5(sketch, document.getElementById("sketch") as HTMLElement);