"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdvancePoint = void 0;
function AdvancePoint(point, angle, distance) {
    return {
        x: (point.x + (distance * Math.cos(angle))),
        y: (point.y + (distance * Math.sin(angle))),
    };
}
exports.AdvancePoint = AdvancePoint;
