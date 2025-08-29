var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { CanvasRefreshEvent } from "../types";
import { CanvasParentElement } from "./parent";
import { Property, RegisterCustomElement } from "@benbraide/inlinejs-element";
import { AssignContextValue, CallContextMethod, TryGuardContext } from "../utilities/context";
export class CanvasPathElement extends CanvasParentElement {
    constructor() {
        super();
        this.ctx_ = null;
        this.mode = 'fill';
        this.color = '';
        this.close = false;
        this.lineWidth = 1;
        this.lineCap = 'butt';
        this.lineJoin = 'miter';
        this.addEventListener(CanvasRefreshEvent, () => (this.ctx_ = null));
    }
    ContainsPoint(point, ctx) {
        !this.ctx_ && this.Fill_();
        return !!(this.ctx_ && ctx.isPointInPath(this.ctx_, point.x, point.y));
    }
    FindFigureWithPoint(point, ctx) {
        return (this.ContainsPoint(point, ctx) ? this : null);
    }
    GetContext() {
        return this.ctx_;
    }
    Render_(ctx) {
        TryGuardContext(ctx, (ctx) => {
            this.Fill_();
            this.Project_(ctx);
        });
    }
    Fill_() {
        let position = this.GetUnscaledOffsetPosition_();
        this.ctx_ = new Path2D;
        this.ctx_.moveTo(position.x, position.y);
        this.Draw_();
        super.Render_(this.ctx_);
        this.close && this.ctx_.closePath();
    }
    Draw_() { }
    Project_(ctx) {
        if (this.ctx_) {
            if (!('strokeStyle' in ctx)) { // It's a Path2D
                CallContextMethod(ctx, 'addPath', this.ctx_);
                return;
            }
            if (this.mode === 'stroke' || this.mode === 'both') {
                ['lineWidth', 'lineCap', 'lineJoin'].forEach(prop => AssignContextValue(ctx, prop, this[prop]));
                ctx.strokeStyle = (this.color || 'black');
                ctx.stroke(this.ctx_);
            }
            if (this.mode === 'fill' || this.mode === 'both') {
                ctx.fillStyle = (this.color || 'black');
                ctx.fill(this.ctx_);
            }
        }
    }
}
__decorate([
    Property({ type: 'string' })
], CanvasPathElement.prototype, "mode", void 0);
__decorate([
    Property({ type: 'string' })
], CanvasPathElement.prototype, "color", void 0);
__decorate([
    Property({ type: 'boolean' })
], CanvasPathElement.prototype, "close", void 0);
__decorate([
    Property({ type: 'number', spread: 'line' })
], CanvasPathElement.prototype, "lineWidth", void 0);
__decorate([
    Property({ type: 'string', spread: 'line' })
], CanvasPathElement.prototype, "lineCap", void 0);
__decorate([
    Property({ type: 'string', spread: 'line' })
], CanvasPathElement.prototype, "lineJoin", void 0);
export function CanvasPathCompact() {
    RegisterCustomElement(CanvasPathElement, 'canvas-path');
}
