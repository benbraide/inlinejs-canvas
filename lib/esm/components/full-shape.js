import { CanvasShape } from "./shape";
export class CanvasFullShape extends CanvasShape {
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
