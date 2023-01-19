import { GetGlobal } from "@benbraide/inlinejs";
import { CanvasParent } from "./parent";
export class CanvasGroup extends CanvasParent {
    Render_(ctx) {
        ('save' in ctx) && ctx.save();
        super.Render_(ctx);
        ('restore' in ctx) && ctx.restore();
    }
}
export function CanvasGroupCompact() {
    customElements.define(GetGlobal().GetConfig().GetElementName('canvas-group'), CanvasGroup);
}
