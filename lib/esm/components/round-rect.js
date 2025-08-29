var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Property, RegisterCustomElement } from "@benbraide/inlinejs-element";
import { CanvasPathElement } from "./path";
export class CanvasRoundRectElement extends CanvasPathElement {
    constructor() {
        super();
        this.width = 0;
        this.height = 0;
        this.radius = 0;
    }
    Draw_() {
        if (!this.ctx_) {
            return;
        }
        const { x, y } = this.GetUnscaledOffsetPosition_();
        const { width, height, radius } = this;
        this.ctx_.moveTo(x + radius, y);
        this.ctx_.arcTo(x + width, y, x + width, y + height, radius);
        this.ctx_.arcTo(x + width, y + height, x, y + height, radius);
        this.ctx_.arcTo(x, y + height, x, y, radius);
        this.ctx_.arcTo(x, y, x + width, y, radius);
    }
}
__decorate([
    Property({ type: 'number', spread: 'size' })
], CanvasRoundRectElement.prototype, "width", void 0);
__decorate([
    Property({ type: 'number', spread: 'size' })
], CanvasRoundRectElement.prototype, "height", void 0);
__decorate([
    Property({ type: 'number' })
], CanvasRoundRectElement.prototype, "radius", void 0);
export function CanvasRoundRectCompact() {
    RegisterCustomElement(CanvasRoundRectElement, 'canvas-round-rect');
}
