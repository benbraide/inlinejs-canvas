"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Align = void 0;
function Align(value, from, to) {
    if (value === 'center') {
        return ((to - from) / 2);
    }
    if (value === 'end') {
        return (to - from);
    }
    return 0;
}
exports.Align = Align;
