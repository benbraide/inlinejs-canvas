"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasArcCompact = exports.CanvasArc = void 0;
const inlinejs_1 = require("@benbraide/inlinejs");
const shape_1 = require("./shape");
class CanvasArc extends shape_1.CanvasShape {
    constructor() {
        super({
            size: {
                width: 0,
                height: 0,
            },
            radius: 0,
        });
    }
    Render_(ctx) {
        let position = this.GetUnscaledOffsetPosition_();
        ctx.arcTo(position.x, position.y, (position.x + this.state_.size.width), (position.y + this.state_.size.height), this.state_.radius);
    }
}
exports.CanvasArc = CanvasArc;
function CanvasArcCompact() {
    customElements.define((0, inlinejs_1.GetGlobal)().GetConfig().GetElementName('canvas-arc'), CanvasArc);
}
exports.CanvasArcCompact = CanvasArcCompact;
