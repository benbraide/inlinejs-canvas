"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasFullShape = void 0;
const shape_1 = require("./shape");
class CanvasFullShape extends shape_1.CanvasShape {
    constructor(state) {
        super(Object.assign({ size: {
                width: 0,
                height: 0,
            }, mode: 'fill', color: '' }, (state || {})));
    }
    Paint_(ctx) {
        ('save' in ctx) && ctx.save();
        if (this.state_.mode === 'stroke' && 'strokeStyle' in ctx) {
            ctx.strokeStyle = (this.state_.color || 'black');
        }
        else if (this.state_.mode !== 'stroke' && 'fillStyle' in ctx) {
            ctx.fillStyle = (this.state_.color || 'black');
        }
        this.Render_(ctx);
        ('restore' in ctx) && ctx.restore();
    }
}
exports.CanvasFullShape = CanvasFullShape;
