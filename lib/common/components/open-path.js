"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasOpenPathCompact = exports.CanvasOpenPathElement = void 0;
const inlinejs_element_1 = require("@benbraide/inlinejs-element");
const parent_1 = require("./parent");
const context_1 = require("../utilities/context");
class CanvasOpenPathElement extends parent_1.CanvasParentElement {
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
        (0, context_1.TryGuardContext)(ctx, (ctx) => {
            const position = this.GetUnscaledOffsetPosition_();
            (0, context_1.CallContextMethod)(ctx, 'beginPath');
            ctx.moveTo(position.x, position.y);
            super.Render_(ctx);
            this.Project_(ctx);
        });
    }
    Project_(ctx) {
        this.close && ctx.closePath();
        ['lineWidth', 'lineCap', 'lineJoin'].forEach((prop) => (0, context_1.AssignContextValue)(ctx, prop, this[prop]));
        (0, context_1.FillOrStrokeContext)(ctx, this.mode, this.color);
    }
}
__decorate([
    (0, inlinejs_element_1.Property)({ type: 'string' })
], CanvasOpenPathElement.prototype, "mode", void 0);
__decorate([
    (0, inlinejs_element_1.Property)({ type: 'string' })
], CanvasOpenPathElement.prototype, "color", void 0);
__decorate([
    (0, inlinejs_element_1.Property)({ type: 'boolean' })
], CanvasOpenPathElement.prototype, "close", void 0);
__decorate([
    (0, inlinejs_element_1.Property)({ type: 'number', spread: 'line' })
], CanvasOpenPathElement.prototype, "lineWidth", void 0);
__decorate([
    (0, inlinejs_element_1.Property)({ type: 'string', spread: 'line' })
], CanvasOpenPathElement.prototype, "lineCap", void 0);
__decorate([
    (0, inlinejs_element_1.Property)({ type: 'string', spread: 'line' })
], CanvasOpenPathElement.prototype, "lineJoin", void 0);
exports.CanvasOpenPathElement = CanvasOpenPathElement;
function CanvasOpenPathCompact() {
    (0, inlinejs_element_1.RegisterCustomElement)(CanvasOpenPathElement, 'canvas-open-path');
}
exports.CanvasOpenPathCompact = CanvasOpenPathCompact;
