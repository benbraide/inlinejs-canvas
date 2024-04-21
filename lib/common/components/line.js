"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasLineCompact = exports.CanvasLineElement = void 0;
const inlinejs_element_1 = require("@benbraide/inlinejs-element");
const shape_1 = require("./shape");
class CanvasLineElement extends shape_1.CanvasShapeElement {
    constructor() {
        super();
    }
    Render_(ctx) {
        const position = this.GetOffsetPosition_(('stroke' in ctx) ? ctx : undefined);
        ctx.lineTo(position.x, position.y);
    }
}
exports.CanvasLineElement = CanvasLineElement;
function CanvasLineCompact() {
    (0, inlinejs_element_1.RegisterCustomElement)(CanvasLineElement, 'canvas-line');
}
exports.CanvasLineCompact = CanvasLineCompact;
