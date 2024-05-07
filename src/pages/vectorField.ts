import * as utils from './utils';

/* Types */
export type Vector = {
    x: number,
    y: number
}

export type Scalar = {
    magnitude: number
}

export const vectorFieldDo = (Fx, Fy): ((F: ((Fx, Fy) => Scalar | Vector)) => Scalar | Vector) => {
    return (F: (Fx, Fy) => Scalar | Vector) => {
        return F(Fx, Fy);
    }
};

export const getCurl = (x, y): ((Fx, Fy) => Vector) => {
    return (Fx, Fy) => {
        const dFy_dx = utils.partialDerivativeX(Fy)(x, y);
        const dFx_dy = utils.partialDerivativeY(Fx)(x, y);
        return {
            x: dFy_dx - dFx_dy,
            y: 0
        }; // 2D Curl is a vector quantity
    }
};

export const getVector = (x, y): ((Fx, Fy) => Vector) => {
    return (Fx, Fy) => {
        return {
            x: Fx(x, y),
            y: Fy(x, y)
        };
    }
};