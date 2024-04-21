"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasClosePathCompact = exports.CanvasClosePathElement = void 0;
const inlinejs_element_1 = require("@benbraide/inlinejs-element");
const shape_1 = require("./shape");
class CanvasClosePathElement extends shape_1.CanvasShapeElement {
    constructor() {
        super();
    }
    Render_(ctx) {
        ctx.closePath();
    }
}
exports.CanvasClosePathElement = CanvasClosePathElement;
function CanvasClosePathCompact() {
    (0, inlinejs_element_1.RegisterCustomElement)(CanvasClosePathElement, 'canvas-close-path');
}
exports.CanvasClosePathCompact = CanvasClosePathCompact;
