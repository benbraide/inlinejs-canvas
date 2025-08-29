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
import { Property, RegisterCustomElement } from "@benbraide/inlinejs-element";
import { CanvasFullShapeElement } from "./full-shape";
export class CanvasImageElement extends CanvasFullShapeElement {
    constructor() {
        var _a;
        super();
        this.object_ = new Image;
        this.size_ = { width: '', height: 'auto' };
        this.src = '';
        (_a = this.object_) === null || _a === void 0 ? void 0 : _a.addEventListener('load', () => this.Refresh());
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
        if (!this.object_ || !this.object_.width || !this.object_.height) {
            return { width: 0, height: 0 };
        }
        const aspectRatio = (this.object_.width / this.object_.height);
        let width = this.ResolvePart_(this.size_.width, this.object_.width);
        let height = this.ResolvePart_(this.size_.height, this.object_.height);
        if (this.size_.width === 'auto' && this.size_.height !== 'auto') { //Height is specified
            width = height * aspectRatio;
        }
        else if (this.size_.height === 'auto' && this.size_.width !== 'auto') { //Width is specified
            height = width / aspectRatio;
        }
        return { width, height };
    }
    ResolvePart_(value, target) {
        if (value === 'auto')
            return target;
        if (/^.+%$/.test(value)) { //Percentage
            return ((parseFloat(value.substring(0, (value.length - 1))) || 0) / 100 * target);
        }
        return (parseFloat(value) || target);
    }
}
__decorate([
    Property({ type: 'string' })
], CanvasImageElement.prototype, "src", void 0);
__decorate([
    Property({ type: 'string' })
], CanvasImageElement.prototype, "UpdateWidthProperty", null);
__decorate([
    Property({ type: 'string' })
], CanvasImageElement.prototype, "UpdateHeightProperty", null);
export function CanvasImageCompact() {
    RegisterCustomElement(CanvasImageElement, 'canvas-image');
}
