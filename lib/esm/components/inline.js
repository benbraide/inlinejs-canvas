var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { EvaluateLater, UseEffect } from "@benbraide/inlinejs";
import { Property, RegisterCustomElement } from "@benbraide/inlinejs-element";
import { CanvasParentElement } from "./parent";
export class CanvasInlineElement extends CanvasParentElement {
    constructor() {
        super();
        this.value = '';
        this.effect = false;
    }
    Render_(ctx) {
        let evaluated = false, evaluate = EvaluateLater({
            componentId: this.componentId_,
            contextElement: this,
            expression: (this.value || this.textContent || ''),
        });
        if (this.effect) {
            UseEffect({
                componentId: this.componentId_,
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
__decorate([
    Property({ type: 'string' })
], CanvasInlineElement.prototype, "value", void 0);
__decorate([
    Property({ type: 'boolean' })
], CanvasInlineElement.prototype, "effect", void 0);
export function CanvasInlineCompact() {
    RegisterCustomElement(CanvasInlineElement, 'canvas-inline');
}
