"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindAncestorByFunction = void 0;
const inlinejs_1 = require("@benbraide/inlinejs");
function FindAncestorByFunction(target, name) {
    const found = (0, inlinejs_1.FindAncestor)(target, el => (name in el));
    return (found ? found : null);
}
exports.FindAncestorByFunction = FindAncestorByFunction;
