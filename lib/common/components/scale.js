"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasScaleCompact = exports.CanvasScaleElement = void 0;
const inlinejs_element_1 = require("@benbraide/inlinejs-element");
const transform_1 = require("./transform");
const context_1 = require("../utilities/context");
class CanvasScaleElement extends transform_1.CanvasTransformElement {
    constructor() {
        super();
        this.horizontal = 1;
        this.vertical = 1;
    }
    OffsetPosition(position, source, ctx) {
        return this.OffsetPosition_(position, this, ctx);
    }
    FindFigureWithPoint(point, ctx) {
        return this.FindFigureWithPoint_(point, ctx);
    }
    GetTransformScale() {
        return { horizontal: this.horizontal, vertical: this.vertical };
    }
    Apply_(ctx) {
        (0, context_1.CallContextMethod)(ctx, 'scale', this.horizontal, this.vertical);
    }
}
__decorate([
    (0, inlinejs_element_1.Property)({ type: 'number', spread: 'factor' })
], CanvasScaleElement.prototype, "horizontal", void 0);
__decorate([
    (0, inlinejs_element_1.Property)({ type: 'number', spread: 'factor' })
], CanvasScaleElement.prototype, "vertical", void 0);
exports.CanvasScaleElement = CanvasScaleElement;
function CanvasScaleCompact() {
    (0, inlinejs_element_1.RegisterCustomElement)(CanvasScaleElement, 'canvas-scale');
}
exports.CanvasScaleCompact = CanvasScaleCompact;
