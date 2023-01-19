"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasGroupCompact = exports.CanvasGroup = void 0;
const inlinejs_1 = require("@benbraide/inlinejs");
const parent_1 = require("./parent");
class CanvasGroup extends parent_1.CanvasParent {
    Render_(ctx) {
        ('save' in ctx) && ctx.save();
        super.Render_(ctx);
        ('restore' in ctx) && ctx.restore();
    }
}
exports.CanvasGroup = CanvasGroup;
function CanvasGroupCompact() {
    customElements.define((0, inlinejs_1.GetGlobal)().GetConfig().GetElementName('canvas-group'), CanvasGroup);
}
exports.CanvasGroupCompact = CanvasGroupCompact;
