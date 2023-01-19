import { CustomElement } from "@benbraide/inlinejs-element";
import { CanvasRefreshEvent } from "../types";
import { FindAncestor } from "@benbraide/inlinejs-element";
import { RemoveScale } from "../utilities/remove-scale";
import { TestPoint } from "../utilities/test-point";
export class CanvasShape extends CustomElement {
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
        let ancestor = FindAncestor(this, 'GetContext');
        return (ancestor ? ancestor['GetContext']() : null);
    }
    GetSurfaceContext() {
        let ancestor = FindAncestor(this, 'GetSurfaceContext');
        return (ancestor ? ancestor['GetSurfaceContext']() : null);
    }
    GetSurfaceSize() {
        let ancestor = FindAncestor(this, 'GetSurfaceSize');
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
        return TestPoint(point, this.GetOffsetPosition_(), (this.state_.size || { width: 0, height: 0 }), this.GetTransformScale());
    }
    FindChildWithPoint(point, ctx) {
        return (this.ContainsPoint(point, ctx) ? this : null);
    }
    GetTransformScale() {
        let ancestor = FindAncestor(this, 'GetTransformScale');
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
        this.dispatchEvent(new CustomEvent(CanvasRefreshEvent, {
            bubbles: true,
        }));
    }
    GetOffsetPosition_(ctx) {
        let ancestor = FindAncestor(this, 'OffsetPosition');
        return (ancestor ? ancestor['OffsetPosition'](this.state_.position, this, ctx) : this.state_.position);
    }
    GetUnscaledOffsetPosition_(ctx) {
        return RemoveScale(this.GetOffsetPosition_(ctx), this.GetTransformScale());
    }
    GetParentSize_(ctx) {
        let ancestor = FindAncestor(this, 'GetFixedSize');
        return (ancestor ? ancestor['GetFixedSize'](ctx) : { width: 0, height: 0 });
    }
}
