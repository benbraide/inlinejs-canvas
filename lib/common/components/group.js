"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasGroupCompact = exports.CanvasGroupElement = void 0;
const inlinejs_element_1 = require("@benbraide/inlinejs-element");
const parent_1 = require("./parent");
const context_1 = require("../utilities/context");
class CanvasGroupElement extends parent_1.CanvasParentElement {
    constructor() {
        super();
    }
    Render_(ctx) {
        (0, context_1.TryGuardContext)(ctx, ctx => super.Render_(ctx));
    }
}
exports.CanvasGroupElement = CanvasGroupElement;
function CanvasGroupCompact() {
    (0, inlinejs_element_1.RegisterCustomElement)(CanvasGroupElement, 'canvas-group');
}
exports.CanvasGroupCompact = CanvasGroupCompact;
