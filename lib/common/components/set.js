"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasSetCompact = exports.CanvasSet = void 0;
const inlinejs_1 = require("@benbraide/inlinejs");
const inlinejs_element_1 = require("@benbraide/inlinejs-element");
const parent_1 = require("./parent");
class CanvasSet extends parent_1.CanvasParent {
    Render_(ctx) {
        Array.from(this.attributes).forEach((attr) => {
            let formattedName = attr.name.split('-').reduce((prev, cur) => (prev + (cur.at(0) || '').toUpperCase() + (cur.substring(1) || '')));
            (formattedName in ctx && typeof ctx[formattedName] !== 'function') && (0, inlinejs_element_1.SetValue)(ctx, formattedName, attr.value, true);
        });
        super.Render_(ctx);
    }
}
exports.CanvasSet = CanvasSet;
function CanvasSetCompact() {
    customElements.define((0, inlinejs_1.GetGlobal)().GetConfig().GetElementName('canvas-set'), CanvasSet);
}
exports.CanvasSetCompact = CanvasSetCompact;
