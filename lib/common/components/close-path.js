"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasClosePathCompact = exports.CanvasClosePath = void 0;
const inlinejs_1 = require("@benbraide/inlinejs");
const shape_1 = require("./shape");
class CanvasClosePath extends shape_1.CanvasShape {
    Render_(ctx) {
        ctx.closePath();
    }
}
exports.CanvasClosePath = CanvasClosePath;
function CanvasClosePathCompact() {
    customElements.define((0, inlinejs_1.GetGlobal)().GetConfig().GetElementName('canvas-close-path'), CanvasClosePath);
}
exports.CanvasClosePathCompact = CanvasClosePathCompact;
