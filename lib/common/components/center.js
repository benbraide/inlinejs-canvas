"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasCenterCompact = exports.CanvasCenter = void 0;
const inlinejs_1 = require("@benbraide/inlinejs");
const align_1 = require("./align");
class CanvasCenter extends align_1.CanvasAlign {
    constructor() {
        super();
        this.state_.value.horizontal = this.state_.value.vertical = 'center';
    }
}
exports.CanvasCenter = CanvasCenter;
function CanvasCenterCompact() {
    customElements.define((0, inlinejs_1.GetGlobal)().GetConfig().GetElementName('canvas-center'), CanvasCenter);
}
exports.CanvasCenterCompact = CanvasCenterCompact;
