import { EvaluateLater, GetGlobal } from "@benbraide/inlinejs";
import { CanvasParent } from "./parent";

export class CanvasInline extends CanvasParent{
    public constructor(){
        super({
            value: '',
        });
    }
    
    protected Render_(ctx: CanvasRenderingContext2D | Path2D){
        EvaluateLater({
            componentId: (GetGlobal().InferComponentFrom(this)?.GetId() || ''),
            contextElement: this,
            expression: (this.state_.value || this.textContent || ''),
        })(undefined, [], { ctx });

        super.Render_(ctx);
    }
}

export function CanvasInlineCompact(){
    customElements.define(GetGlobal().GetConfig().GetDirectiveName('canvas-inline'), CanvasInline);
}
