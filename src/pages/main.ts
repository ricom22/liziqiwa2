import p5 from "p5";
import {
    sin, cos, pi
} from "mathjs";
import * as v from "./vectorField";

const setup = (p: p5) => {
    p.createCanvas(p.displayWidth, p.displayHeight);
    p.background(255);
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