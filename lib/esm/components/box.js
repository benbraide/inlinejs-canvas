var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Property, RegisterCustomElement } from "@benbraide/inlinejs-element";
import { CanvasParentElement } from "./parent";
import { TryGuardContext } from "../utilities/context";
export class CanvasBoxElement extends CanvasParentElement {
    constructor() {
        super();
        this.width = 0;
        this.height = 0;
    }
    FindFigureWithPoint(point, ctx) {
        return (super.FindFigureWithPoint(point, ctx) || (this.ContainsPoint(point, ctx) ? this : null));
    }
    GetSize(ctx) {
        return { width: this.width, height: this.height };
    }
    Render_(ctx) {
        TryGuardContext(ctx, ctx => super.Render_(ctx));
    }
}
__decorate([
    Property({ type: 'number', spread: 'size' })
], CanvasBoxElement.prototype, "width", void 0);
__decorate([
    Property({ type: 'number', spread: 'size' })
], CanvasBoxElement.prototype, "height", void 0);
export function CanvasBoxCompact() {
    RegisterCustomElement(CanvasBoxElement, 'canvas-box');
}
