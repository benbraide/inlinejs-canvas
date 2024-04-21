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
exports.CanvasTextCompact = exports.CanvasTextElement = void 0;
const inlinejs_element_1 = require("@benbraide/inlinejs-element");
const test_point_1 = require("../utilities/test-point");
const full_shape_1 = require("./full-shape");
const context_1 = require("../utilities/context");
class CanvasTextElement extends full_shape_1.CanvasFullShapeElement {
    constructor() {
        super();
        this.observer_ = null;
        this.font_ = '';
        this.size_ = null;
        this.fontFamily = 'sans-serif';
        this.fontSize = '1rem';
        this.fontStyle = 'normal';
        this.fontWeight = 'normal';
        this.lineHeight = 'normal';
        this.align = 'left';
        this.baseline = 'top';
        this.direction = 'inherit';
        this.value = '';
        this.cache = true;
    }
    GetSize(ctx) {
        if (this.size_) {
            return Object.assign({}, this.size_);
        }
        let size = { width: 0, height: 0 };
        if (!ctx) {
            return size;
        }
        (0, context_1.GuardContext)(ctx, (ctx) => {
            this.ApplyStyles_(ctx);
            const metrics = ctx.measureText(this.ComputeValue_());
            size = {
                width: metrics.width,
                height: (metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent),
            };
            this.cache && this.value.trim() && (this.size_ = Object.assign({}, size));
        });
        return size;
    }
    ContainsPoint(point, ctx) {
        return (0, test_point_1.TestPoint)(point, this.GetOffsetPosition_(ctx), this.GetSize(ctx), this.GetTransformScale());
    }
    HandleElementScopeCreated_(_a, postAttributesCallback) {
        var { scope } = _a, rest = __rest(_a, ["scope"]);
        super.HandleElementScopeCreated_(Object.assign({ scope }, rest), postAttributesCallback);
        if (globalThis.MutationObserver) {
            this.observer_ = new globalThis.MutationObserver(() => (!this.value.trim() && this.Refresh_()));
            this.observer_.observe(this, { childList: true, subtree: true, characterData: true });
        }
        scope.AddUninitCallback(() => {
            var _a;
            (_a = this.observer_) === null || _a === void 0 ? void 0 : _a.disconnect();
            this.observer_ = null;
        });
    }
    Render_(ctx) {
        (0, context_1.TryGuardContext)(ctx, (ctx) => {
            this.ApplyStyles_(ctx);
            let position = this.GetUnscaledOffsetPosition_(('stroke' in ctx) ? ctx : undefined);
            if (this.mode === 'stroke' && 'strokeText' in ctx) {
                ctx.strokeText(this.ComputeValue_(), position.x, position.y, (this.width || undefined));
            }
            else if (this.mode !== 'stroke' && 'fillText' in ctx) {
                ctx.fillText(this.ComputeValue_(), position.x, position.y, (this.width || undefined));
            }
        });
    }
    AttributeChanged_(name) {
        super.AttributeChanged_(name);
        ('font' in this.spreads_) && this.spreads_.font.includes(name) && (this.font_ = '');
        (name === 'value' || name === 'cache') && (this.size_ = null);
    }
    ShouldRefreshOnChange_(name) {
        return (name !== 'cache');
    }
    ApplyStyles_(ctx) {
        (0, context_1.AssignContextValue)(ctx, 'font', (this.font_ = (this.font_ || this.ComputeFont_())));
        (0, context_1.AssignContextValue)(ctx, 'textAlign', this.align);
        (0, context_1.AssignContextValue)(ctx, 'textBaseline', this.baseline);
        (0, context_1.AssignContextValue)(ctx, 'direction', this.direction);
    }
    ComputeFont_() {
        let parts = new Array();
        parts.push((this.lineHeight === 'normal') ? this.fontSize : `${this.fontSize}/${this.lineHeight}`);
        parts.push(this.fontFamily || 'san-serif');
        (this.fontStyle !== 'normal') && parts.push(this.fontStyle);
        (this.fontWeight !== 'normal') && parts.push(this.fontWeight);
        this.size_ = null;
        return parts.join(' ');
    }
    ComputeValue_() {
        return (this.value || this.textContent || '').trim();
    }
}
__decorate([
    (0, inlinejs_element_1.Property)({ type: 'string', spread: 'font' })
], CanvasTextElement.prototype, "fontFamily", void 0);
__decorate([
    (0, inlinejs_element_1.Property)({ type: 'string', spread: 'font' })
], CanvasTextElement.prototype, "fontSize", void 0);
__decorate([
    (0, inlinejs_element_1.Property)({ type: 'string', spread: 'font' })
], CanvasTextElement.prototype, "fontStyle", void 0);
__decorate([
    (0, inlinejs_element_1.Property)({ type: 'string', spread: 'font' })
], CanvasTextElement.prototype, "fontWeight", void 0);
__decorate([
    (0, inlinejs_element_1.Property)({ type: 'string', spread: 'font' })
], CanvasTextElement.prototype, "lineHeight", void 0);
__decorate([
    (0, inlinejs_element_1.Property)({ type: 'string' })
], CanvasTextElement.prototype, "align", void 0);
__decorate([
    (0, inlinejs_element_1.Property)({ type: 'string' })
], CanvasTextElement.prototype, "baseline", void 0);
__decorate([
    (0, inlinejs_element_1.Property)({ type: 'string' })
], CanvasTextElement.prototype, "direction", void 0);
__decorate([
    (0, inlinejs_element_1.Property)({ type: 'string' })
], CanvasTextElement.prototype, "value", void 0);
__decorate([
    (0, inlinejs_element_1.Property)({ type: 'boolean' })
], CanvasTextElement.prototype, "cache", void 0);
exports.CanvasTextElement = CanvasTextElement;
function CanvasTextCompact() {
    (0, inlinejs_element_1.RegisterCustomElement)(CanvasTextElement, 'canvas-text');
}
exports.CanvasTextCompact = CanvasTextCompact;
