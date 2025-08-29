"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RotatePoint = void 0;
function RotatePoint(point, angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return {
        x: (point.x * cos) + (point.y * sin),
        y: (point.y * cos) - (point.x * sin),
    };
}
exports.RotatePoint = RotatePoint;
