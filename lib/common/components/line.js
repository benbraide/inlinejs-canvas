"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasLineCompact = exports.CanvasLine = void 0;
const inlinejs_1 = require("@benbraide/inlinejs");
const shape_1 = require("./shape");
class CanvasLine extends shape_1.CanvasShape {
    Render_(ctx) {
        let position = this.GetOffsetPosition_(('stroke' in ctx) ? ctx : undefined);
        ctx.lineTo(position.x, position.y);
    }
}
exports.CanvasLine = CanvasLine;
function CanvasLineCompact() {
    customElements.define((0, inlinejs_1.GetGlobal)().GetConfig().GetElementName('canvas-line'), CanvasLine);
}
exports.CanvasLineCompact = CanvasLineCompact;
