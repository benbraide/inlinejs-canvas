import { EvaluateLater, UseEffect } from "@benbraide/inlinejs";
import { Property, RegisterCustomElement } from "@benbraide/inlinejs-element";
import { CanvasParentElement } from "./parent";

export class CanvasInlineElement extends CanvasParentElement{
    @Property({ type: 'string' })
    public value = '';

    @Property({ type: 'boolean' })
    public effect = false;
    
    public constructor(){
        super();
    }
    
    protected Render_(ctx: CanvasRenderingContext2D | Path2D){
        let evaluated = false, evaluate = EvaluateLater({
            componentId: this.componentId_,
            contextElement: this,
            expression: (this.value || this.textContent || ''),
        });

        if (this.effect){
            UseEffect({
                componentId: this.componentId_,
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
    RegisterCustomElement(CanvasInlineElement, 'canvas-inline');
}
