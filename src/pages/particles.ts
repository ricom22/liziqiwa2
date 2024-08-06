import p5 from "p5";
import * as v from "./vectors";

export interface Particle {
    pos: p5.Vector;
    vel: p5.Vector;
    m: number;
}

export type Force = (particle: Particle) => p5.Vector;

export const createForce = (vector: v.Vector): Force => {
    return (particle: Particle) => {
        return v.vec2vec(vector);
    };
}

export const createParticle = (x: number, y: number, vx: number, vy: number, m: number): Particle => ({
    pos: new p5.Vector(x, y),
    vel: new p5.Vector(vx, vy),
    m: m
});

export const applyForce = (particle: Particle, force: Force): Particle => {
    const f = force(particle);
    const newVel = p5.Vector.add(particle.vel, f);
    return {
        pos: particle.pos.copy(),
        vel: newVel,
        m: particle.m
    };
};

export const update = (particle: Particle): Particle => {
    const newVel = particle.vel.div(particle.m);
    const newPos = p5.Vector.add(particle.pos, newVel);
    return {
        pos: newPos,
        vel: particle.vel.copy(),
        m: particle.m
    };
};
