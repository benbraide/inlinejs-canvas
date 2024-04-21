var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Property, RegisterCustomElement } from "@benbraide/inlinejs-element";
import { CanvasParentElement } from "./parent";
import { AssignContextValue, CallContextMethod, FillOrStrokeContext, TryGuardContext } from "../utilities/context";
export class CanvasOpenPathElement extends CanvasParentElement {
    constructor() {
        super();
        this.mode = 'fill';
        this.color = '';
        this.close = false;
        this.lineWidth = 1;
        this.lineCap = 'butt';
        this.lineJoin = 'miter';
    }
    Render_(ctx) {
        TryGuardContext(ctx, (ctx) => {
            const position = this.GetUnscaledOffsetPosition_();
            CallContextMethod(ctx, 'beginPath');
            ctx.moveTo(position.x, position.y);
            super.Render_(ctx);
            this.Project_(ctx);
        });
    }
    Project_(ctx) {
        this.close && ctx.closePath();
        ['lineWidth', 'lineCap', 'lineJoin'].forEach((prop) => AssignContextValue(ctx, prop, this[prop]));
        FillOrStrokeContext(ctx, this.mode, this.color);
    }
}
__decorate([
    Property({ type: 'string' })
], CanvasOpenPathElement.prototype, "mode", void 0);
__decorate([
    Property({ type: 'string' })
], CanvasOpenPathElement.prototype, "color", void 0);
__decorate([
    Property({ type: 'boolean' })
], CanvasOpenPathElement.prototype, "close", void 0);
__decorate([
    Property({ type: 'number', spread: 'line' })
], CanvasOpenPathElement.prototype, "lineWidth", void 0);
__decorate([
    Property({ type: 'string', spread: 'line' })
], CanvasOpenPathElement.prototype, "lineCap", void 0);
__decorate([
    Property({ type: 'string', spread: 'line' })
], CanvasOpenPathElement.prototype, "lineJoin", void 0);
export function CanvasOpenPathCompact() {
    RegisterCustomElement(CanvasOpenPathElement, 'canvas-open-path');
}
