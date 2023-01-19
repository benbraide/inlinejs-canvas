"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasRotateCompact = exports.CanvasRotate = void 0;
const inlinejs_1 = require("@benbraide/inlinejs");
const transform_1 = require("./transform");
class CanvasRotate extends transform_1.CanvasTransform {
    constructor() {
        super({
            angle: 0,
            alignment: { horizontal: 'start', vertical: 'start' },
        });
    }
    OffsetPosition(position, source, ctx) {
        if (this.state_.alignment.horizontal === 'start' && this.state_.alignment.vertical === 'start') {
            return position;
        }
        let size = this.GetChildSize_(ctx || null), offsetValue = (alignment, value, size) => {
            if (alignment === 'center') {
                return (value - (size / 2));
            }
            if (alignment === 'end') {
                return (value - size);
            }
            return value;
        };
        return {
            x: offsetValue(this.state_.alignment.horizontal, position.x, size.width),
            y: offsetValue(this.state_.alignment.vertical, position.y, size.height),
        };
    }
    Cast_(name, value) {
        return ((name === 'angle' && typeof value === 'string' && /^.+deg$/.test(value)) ? ((Math.PI / 180) * (parseFloat(value.substring(0, (value.length - 3))) || 0)) : super.Cast_(name, value));
    }
    Apply_(ctx) {
        this.Translate_(ctx);
        ('rotate' in ctx) && ctx.rotate(this.state_.angle);
    }
}
exports.CanvasRotate = CanvasRotate;
function CanvasRotateCompact() {
    customElements.define((0, inlinejs_1.GetGlobal)().GetConfig().GetElementName('canvas-rotate'), CanvasRotate);
}
exports.CanvasRotateCompact = CanvasRotateCompact;
