export function ComputeDisplacement(from, to) {
    return {
        x: (to.x - from.x),
        y: (to.y - from.y),
    };
}
