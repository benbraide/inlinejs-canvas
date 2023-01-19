import { GetGlobal } from "@benbraide/inlinejs";
import { CanvasFullShape } from "./full-shape";
export class CanvasRect extends CanvasFullShape {
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
export function CanvasRectCompact() {
    customElements.define(GetGlobal().GetConfig().GetElementName('canvas-rect'), CanvasRect);
}
