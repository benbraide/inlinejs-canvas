import { GetGlobal } from "@benbraide/inlinejs";
import { CanvasShape } from "./shape";
export class CanvasArc extends CanvasShape {
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
export function CanvasArcCompact() {
    customElements.define(GetGlobal().GetConfig().GetElementName('canvas-arc'), CanvasArc);
}
