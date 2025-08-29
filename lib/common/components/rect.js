"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasRectCompact = exports.CanvasRectElement = void 0;
const full_shape_1 = require("./full-shape");
const inlinejs_element_1 = require("@benbraide/inlinejs-element");
class CanvasRectElement extends full_shape_1.CanvasFullShapeElement {
    constructor() {
        super();
    }
    Render_(ctx) {
        const position = this.GetUnscaledOffsetPosition_();
        if (!('fillRect' in ctx)) { // Must be Path2D
            ctx.rect(position.x, position.y, this.width, this.height);
            return;
        }
        (this.mode === 'fill' || this.mode === 'both') && ctx.fillRect(position.x, position.y, this.width, this.height);
        (this.mode === 'stroke' || this.mode === 'both') && ctx.strokeRect(position.x, position.y, this.width, this.height);
    }
}
exports.CanvasRectElement = CanvasRectElement;
function CanvasRectCompact() {
    (0, inlinejs_element_1.RegisterCustomElement)(CanvasRectElement, 'canvas-rect');
}
exports.CanvasRectCompact = CanvasRectCompact;
