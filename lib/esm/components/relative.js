var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Property, RegisterCustomElement } from "@benbraide/inlinejs-element";
import { CanvasParentElement } from "./parent";
import { CanvasShapeElement } from "./shape";
export class CanvasRelativeElement extends CanvasParentElement {
    constructor() {
        super(...arguments);
        this.direction = 'row';
    }
    GetPosition() {
        return this.ApplyOffset_(super.GetPosition());
    }
    GetOffsetPosition(ctx) {
        return this.ApplyOffset_(super.GetOffsetPosition(ctx));
    }
    OffsetPosition_(position, source, ctx) {
        return this.ApplyOffset_(super.OffsetPosition_({
            x: position.x + this.x,
            y: position.y + this.y,
        }, source, ctx), ctx);
    }
    ApplyOffset_(position, ctx) {
        if (!this.parentElement) {
            return position;
        }
        let previous = null;
        for (const child of this.parentElement.children) {
            if (child === this) {
                break;
            }
            if (child instanceof CanvasShapeElement) {
                previous = child;
            }
        }
        const isRow = this.direction === 'row';
        if (previous) {
            const previousPosition = previous.GetPosition();
            const previousSize = previous.GetSize(ctx || null);
            if (isRow) {
                position.x += previousPosition.x + previousSize.width;
                position.y += previousPosition.y;
            }
            else {
                position.y += previousPosition.y + previousSize.height;
                position.x += previousPosition.x;
            }
        }
        return position;
    }
}
__decorate([
    Property({ type: 'string' })
], CanvasRelativeElement.prototype, "direction", void 0);
export function CanvasRelativeCompact() {
    RegisterCustomElement(CanvasRelativeElement, 'canvas-relative');
}
