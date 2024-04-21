"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasArcCompact = exports.CanvasArcElement = void 0;
const inlinejs_element_1 = require("@benbraide/inlinejs-element");
const full_shape_1 = require("./full-shape");
class CanvasArcElement extends full_shape_1.CanvasFullShapeElement {
    constructor() {
        super();
        this.radius = 0;
    }
    Paint_(ctx) {
        this.Render_(ctx);
    }
    Render_(ctx) {
        const position = this.GetUnscaledOffsetPosition_();
        ctx.arcTo(position.x, position.y, (position.x + this.width), (position.y + this.height), this.radius);
    }
}
__decorate([
    (0, inlinejs_element_1.Property)({ type: 'number' })
], CanvasArcElement.prototype, "radius", void 0);
exports.CanvasArcElement = CanvasArcElement;
function CanvasArcCompact() {
    (0, inlinejs_element_1.RegisterCustomElement)(CanvasArcElement, 'canvas-arc');
}
exports.CanvasArcCompact = CanvasArcCompact;
