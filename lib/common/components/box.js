"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasBoxCompact = exports.CanvasBox = void 0;
const inlinejs_1 = require("@benbraide/inlinejs");
const parent_1 = require("./parent");
class CanvasBox extends parent_1.CanvasParent {
    constructor() {
        super({
            size: { width: 0, height: 0 },
        });
    }
    GetSize(ctx) {
        return this.state_.size;
    }
    FindChildWithPoint(point, ctx) {
        return (super.FindChildWithPoint(point, ctx) || (this.ContainsPoint(point, ctx) ? this : null));
    }
    Render_(ctx) {
        ('save' in ctx) && ctx.save();
        super.Render_(ctx);
        ('restore' in ctx) && ctx.restore();
    }
}
exports.CanvasBox = CanvasBox;
function CanvasBoxCompact() {
    customElements.define((0, inlinejs_1.GetGlobal)().GetConfig().GetElementName('canvas-box'), CanvasBox);
}
exports.CanvasBoxCompact = CanvasBoxCompact;
