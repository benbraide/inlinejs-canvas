import { GetGlobal } from "@benbraide/inlinejs";
import { CanvasParent } from "./parent";
export class CanvasOpenPath extends CanvasParent {
    constructor(state) {
        super(Object.assign({ mode: 'fill', color: '', close: false, 'line-width': 1, 'line-cap': 'butt', 'line-join': 'miter' }, (state || {})));
    }
    Render_(ctx) {
        ('save' in ctx) && ctx.save();
        let position = this.GetUnscaledOffsetPosition_();
        ('beginPath' in ctx) && ctx.beginPath();
        ctx.moveTo(position.x, position.y);
        super.Render_(ctx);
        this.Project_(ctx);
        ('restore' in ctx) && ctx.restore();
    }
    Project_(ctx) {
        this.state_.close && ctx.closePath();
        ('lineWidth' in ctx) && (ctx.lineWidth = this.state_['line-width']);
        ('lineCap' in ctx) && (ctx.lineCap = this.state_['line-cap']);
        ('lineJoin' in ctx) && (ctx.lineJoin = this.state_['line-join']);
        if (this.state_.mode === 'stroke' && 'strokeStyle' in ctx) {
            ctx.strokeStyle = (this.state_.color || 'black');
            ctx.stroke();
        }
        else if (this.state_.mode !== 'stroke' && 'fillStyle' in ctx) {
            ctx.fillStyle = (this.state_.color || 'black');
            ctx.fill();
        }
    }
}
export function CanvasOpenPathCompact() {
    customElements.define(GetGlobal().GetConfig().GetElementName('canvas-open-path'), CanvasOpenPath);
}
