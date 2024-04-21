export function AdvancePoint(point, angle, distance) {
    return {
        x: (point.x + (distance * Math.cos(angle))),
        y: (point.y + (distance * Math.sin(angle))),
    };
}
