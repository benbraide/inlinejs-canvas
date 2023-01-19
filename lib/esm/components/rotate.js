import { GetGlobal } from "@benbraide/inlinejs";
import { CanvasTransform } from "./transform";
export class CanvasRotate extends CanvasTransform {
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
export function CanvasRotateCompact() {
    customElements.define(GetGlobal().GetConfig().GetElementName('canvas-rotate'), CanvasRotate);
}
