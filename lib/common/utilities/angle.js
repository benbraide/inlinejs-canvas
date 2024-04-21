"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResolveAngle = void 0;
function ResolveAngle(angle) {
    return (/^.+deg$/.test(angle) ? ((Math.PI / 180) * (parseFloat(angle) || 0)) : (parseFloat(angle) || 0));
}
exports.ResolveAngle = ResolveAngle;
