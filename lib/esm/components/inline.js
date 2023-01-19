import { EvaluateLater, GetGlobal, UseEffect } from "@benbraide/inlinejs";
import { CanvasParent } from "./parent";
export class CanvasInline extends CanvasParent {
    constructor() {
        super({
            value: '',
            effect: false,
        });
    }
    Cast_(name, value) {
        return ((name === 'effect') ? this.hasAttribute('effect') : super.Cast_(name, value));
    }
    Render_(ctx) {
        var _a;
        let evaluated = false, componentId = (((_a = GetGlobal().InferComponentFrom(this)) === null || _a === void 0 ? void 0 : _a.GetId()) || ''), evaluate = EvaluateLater({ componentId,
            contextElement: this,
            expression: (this.state_.value || this.textContent || ''),
        });
        if (this.state_.effect) {
            UseEffect({ componentId,
                contextElement: this,
                callback: () => {
                    if (!evaluated) {
                        evaluated = true;
                        evaluate(undefined, [], { ctx });
                    }
                    else {
                        this.Refresh_();
                    }
                },
            });
        }
        else {
            evaluate(undefined, [], { ctx });
        }
        super.Render_(ctx);
    }
}
export function CanvasInlineCompact() {
    GetGlobal().GetConfig().AddBooleanAttribute('effect');
    customElements.define(GetGlobal().GetConfig().GetElementName('canvas-inline'), CanvasInline);
}
