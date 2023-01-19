"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasRectCompact = exports.CanvasRect = void 0;
const inlinejs_1 = require("@benbraide/inlinejs");
const full_shape_1 = require("./full-shape");
class CanvasRect extends full_shape_1.CanvasFullShape {
    Render_(ctx) {
        let position = this.GetUnscaledOffsetPosition_();
        if (this.state_.mode === 'stroke' && 'strokeRect' in ctx) {
            ctx.strokeRect(position.x, position.y, this.state_.size.width, this.state_.size.height);
        }
        else if (this.state_.mode !== 'stroke' && 'fillRect' in ctx) {
            ctx.fillRect(position.x, position.y, this.state_.size.width, this.state_.size.height);
        }
        else if ('rect' in ctx) {
            ctx.rect(position.x, position.y, this.state_.size.width, this.state_.size.height);
        }
    }
}
exports.CanvasRect = CanvasRect;
function CanvasRectCompact() {
    customElements.define((0, inlinejs_1.GetGlobal)().GetConfig().GetElementName('canvas-rect'), CanvasRect);
}
exports.CanvasRectCompact = CanvasRectCompact;
