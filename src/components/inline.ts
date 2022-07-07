import { EvaluateLater, GetGlobal, UseEffect } from "@benbraide/inlinejs";
import { CanvasParent } from "./parent";

export class CanvasInline extends CanvasParent{
    public constructor(){
        super({
            value: '',
            effect: false,
        });
    }

    protected Cast_(name: string, value: any){
        return ((name === 'effect') ? this.hasAttribute('effect') : super.Cast_(name, value));
    }
    
    protected Render_(ctx: CanvasRenderingContext2D | Path2D){
        let evaluated = false, componentId = (GetGlobal().InferComponentFrom(this)?.GetId() || ''), evaluate = EvaluateLater({ componentId,
            contextElement: this,
            expression: (this.state_.value || this.textContent || ''),
        });

        if (this.state_.effect){
            UseEffect({ componentId,
                contextElement: this,
                callback: () => {
                    if (!evaluated){
                        evaluated = true;
                        evaluate(undefined, [], { ctx });
                    }
                    else{
                        this.Refresh_();
                    }
                },
            })
        }
        else{
            evaluate(undefined, [], { ctx });
        }

        super.Render_(ctx);
    }
}

export function CanvasInlineCompact(){
    GetGlobal().GetConfig().AddBooleanAttribute('effect');
    customElements.define(GetGlobal().GetConfig().GetDirectiveName('canvas-inline'), CanvasInline);
}
