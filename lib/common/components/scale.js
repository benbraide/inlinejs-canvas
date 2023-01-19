"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasScaleCompact = exports.CanvasScale = void 0;
const inlinejs_1 = require("@benbraide/inlinejs");
const transform_1 = require("./transform");
class CanvasScale extends transform_1.CanvasTransform {
    constructor() {
        super({
            value: { horizontal: 1, vertical: 1 },
        });
    }
    OffsetPosition(position, source, ctx) {
        return this.OffsetPosition_(position, this, ctx);
    }
    FindChildWithPoint(point, ctx) {
        return this.FindChildWithPoint_(point, ctx);
    }
    GetTransformScale() {
        return this.state_.value;
    }
    Apply_(ctx) {
        ('scale' in ctx) && ctx.scale(this.state_.value.horizontal, this.state_.value.vertical);
    }
}
exports.CanvasScale = CanvasScale;
function CanvasScaleCompact() {
    customElements.define((0, inlinejs_1.GetGlobal)().GetConfig().GetElementName('canvas-scale'), CanvasScale);
}
exports.CanvasScaleCompact = CanvasScaleCompact;
