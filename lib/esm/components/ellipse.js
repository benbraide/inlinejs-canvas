var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Property, RegisterCustomElement } from "@benbraide/inlinejs-element";
import { CanvasPathElement } from "./path";
import { ResolveAngle } from "../utilities/angle";
export class CanvasEllipseElement extends CanvasPathElement {
    constructor() {
        super();
        this.xRadius = 0;
        this.yRadius = 0;
        this.angle = '0';
    }
    GetSize(ctx) {
        const angle = ResolveAngle(this.angle);
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const xRadius = Math.abs(this.xRadius);
        const yRadius = Math.abs(this.yRadius);
        return {
            width: (2 * Math.sqrt(Math.pow(xRadius * cos, 2) + Math.pow(yRadius * sin, 2))),
            height: (2 * Math.sqrt(Math.pow(xRadius * sin, 2) + Math.pow(yRadius * cos, 2))),
        };
    }
    GetFixedSize(ctx) {
        return this.GetSize(ctx);
    }
    Fill_() {
        const position = this.GetUnscaledOffsetPosition_();
        const xRadius = Math.abs(this.xRadius);
        const yRadius = Math.abs(this.yRadius);
        (this.ctx_ = new Path2D).ellipse((position.x + xRadius), (position.y + yRadius), xRadius, yRadius, ResolveAngle(this.angle), 0, (Math.PI * 2));
    }
}
__decorate([
    Property({ type: 'number', spread: 'radius' })
], CanvasEllipseElement.prototype, "xRadius", void 0);
__decorate([
    Property({ type: 'number', spread: 'radius' })
], CanvasEllipseElement.prototype, "yRadius", void 0);
__decorate([
    Property({ type: 'string' })
], CanvasEllipseElement.prototype, "angle", void 0);
export function CanvasEllipseCompact() {
    RegisterCustomElement(CanvasEllipseElement, 'canvas-ellipse');
}
