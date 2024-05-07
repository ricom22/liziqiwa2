// Compute the partial derivative of f with respect to x
export function partialDerivativeX(f: ((x, y) => number), h: number = 1e-6) {
    return (x, y) => {
        return (f(x + h, y) - f(x, y)) / h;
    }
}

// Compute the partial derivative of f with respect to y
export function partialDerivativeY(f: ((x, y) => number), h: number = 1e-6) {
    return (x, y) => {
        return (f(x, y + h) - f(x, y)) / h;
    }
}