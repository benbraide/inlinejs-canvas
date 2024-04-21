"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasFullShapeElement = void 0;
const inlinejs_element_1 = require("@benbraide/inlinejs-element");
const shape_1 = require("./shape");
const context_1 = require("../utilities/context");
class CanvasFullShapeElement extends shape_1.CanvasShapeElement {
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
    UpdateStrokeProperty(value) {
        this.mode = (value ? 'stroke' : 'fill');
    }
    UpdateFillProperty(value) {
        this.mode = (value ? 'fill' : 'stroke');
    }
    Paint_(ctx) {
        (0, context_1.TryGuardContext)(ctx, (ctx) => {
            ['lineWidth', 'lineCap', 'lineJoin'].forEach(prop => (0, context_1.AssignContextValue)(ctx, prop, this[prop]));
            (this.mode === 'stroke') && (0, context_1.AssignContextValue)(ctx, 'strokeStyle', (this.color || 'black'));
            (this.mode !== 'stroke') && (0, context_1.AssignContextValue)(ctx, 'fillStyle', (this.color || 'black'));
            this.Render_(ctx);
        });
    }
}
__decorate([
    (0, inlinejs_element_1.Property)({ type: 'number', spread: 'size' })
], CanvasFullShapeElement.prototype, "width", void 0);
__decorate([
    (0, inlinejs_element_1.Property)({ type: 'number', spread: 'size' })
], CanvasFullShapeElement.prototype, "height", void 0);
__decorate([
    (0, inlinejs_element_1.Property)({ type: 'string' })
], CanvasFullShapeElement.prototype, "mode", void 0);
__decorate([
    (0, inlinejs_element_1.Property)({ type: 'boolean' })
], CanvasFullShapeElement.prototype, "UpdateStrokeProperty", null);
__decorate([
    (0, inlinejs_element_1.Property)({ type: 'boolean' })
], CanvasFullShapeElement.prototype, "UpdateFillProperty", null);
__decorate([
    (0, inlinejs_element_1.Property)({ type: 'string' })
], CanvasFullShapeElement.prototype, "color", void 0);
__decorate([
    (0, inlinejs_element_1.Property)({ type: 'number', spread: 'line' })
], CanvasFullShapeElement.prototype, "lineWidth", void 0);
__decorate([
    (0, inlinejs_element_1.Property)({ type: 'string', spread: 'line' })
], CanvasFullShapeElement.prototype, "lineCap", void 0);
__decorate([
    (0, inlinejs_element_1.Property)({ type: 'string', spread: 'line' })
], CanvasFullShapeElement.prototype, "lineJoin", void 0);
exports.CanvasFullShapeElement = CanvasFullShapeElement;
