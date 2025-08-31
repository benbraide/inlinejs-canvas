"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasInlineCompact = exports.CanvasInlineElement = void 0;
const inlinejs_1 = require("@benbraide/inlinejs");
const inlinejs_element_1 = require("@benbraide/inlinejs-element");
const parent_1 = require("./parent");
class CanvasInlineElement extends parent_1.CanvasParentElement {
    constructor() {
        super();
        this.value = '';
        this.effect = false;
        this.effectCalled_ = false;
    }
    HandleElementScopeCreatedPostfix_(params) {
        super.HandleElementScopeCreatedPostfix_(params);
        if (this.effect) {
            (0, inlinejs_1.UseEffect)({
                componentId: this.componentId_,
                contextElement: this,
                callback: () => {
                    //Evaluate expression to track dependencies
                    (0, inlinejs_1.EvaluateLater)({
                        componentId: this.componentId_,
                        contextElement: this,
                        expression: (this.value || this.textContent || ''),
                    })();
                    if (this.effectCalled_) {
                        this.Refresh_();
                    }
                    else { //First run
                        this.effectCalled_ = true;
                    }
                },
            });
        }
    }
    Render_(ctx) {
        (0, inlinejs_1.EvaluateLater)({
            componentId: this.componentId_,
            contextElement: this,
            expression: (this.value || this.textContent || ''),
        })(undefined, [], { ctx });
        super.Render_(ctx);
    }
}
__decorate([
    (0, inlinejs_element_1.Property)({ type: 'string' })
], CanvasInlineElement.prototype, "value", void 0);
__decorate([
    (0, inlinejs_element_1.Property)({ type: 'boolean' })
], CanvasInlineElement.prototype, "effect", void 0);
exports.CanvasInlineElement = CanvasInlineElement;
function CanvasInlineCompact() {
    (0, inlinejs_element_1.RegisterCustomElement)(CanvasInlineElement, 'canvas-inline');
}
exports.CanvasInlineCompact = CanvasInlineCompact;
