"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasShapeElement = void 0;
const inlinejs_element_1 = require("@benbraide/inlinejs-element");
const remove_scale_1 = require("../utilities/remove-scale");
const test_point_1 = require("../utilities/test-point");
const filter_1 = require("../utilities/filter");
const ancestor_1 = require("../utilities/ancestor");
class CanvasShapeElement extends inlinejs_element_1.CustomElement {
    constructor() {
        super({
            isTemplate: true,
            isHidden: true,
        });
        this.hidden_ = false;
        this.x = 0;
        this.y = 0;
        this.priority = 0;
    }
    UpdateHiddenProperty(value) {
        this.hidden_ = value;
    }
    GetComponentChildren() {
        return (0, filter_1.FilterByFunction)(Array.from(this.children), 'GetComponentChildren');
    }
    GetFigureChildren() {
        return (0, filter_1.FilterByFunction)(Array.from(this.children), 'GetFigureChildren');
    }
    GetPosition() {
        return { x: this.x, y: this.y };
    }
    GetOffsetPosition(ctx) {
        return this.GetOffsetPosition_(ctx);
    }
    GetContext() {
        var _a;
        return (((_a = (0, ancestor_1.FindAncestorByFunction)(this, 'GetContext')) === null || _a === void 0 ? void 0 : _a.GetContext()) || null);
    }
    GetSurfaceContext() {
        var _a;
        return (((_a = (0, ancestor_1.FindAncestorByFunction)(this, 'GetSurfaceContext')) === null || _a === void 0 ? void 0 : _a.GetSurfaceContext()) || null);
    }
    GetSurfaceSize() {
        var _a;
        return (((_a = (0, ancestor_1.FindAncestorByFunction)(this, 'GetSurfaceSize')) === null || _a === void 0 ? void 0 : _a.GetSurfaceSize()) || { width: 0, height: 0 });
    }
    GetSize(ctx) {
        return { width: ((('width' in this) && this['width']) || 0), height: ((('height' in this) && this['height']) || 0) };
    }
    GetFixedSize(ctx) {
        return this.GetSize(ctx);
    }
    GetRect(ctx) {
        return Object.assign(Object.assign({}, this.GetPosition()), this.GetSize(ctx));
    }
    OffsetPosition(position, source, ctx) {
        return position;
    }
    ContainsPoint(point, ctx) {
        return (0, test_point_1.TestPoint)(point, this.GetOffsetPosition_(), this.GetSize(ctx), this.GetTransformScale());
    }
    FindFigureWithPoint(point, ctx) {
        return (this.ContainsPoint(point, ctx) ? this : null);
    }
    GetTransformScale() {
        var _a;
        return (((_a = (0, ancestor_1.FindAncestorByFunction)(this, 'GetTransformScale')) === null || _a === void 0 ? void 0 : _a.GetTransformScale()) || { horizontal: 1, vertical: 1 });
    }
    GetPriority() {
        return this.priority;
    }
    GetShapeChildren() {
        return (0, filter_1.FilterByFunction)(Array.from(this.children), 'GetShapeChildren');
    }
    Refresh() {
        this.Refresh_();
    }
    Paint(ctx) {
        !this.hidden_ && this.Paint_(ctx);
    }
    Paint_(ctx) {
        this.Render_(ctx);
    }
    Render_(ctx) { }
    AttributeChanged_(name) {
        super.AttributeChanged_(name);
        this.ShouldRefreshOnChange_(name) && this.Refresh_(); //Refresh if possible
    }
    ShouldRefreshOnChange_(name) {
        return true;
    }
    Refresh_() {
        var _a;
        (_a = (0, ancestor_1.FindAncestorByFunction)(this, 'Refresh')) === null || _a === void 0 ? void 0 : _a.Refresh();
    }
    GetOffsetPosition_(ctx) {
        const ancestor = (0, ancestor_1.FindAncestorByFunction)(this, 'OffsetPosition');
        return (ancestor ? ancestor.OffsetPosition(this.GetPosition(), this, ctx) : this.GetPosition());
    }
    GetUnscaledOffsetPosition_(ctx) {
        return (0, remove_scale_1.RemoveScale)(this.GetOffsetPosition_(ctx), this.GetTransformScale());
    }
    GetParentSize_(ctx) {
        const ancestor = (0, ancestor_1.FindAncestorByFunction)(this, 'GetFixedSize');
        return (ancestor ? ancestor.GetFixedSize(ctx) : { width: 0, height: 0 });
    }
}
__decorate([
    (0, inlinejs_element_1.Property)({ type: 'boolean' })
], CanvasShapeElement.prototype, "UpdateHiddenProperty", null);
__decorate([
    (0, inlinejs_element_1.Property)({ type: 'number', spread: 'position' })
], CanvasShapeElement.prototype, "x", void 0);
__decorate([
    (0, inlinejs_element_1.Property)({ type: 'number', spread: 'position' })
], CanvasShapeElement.prototype, "y", void 0);
__decorate([
    (0, inlinejs_element_1.Property)({ type: 'number' })
], CanvasShapeElement.prototype, "priority", void 0);
exports.CanvasShapeElement = CanvasShapeElement;
