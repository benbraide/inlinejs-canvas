"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasShape = void 0;
const inlinejs_element_1 = require("@benbraide/inlinejs-element");
const types_1 = require("../types");
const inlinejs_element_2 = require("@benbraide/inlinejs-element");
const remove_scale_1 = require("../utilities/remove-scale");
const test_point_1 = require("../utilities/test-point");
class CanvasShape extends inlinejs_element_1.CustomElement {
    constructor(state) {
        super(Object.assign({ position: {
                x: 0,
                y: 0,
            }, hidden: false }, (state || {})));
    }
    GetComponentChildren() {
        return Array.from(this.children).filter(child => (typeof child['GetComponentChildren'] === 'function'));
    }
    GetFigureChildren() {
        return this.GetComponentChildren().filter(child => (typeof child['GetFigureChildren'] === 'function'));
    }
    GetPosition() {
        return this.state_['position'];
    }
    GetOffsetPosition(ctx) {
        return this.GetOffsetPosition_(ctx);
    }
    GetContext() {
        let ancestor = (0, inlinejs_element_2.FindAncestor)(this, 'GetContext');
        return (ancestor ? ancestor['GetContext']() : null);
    }
    GetSurfaceContext() {
        let ancestor = (0, inlinejs_element_2.FindAncestor)(this, 'GetSurfaceContext');
        return (ancestor ? ancestor['GetSurfaceContext']() : null);
    }
    GetSurfaceSize() {
        let ancestor = (0, inlinejs_element_2.FindAncestor)(this, 'GetSurfaceSize');
        return (ancestor ? ancestor['GetSurfaceSize']() : { width: 0, height: 0 });
    }
    GetSize(ctx) {
        return (this.state_.size || { width: 0, height: 0 });
    }
    GetFixedSize(ctx) {
        return (this.state_.size || this.GetParentSize_(ctx));
    }
    GetRect(ctx) {
        return Object.assign(Object.assign({}, this.GetPosition()), this.GetSize(ctx));
    }
    OffsetPosition(position, source, ctx) {
        return position;
    }
    ContainsPoint(point, ctx) {
        return (0, test_point_1.TestPoint)(point, this.GetOffsetPosition_(), (this.state_.size || { width: 0, height: 0 }), this.GetTransformScale());
    }
    FindChildWithPoint(point, ctx) {
        return (this.ContainsPoint(point, ctx) ? this : null);
    }
    GetTransformScale() {
        let ancestor = (0, inlinejs_element_2.FindAncestor)(this, 'GetTransformScale');
        return (ancestor ? ancestor['GetTransformScale']() : { horizontal: 1, vertical: 1 });
    }
    GetShapeChildren() {
        return this.GetComponentChildren().filter(child => (typeof child['GetShapeChildren'] === 'function'));
    }
    Paint(ctx) {
        !this.state_.hidden && this.Paint_(ctx);
    }
    Paint_(ctx) {
        this.Render_(ctx);
    }
    Render_(ctx) { }
    Refresh_() {
        this.dispatchEvent(new CustomEvent(types_1.CanvasRefreshEvent, {
            bubbles: true,
        }));
    }
    GetOffsetPosition_(ctx) {
        let ancestor = (0, inlinejs_element_2.FindAncestor)(this, 'OffsetPosition');
        return (ancestor ? ancestor['OffsetPosition'](this.state_.position, this, ctx) : this.state_.position);
    }
    GetUnscaledOffsetPosition_(ctx) {
        return (0, remove_scale_1.RemoveScale)(this.GetOffsetPosition_(ctx), this.GetTransformScale());
    }
    GetParentSize_(ctx) {
        let ancestor = (0, inlinejs_element_2.FindAncestor)(this, 'GetFixedSize');
        return (ancestor ? ancestor['GetFixedSize'](ctx) : { width: 0, height: 0 });
    }
}
exports.CanvasShape = CanvasShape;
