var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { CanvasPathElement } from "./path";
import { Property, RegisterCustomElement } from "@benbraide/inlinejs-element";
export class CanvasCircleElement extends CanvasPathElement {
    constructor() {
        super();
        this.radius = 0;
    }
    GetSize(ctx) {
        return {
            width: (Math.abs(this.radius) * 2),
            height: (Math.abs(this.radius) * 2),
        };
    }
    GetRadius() {
        return Math.abs(this.radius);
    }
    Fill_() {
        let position = this.GetUnscaledOffsetPosition_();
        const radius = Math.abs(this.radius);
        this.ctx_ = new Path2D;
        this.ctx_.arc((position.x + radius), (position.y + radius), radius, 0, (Math.PI * 2), false);
    }
}
__decorate([
    Property({ type: 'number' })
], CanvasCircleElement.prototype, "radius", void 0);
export function CanvasCircleCompact() {
    RegisterCustomElement(CanvasCircleElement, 'canvas-circle');
}
