var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Property, RegisterCustomElement } from "@benbraide/inlinejs-element";
import { CanvasFullShapeElement } from "./full-shape";
export class CanvasArcElement extends CanvasFullShapeElement {
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
    Property({ type: 'number' })
], CanvasArcElement.prototype, "radius", void 0);
export function CanvasArcCompact() {
    RegisterCustomElement(CanvasArcElement, 'canvas-arc');
}
