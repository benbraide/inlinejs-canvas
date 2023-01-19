import { GetGlobal } from "@benbraide/inlinejs";
import { CanvasPath } from "./path";
export class CanvasEllipse extends CanvasPath {
    constructor() {
        super({
            radius: {
                'radius-x': 0,
                'radius-y': 0,
            },
            angle: 0,
        });
    }
    GetSize(ctx) {
        return {
            width: (this.state_.radius['radius-x'] * 2),
            height: (this.state_.radius['radius-y'] * 2),
        };
    }
    GetFixedSize(ctx) {
        return this.GetSize(ctx);
    }
    Cast_(name, value) {
        return ((name === 'angle' && typeof value === 'string' && /^.+deg$/.test(value)) ? ((Math.PI / 180) * (parseFloat(value.substring(0, (value.length - 3))) || 0)) : super.Cast_(name, value));
    }
    Fill_() {
        let position = this.GetUnscaledOffsetPosition_();
        this.ctx_ = new Path2D;
        this.ctx_.ellipse((position.x + this.state_.radius['radius-x']), (position.y + this.state_.radius['radius-y']), this.state_.radius['radius-x'], this.state_.radius['radius-y'], this.state_.angle, 0, (Math.PI * 2));
    }
}
export function CanvasEllipseCompact() {
    customElements.define(GetGlobal().GetConfig().GetElementName('canvas-ellipse'), CanvasEllipse);
}
