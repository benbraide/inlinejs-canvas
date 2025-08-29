var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Property } from "@benbraide/inlinejs-element";
import { CanvasShapeElement } from "./shape";
import { AssignContextValue, TryGuardContext } from "../utilities/context";
export class CanvasFullShapeElement extends CanvasShapeElement {
    constructor() {
        super();
        this.width = 0;
        this.height = 0;
        this.mode = 'fill';
        this.color = '';
        this.lineWidth = 1;
        this.lineCap = 'butt';
        this.lineJoin = 'miter';
    }
    Paint_(ctx) {
        TryGuardContext(ctx, (ctx) => {
            if (this.mode === 'stroke' || this.mode === 'both') {
                ['lineWidth', 'lineCap', 'lineJoin'].forEach(prop => AssignContextValue(ctx, prop, this[prop]));
                AssignContextValue(ctx, 'strokeStyle', (this.color || 'black'));
            }
            if (this.mode === 'fill' || this.mode === 'both') {
                AssignContextValue(ctx, 'fillStyle', (this.color || 'black'));
            }
            this.Render_(ctx);
        });
    }
}
__decorate([
    Property({ type: 'number', spread: 'size' })
], CanvasFullShapeElement.prototype, "width", void 0);
__decorate([
    Property({ type: 'number', spread: 'size' })
], CanvasFullShapeElement.prototype, "height", void 0);
__decorate([
    Property({ type: 'string' })
], CanvasFullShapeElement.prototype, "mode", void 0);
__decorate([
    Property({ type: 'string' })
], CanvasFullShapeElement.prototype, "color", void 0);
__decorate([
    Property({ type: 'number', spread: 'line' })
], CanvasFullShapeElement.prototype, "lineWidth", void 0);
__decorate([
    Property({ type: 'string', spread: 'line' })
], CanvasFullShapeElement.prototype, "lineCap", void 0);
__decorate([
    Property({ type: 'string', spread: 'line' })
], CanvasFullShapeElement.prototype, "lineJoin", void 0);
