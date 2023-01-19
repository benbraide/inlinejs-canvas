"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasCircleCompact = exports.CanvasCircle = void 0;
const inlinejs_1 = require("@benbraide/inlinejs");
const path_1 = require("./path");
class CanvasCircle extends path_1.CanvasPath {
    constructor() {
        super({
            radius: 0,
        });
    }
    GetSize(ctx) {
        return {
            width: (this.state_.radius * 2),
            height: (this.state_.radius * 2),
        };
    }
    GetFixedSize(ctx) {
        return this.GetSize(ctx);
    }
    GetRadius() {
        return this.state_.radius;
    }
    Fill_() {
        let position = this.GetUnscaledOffsetPosition_();
        this.ctx_ = new Path2D;
        this.ctx_.arc((position.x + this.state_.radius), (position.y + this.state_.radius), this.state_.radius, 0, (Math.PI * 2), false);
    }
}
exports.CanvasCircle = CanvasCircle;
function CanvasCircleCompact() {
    customElements.define((0, inlinejs_1.GetGlobal)().GetConfig().GetElementName('canvas-circle'), CanvasCircle);
}
exports.CanvasCircleCompact = CanvasCircleCompact;
