"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasCircleCompact = exports.CanvasCircleElement = void 0;
const path_1 = require("./path");
const inlinejs_element_1 = require("@benbraide/inlinejs-element");
class CanvasCircleElement extends path_1.CanvasPathElement {
    constructor() {
        super();
        this.radius = 0;
    }
    GetSize(ctx) {
        return {
            width: (this.radius * 2),
            height: (this.radius * 2),
        };
    }
    GetRadius() {
        return this.radius;
    }
    Fill_() {
        let position = this.GetUnscaledOffsetPosition_();
        this.ctx_ = new Path2D;
        this.ctx_.arc((position.x + this.radius), (position.y + this.radius), this.radius, 0, (Math.PI * 2), false);
    }
}
__decorate([
    (0, inlinejs_element_1.Property)({ type: 'number' })
], CanvasCircleElement.prototype, "radius", void 0);
exports.CanvasCircleElement = CanvasCircleElement;
function CanvasCircleCompact() {
    (0, inlinejs_element_1.RegisterCustomElement)(CanvasCircleElement, 'canvas-circle');
}
exports.CanvasCircleCompact = CanvasCircleCompact;
