import { EvaluateLater, IElementScopeCreatedCallbackParams, UseEffect } from "@benbraide/inlinejs";
import { Property, RegisterCustomElement } from "@benbraide/inlinejs-element";
import { CanvasParentElement } from "./parent";

export class CanvasInlineElement extends CanvasParentElement{
    @Property({ type: 'string' })
    public value = '';

    @Property({ type: 'boolean' })
    public effect = false;

    private effectCalled_ = false;
    
    public constructor(){
        super();
    }

    protected HandleElementScopeCreated_(params: IElementScopeCreatedCallbackParams, postAttributesCallback?: () => void){
        super.HandleElementScopeCreated_(params, postAttributesCallback);
        if (this.effect){
            UseEffect({
                componentId: this.componentId_,
                contextElement: this,
                callback: () => {
                    //Evaluate expression to track dependencies
                    EvaluateLater({
                        componentId: this.componentId_,
                        contextElement: this,
                        expression: (this.value || this.textContent || ''),
                    })();

                    if (this.effectCalled_){
                        this.Refresh_();
                    }
                    else{ //First run
                        this.effectCalled_ = true;
                    }
                },
            });
        }
    }
    
    protected Render_(ctx: CanvasRenderingContext2D | Path2D){
        EvaluateLater({
            componentId: this.componentId_,
            contextElement: this,
            expression: (this.value || this.textContent || ''),
        })(undefined, [], { ctx });

        super.Render_(ctx);
    }
}

export function CanvasInlineCompact(){
    RegisterCustomElement(CanvasInlineElement, 'canvas-inline');
}
