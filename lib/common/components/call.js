"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasCallCompact = exports.CanvasCall = void 0;
const inlinejs_1 = require("@benbraide/inlinejs");
const parent_1 = require("./parent");
class CanvasCall extends parent_1.CanvasParent {
    Render_(ctx) {
        Array.from(this.attributes).forEach((attr) => {
            let formattedName = attr.name.split('-').reduce((prev, cur) => (prev + (cur.at(0) || '').toUpperCase() + (cur.substring(1) || '')));
            (formattedName in ctx && typeof ctx[formattedName] === 'function') && ctx[formattedName]();
        });
        super.Render_(ctx);
    }
}
exports.CanvasCall = CanvasCall;
function CanvasCallCompact() {
    customElements.define((0, inlinejs_1.GetGlobal)().GetConfig().GetElementName('canvas-call'), CanvasCall);
}
exports.CanvasCallCompact = CanvasCallCompact;
