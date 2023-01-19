"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasMoveCompact = exports.CanvasMove = void 0;
const inlinejs_1 = require("@benbraide/inlinejs");
const shape_1 = require("./shape");
class CanvasMove extends shape_1.CanvasShape {
    Render_(ctx) {
        let position = this.GetUnscaledOffsetPosition_();
        ctx.moveTo(position.x, position.y);
    }
}
exports.CanvasMove = CanvasMove;
function CanvasMoveCompact() {
    customElements.define((0, inlinejs_1.GetGlobal)().GetConfig().GetElementName('canvas-move'), CanvasMove);
}
exports.CanvasMoveCompact = CanvasMoveCompact;
