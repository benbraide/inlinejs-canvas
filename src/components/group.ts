import { GetGlobal } from "@benbraide/inlinejs";
import { CanvasParent } from "./parent";

export class CanvasGroup extends CanvasParent{
    protected Render_(ctx: CanvasRenderingContext2D | Path2D){
        ('save' in ctx) && ctx.save();
        super.Render_(ctx);
        ('restore' in ctx) && ctx.restore();
    }
}

export function CanvasGroupCompact(){
    customElements.define(GetGlobal().GetConfig().GetDirectiveName('canvas-group'), CanvasGroup);
}
