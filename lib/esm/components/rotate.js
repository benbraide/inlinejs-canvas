var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Property, RegisterCustomElement } from "@benbraide/inlinejs-element";
import { CanvasTransformElement } from "./transform";
import { CallContextMethod } from "../utilities/context";
import { ComputeDisplacement } from "../utilities/compute-displacement";
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
        if (this.horizontalOrigin === 'start' && this.verticalOrigin === 'start') {
            return position;
        }
        let size = this.GetChildSize_(ctx || null), offsetValue = (origin, value, size) => {
            if (origin === 'center') {
                return (value - (size / 2));
            }
            if (origin === 'end') {
                return (value - size);
            }
            return value;
        };
        return {
            x: offsetValue(this.horizontalOrigin, position.x, size.width),
            y: offsetValue(this.verticalOrigin, position.y, size.height),
        };
    }
    ComputeDisplacement_(point, ctx) {
        const angle = ResolveAngle(this.angle);
        return ComputeDisplacement(RotatePoint(this.GetOffsetPosition_(ctx), angle), RotatePoint(point, angle));
    }
    Apply_(ctx) {
        super.Apply_(ctx);
        CallContextMethod(ctx, 'rotate', ResolveAngle(this.angle));
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
