import { GetGlobal } from "@benbraide/inlinejs";
import { CanvasParent } from "./parent";
export class CanvasBox extends CanvasParent {
    constructor() {
        super({
            size: { width: 0, height: 0 },
        });
    }
    GetSize(ctx) {
        return this.state_.size;
    }
    FindChildWithPoint(point, ctx) {
        return (super.FindChildWithPoint(point, ctx) || (this.ContainsPoint(point, ctx) ? this : null));
    }
    Render_(ctx) {
        ('save' in ctx) && ctx.save();
        super.Render_(ctx);
        ('restore' in ctx) && ctx.restore();
    }
}
export function CanvasBoxCompact() {
    customElements.define(GetGlobal().GetConfig().GetElementName('canvas-box'), CanvasBox);
}
