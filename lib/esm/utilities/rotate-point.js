export function RotatePoint(point, angle) {
    return {
        x: ((Math.cos((2 * Math.PI) - angle) * point.x) - (Math.sin((2 * Math.PI) - angle) * point.y)),
        y: ((Math.sin((2 * Math.PI) - angle) * point.x) + (Math.cos((2 * Math.PI) - angle) * point.y)),
    };
}
