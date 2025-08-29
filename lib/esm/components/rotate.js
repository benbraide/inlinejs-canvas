var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Property, RegisterCustomElement } from "@benbraide/inlinejs-element";
import { CanvasTransformElement } from "./transform";
import { CallContextMethod } from "../utilities/context";
import { RotatePoint } from "../utilities/rotate-point";
import { ResolveAngle } from "../utilities/angle";
export class CanvasRotateElement extends CanvasTransformElement {
    constructor() {
        super();
        this.angle = '0';
        this.horizontalOrigin = 'start';
        this.verticalOrigin = 'start';
    }
    OffsetPosition(position, source, ctx) {
        return position;
    }
    ComputeDisplacement_(point, ctx) {
        const origin = this.GetOriginPoint_(ctx);
        const translated = { x: (point.x - origin.x), y: (point.y - origin.y) };
        const rotated = RotatePoint(translated, -ResolveAngle(this.angle));
        const final = { x: (rotated.x + origin.x), y: (rotated.y + origin.y) };
        return super.ComputeDisplacement_(final, ctx);
    }
    Apply_(ctx) {
        super.Apply_(ctx);
        const size = this.GetChildSize_(('save' in ctx) ? ctx : null);
        const getOriginOffset = (origin, size) => {
            return ((origin === 'center') ? (size / 2) : ((origin === 'end') ? size : 0));
        };
        const originOffset = {
            x: getOriginOffset(this.horizontalOrigin, size.width),
            y: getOriginOffset(this.verticalOrigin, size.height),
        };
        CallContextMethod(ctx, 'translate', originOffset.x, originOffset.y);
        CallContextMethod(ctx, 'rotate', ResolveAngle(this.angle));
        CallContextMethod(ctx, 'translate', -originOffset.x, -originOffset.y);
    }
    GetOriginPoint_(ctx) {
        const position = this.GetUnscaledOffsetPosition_(ctx || undefined);
        const size = this.GetChildSize_(ctx);
        const getOriginOffset = (origin, size) => {
            return ((origin === 'center') ? (size / 2) : ((origin === 'end') ? size : 0));
        };
        return {
            x: (position.x + getOriginOffset(this.horizontalOrigin, size.width)),
            y: (position.y + getOriginOffset(this.verticalOrigin, size.height)),
        };
    }
}
__decorate([
    Property({ type: 'string' })
], CanvasRotateElement.prototype, "angle", void 0);
__decorate([
    Property({ type: 'string', spread: 'origin' })
], CanvasRotateElement.prototype, "horizontalOrigin", void 0);
__decorate([
    Property({ type: 'string', spread: 'origin' })
], CanvasRotateElement.prototype, "verticalOrigin", void 0);
export function CanvasRotateCompact() {
    RegisterCustomElement(CanvasRotateElement, 'canvas-rotate');
}
