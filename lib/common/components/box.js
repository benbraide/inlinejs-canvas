"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasBoxCompact = exports.CanvasBoxElement = void 0;
const inlinejs_element_1 = require("@benbraide/inlinejs-element");
const parent_1 = require("./parent");
const context_1 = require("../utilities/context");
class CanvasBoxElement extends parent_1.CanvasParentElement {
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
        (0, context_1.TryGuardContext)(ctx, ctx => super.Render_(ctx));
    }
}
__decorate([
    (0, inlinejs_element_1.Property)({ type: 'number', spread: 'size' })
], CanvasBoxElement.prototype, "width", void 0);
__decorate([
    (0, inlinejs_element_1.Property)({ type: 'number', spread: 'size' })
], CanvasBoxElement.prototype, "height", void 0);
exports.CanvasBoxElement = CanvasBoxElement;
function CanvasBoxCompact() {
    (0, inlinejs_element_1.RegisterCustomElement)(CanvasBoxElement, 'canvas-box');
}
exports.CanvasBoxCompact = CanvasBoxCompact;
