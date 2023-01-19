import { GetGlobal } from "@benbraide/inlinejs";
import { CanvasTransform } from "./transform";
export class CanvasScale extends CanvasTransform {
    constructor() {
        super({
            value: { horizontal: 1, vertical: 1 },
        });
    }
    OffsetPosition(position, source, ctx) {
        return this.OffsetPosition_(position, this, ctx);
    }
    FindChildWithPoint(point, ctx) {
        return this.FindChildWithPoint_(point, ctx);
    }
    GetTransformScale() {
        return this.state_.value;
    }
    Apply_(ctx) {
        ('scale' in ctx) && ctx.scale(this.state_.value.horizontal, this.state_.value.vertical);
    }
}
export function CanvasScaleCompact() {
    customElements.define(GetGlobal().GetConfig().GetElementName('canvas-scale'), CanvasScale);
}
