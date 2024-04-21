"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasPathCompact = exports.CanvasPathElement = void 0;
const types_1 = require("../types");
const parent_1 = require("./parent");
const inlinejs_element_1 = require("@benbraide/inlinejs-element");
const context_1 = require("../utilities/context");
class CanvasPathElement extends parent_1.CanvasParentElement {
    constructor() {
        super();
        this.ctx_ = null;
        this.mode = 'fill';
        this.color = '';
        this.close = false;
        this.lineWidth = 1;
        this.lineCap = 'butt';
        this.lineJoin = 'miter';
        this.addEventListener(types_1.CanvasRefreshEvent, () => (this.ctx_ = null));
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
        (0, context_1.TryGuardContext)(ctx, (ctx) => {
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
            ['lineWidth', 'lineCap', 'lineJoin'].forEach(prop => (0, context_1.AssignContextValue)(ctx, prop, this[prop]));
            !(0, context_1.FillOrStrokeContext)(ctx, this.mode, this.color, this.ctx_) && (0, context_1.CallContextMethod)(ctx, 'addPath', this.ctx_);
        }
    }
}
__decorate([
    (0, inlinejs_element_1.Property)({ type: 'string' })
], CanvasPathElement.prototype, "mode", void 0);
__decorate([
    (0, inlinejs_element_1.Property)({ type: 'string' })
], CanvasPathElement.prototype, "color", void 0);
__decorate([
    (0, inlinejs_element_1.Property)({ type: 'boolean' })
], CanvasPathElement.prototype, "close", void 0);
__decorate([
    (0, inlinejs_element_1.Property)({ type: 'number', spread: 'line' })
], CanvasPathElement.prototype, "lineWidth", void 0);
__decorate([
    (0, inlinejs_element_1.Property)({ type: 'string', spread: 'line' })
], CanvasPathElement.prototype, "lineCap", void 0);
__decorate([
    (0, inlinejs_element_1.Property)({ type: 'string', spread: 'line' })
], CanvasPathElement.prototype, "lineJoin", void 0);
exports.CanvasPathElement = CanvasPathElement;
function CanvasPathCompact() {
    (0, inlinejs_element_1.RegisterCustomElement)(CanvasPathElement, 'canvas-path');
}
exports.CanvasPathCompact = CanvasPathCompact;
