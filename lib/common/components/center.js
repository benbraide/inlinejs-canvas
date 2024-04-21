"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasCenterCompact = exports.CanvasCenterElement = void 0;
const inlinejs_element_1 = require("@benbraide/inlinejs-element");
const align_1 = require("./align");
class CanvasCenterElement extends align_1.CanvasAlignElement {
    constructor() {
        super();
    }
    GetAlignment_() {
        return {
            horizontal: 'center',
            vertical: 'center',
        };
    }
}
exports.CanvasCenterElement = CanvasCenterElement;
function CanvasCenterCompact() {
    (0, inlinejs_element_1.RegisterCustomElement)(CanvasCenterElement, 'canvas-center');
}
exports.CanvasCenterCompact = CanvasCenterCompact;
