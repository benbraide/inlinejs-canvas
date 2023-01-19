"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComputeDisplacement = void 0;
function ComputeDisplacement(from, to) {
    return {
        x: (to.x - from.x),
        y: (to.y - from.y),
    };
}
exports.ComputeDisplacement = ComputeDisplacement;
