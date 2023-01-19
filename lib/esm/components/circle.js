import { GetGlobal } from "@benbraide/inlinejs";
import { CanvasPath } from "./path";
export class CanvasCircle extends CanvasPath {
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
export function CanvasCircleCompact() {
    customElements.define(GetGlobal().GetConfig().GetElementName('canvas-circle'), CanvasCircle);
}
