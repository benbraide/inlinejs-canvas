"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RotatePoint = void 0;
function RotatePoint(point, angle) {
    return {
        x: ((Math.cos((2 * Math.PI) - angle) * point.x) - (Math.sin((2 * Math.PI) - angle) * point.y)),
        y: ((Math.sin((2 * Math.PI) - angle) * point.x) + (Math.cos((2 * Math.PI) - angle) * point.y)),
    };
}
exports.RotatePoint = RotatePoint;
