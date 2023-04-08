"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasInlineCompact = exports.CanvasInline = void 0;
const inlinejs_1 = require("@benbraide/inlinejs");
const parent_1 = require("./parent");
class CanvasInline extends parent_1.CanvasParent {
    constructor() {
        super({
            value: '',
            effect: false,
        });
        this.wrapper_.AddBooleanAttribute('effect');
    }
    Cast_(name, value) {
        return ((name === 'effect') ? this.hasAttribute('effect') : super.Cast_(name, value));
    }
    Render_(ctx) {
        var _a;
        let evaluated = false, componentId = (((_a = (0, inlinejs_1.GetGlobal)().InferComponentFrom(this)) === null || _a === void 0 ? void 0 : _a.GetId()) || ''), evaluate = (0, inlinejs_1.EvaluateLater)({ componentId,
            contextElement: this,
            expression: (this.state_.value || this.textContent || ''),
        });
        if (this.state_.effect) {
            (0, inlinejs_1.UseEffect)({ componentId,
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
exports.CanvasInline = CanvasInline;
function CanvasInlineCompact() {
    customElements.define((0, inlinejs_1.GetGlobal)().GetConfig().GetElementName('canvas-inline'), CanvasInline);
}
exports.CanvasInlineCompact = CanvasInlineCompact;
