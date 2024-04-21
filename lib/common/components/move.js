"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasMoveCompact = exports.CanvasMoveElement = void 0;
const inlinejs_element_1 = require("@benbraide/inlinejs-element");
const shape_1 = require("./shape");
class CanvasMoveElement extends shape_1.CanvasShapeElement {
    constructor() {
        super();
    }
    Render_(ctx) {
        const position = this.GetUnscaledOffsetPosition_();
        ctx.moveTo(position.x, position.y);
    }
}
exports.CanvasMoveElement = CanvasMoveElement;
function CanvasMoveCompact() {
    (0, inlinejs_element_1.RegisterCustomElement)(CanvasMoveElement, 'canvas-move');
}
exports.CanvasMoveCompact = CanvasMoveCompact;
