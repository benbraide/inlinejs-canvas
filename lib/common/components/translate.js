"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasTranslateCompact = exports.CanvasTranslateElement = void 0;
const inlinejs_element_1 = require("@benbraide/inlinejs-element");
const transform_1 = require("./transform");
class CanvasTranslateElement extends transform_1.CanvasTransformElement {
    constructor() {
        super();
    }
}
exports.CanvasTranslateElement = CanvasTranslateElement;
function CanvasTranslateCompact() {
    (0, inlinejs_element_1.RegisterCustomElement)(CanvasTranslateElement, 'canvas-translate');
}
exports.CanvasTranslateCompact = CanvasTranslateCompact;
