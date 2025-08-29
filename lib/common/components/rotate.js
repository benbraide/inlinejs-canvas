"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasRotateCompact = exports.CanvasRotateElement = void 0;
const inlinejs_element_1 = require("@benbraide/inlinejs-element");
const transform_1 = require("./transform");
const context_1 = require("../utilities/context");
const rotate_point_1 = require("../utilities/rotate-point");
const angle_1 = require("../utilities/angle");
class CanvasRotateElement extends transform_1.CanvasTransformElement {
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
        const rotated = (0, rotate_point_1.RotatePoint)(translated, -(0, angle_1.ResolveAngle)(this.angle));
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
        (0, context_1.CallContextMethod)(ctx, 'translate', originOffset.x, originOffset.y);
        (0, context_1.CallContextMethod)(ctx, 'rotate', (0, angle_1.ResolveAngle)(this.angle));
        (0, context_1.CallContextMethod)(ctx, 'translate', -originOffset.x, -originOffset.y);
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
    (0, inlinejs_element_1.Property)({ type: 'string' })
], CanvasRotateElement.prototype, "angle", void 0);
__decorate([
    (0, inlinejs_element_1.Property)({ type: 'string', spread: 'origin' })
], CanvasRotateElement.prototype, "horizontalOrigin", void 0);
__decorate([
    (0, inlinejs_element_1.Property)({ type: 'string', spread: 'origin' })
], CanvasRotateElement.prototype, "verticalOrigin", void 0);
exports.CanvasRotateElement = CanvasRotateElement;
function CanvasRotateCompact() {
    (0, inlinejs_element_1.RegisterCustomElement)(CanvasRotateElement, 'canvas-rotate');
}
exports.CanvasRotateCompact = CanvasRotateCompact;
