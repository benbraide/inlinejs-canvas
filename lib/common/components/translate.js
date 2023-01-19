"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasTranslateCompact = exports.CanvasTranslate = void 0;
const inlinejs_1 = require("@benbraide/inlinejs");
const transform_1 = require("./transform");
class CanvasTranslate extends transform_1.CanvasTransform {
    Apply_(ctx) {
        this.Translate_(ctx);
    }
}
exports.CanvasTranslate = CanvasTranslate;
function CanvasTranslateCompact() {
    customElements.define((0, inlinejs_1.GetGlobal)().GetConfig().GetElementName('canvas-translate'), CanvasTranslate);
}
exports.CanvasTranslateCompact = CanvasTranslateCompact;
