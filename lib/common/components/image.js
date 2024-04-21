"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasImageCompact = exports.CanvasImageElement = void 0;
const inlinejs_element_1 = require("@benbraide/inlinejs-element");
const full_shape_1 = require("./full-shape");
class CanvasImageElement extends full_shape_1.CanvasFullShapeElement {
    constructor() {
        super();
        this.object_ = new Image;
        this.size_ = { width: '', height: 'auto' };
        this.src = '';
    }
    UpdateWidthProperty(value) {
        this.size_.width = value;
    }
    UpdateHeightProperty(value) {
        this.size_.height = value;
    }
    HandleElementScopeCreated_(_a, postAttributesCallback) {
        var { scope } = _a, rest = __rest(_a, ["scope"]);
        super.HandleElementScopeCreated_(Object.assign({ scope }, rest), postAttributesCallback);
        scope.AddUninitCallback(() => (this.object_ = null));
    }
    AttributeChanged_(name) {
        super.AttributeChanged_(name);
        (name === 'src') && this.object_ && (this.object_.src = this.src);
    }
    ShouldRefreshOnChange_(name) {
        return (name !== 'src');
    }
    Render_(ctx) {
        if (this.object_ && ('drawImage' in ctx)) {
            const position = this.GetUnscaledOffsetPosition_(), size = this.ResolveSize_();
            ctx.drawImage(this.object_, position.x, position.y, size.width, size.height);
        }
        else if (!this.object_ && this.src) {
            (this.object_ = new Image).addEventListener('load', () => this.Refresh());
            this.object_.src = this.src;
        }
    }
    ResolveSize_() {
        if (!this.object_) {
            return { width: 0, height: 0 };
        }
        let aspectRatio = (this.object_.width / this.object_.height), width = 0, height = 0;
        if (this.size_.width === 'auto') {
            height = this.ResolvePart_(this.size_.height, this.object_.height, this.object_.width, aspectRatio);
            width = this.ResolvePart_(this.size_.width, this.object_.width, height, aspectRatio);
        }
        else {
            width = this.ResolvePart_(this.size_.width, this.object_.width, this.object_.height, aspectRatio);
            height = this.ResolvePart_(this.size_.height, this.object_.height, width, aspectRatio);
        }
        return { width, height };
    }
    ResolvePart_(value, target, otherValue, aspectRatio) {
        if (value === 'auto') { //Use aspect ratio
            return (otherValue * aspectRatio);
        }
        if (/^.+%$/.test(value)) { //Percentage
            return ((parseFloat(value.substring(0, (value.length - 1))) || 0) * target);
        }
        return (parseFloat(value) || target);
    }
}
__decorate([
    (0, inlinejs_element_1.Property)({ type: 'string' })
], CanvasImageElement.prototype, "src", void 0);
__decorate([
    (0, inlinejs_element_1.Property)({ type: 'string' })
], CanvasImageElement.prototype, "UpdateWidthProperty", null);
__decorate([
    (0, inlinejs_element_1.Property)({ type: 'string' })
], CanvasImageElement.prototype, "UpdateHeightProperty", null);
exports.CanvasImageElement = CanvasImageElement;
function CanvasImageCompact() {
    (0, inlinejs_element_1.RegisterCustomElement)(CanvasImageElement, 'canvas-image');
}
exports.CanvasImageCompact = CanvasImageCompact;
