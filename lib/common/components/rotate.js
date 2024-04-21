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
const compute_displacement_1 = require("../utilities/compute-displacement");
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
        const angle = (0, angle_1.ResolveAngle)(this.angle);
        return (0, compute_displacement_1.ComputeDisplacement)((0, rotate_point_1.RotatePoint)(this.GetOffsetPosition_(ctx), angle), (0, rotate_point_1.RotatePoint)(point, angle));
    }
    Apply_(ctx) {
        super.Apply_(ctx);
        (0, context_1.CallContextMethod)(ctx, 'rotate', (0, angle_1.ResolveAngle)(this.angle));
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
