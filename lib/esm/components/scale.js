var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Property, RegisterCustomElement } from "@benbraide/inlinejs-element";
import { CanvasTransformElement } from "./transform";
import { CallContextMethod } from "../utilities/context";
export class CanvasScaleElement extends CanvasTransformElement {
    constructor() {
        super();
        this.horizontal = 1;
        this.vertical = 1;
    }
    OffsetPosition(position, source, ctx) {
        const myPosition = this.GetOffsetPosition_(ctx);
        return {
            x: (myPosition.x + (position.x * this.horizontal)),
            y: (myPosition.y + (position.y * this.vertical)),
        };
    }
    GetTransformScale() {
        const parentScale = super.GetTransformScale();
        return {
            horizontal: (parentScale.horizontal * this.horizontal),
            vertical: (parentScale.vertical * this.vertical),
        };
    }
    ComputeDisplacement_(point, ctx) {
        const displacement = super.ComputeDisplacement_(point, ctx);
        return { x: (displacement.x / this.horizontal), y: (displacement.y / this.vertical) };
    }
    Apply_(ctx) {
        super.Apply_(ctx);
        CallContextMethod(ctx, 'scale', this.horizontal, this.vertical);
    }
}
__decorate([
    Property({ type: 'number', spread: 'factor' })
], CanvasScaleElement.prototype, "horizontal", void 0);
__decorate([
    Property({ type: 'number', spread: 'factor' })
], CanvasScaleElement.prototype, "vertical", void 0);
export function CanvasScaleCompact() {
    RegisterCustomElement(CanvasScaleElement, 'canvas-scale');
}
