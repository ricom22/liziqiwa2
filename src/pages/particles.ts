import * as v from "./vectorField";

type position = {
    x: number,
    y: number
};

type particle = {
    velocity: v.Vector,
    position: position,
    mass: v.Scalar
};

export const applyForce = (f: v.Vector): ((p: particle) => particle) => {
    return (p: particle) => {

    }
}