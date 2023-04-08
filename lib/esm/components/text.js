import { GetGlobal } from "@benbraide/inlinejs";
import { TestPoint } from "../utilities/test-point";
import { CanvasFullShape } from "./full-shape";
const fontKeys = ['font-family', 'font-size', 'font-style', 'font-weight', 'line-height'];
export class CanvasText extends CanvasFullShape {
    constructor() {
        super({
            'font-family': 'sans-serif',
            'font-size': '1rem',
            'font-style': 'normal',
            'font-weight': 'normal',
            'line-height': 'normal',
            align: 'left',
            baseline: 'top',
            direction: 'inherit',
            value: '',
            cache: true,
        });
        this.font_ = '';
        this.size_ = null;
        this.font_ = this.ComputeFont_();
        this.wrapper_.AddBooleanAttribute('cache');
    }
    GetSize(ctx) {
        if (this.size_) {
            return this.size_;
        }
        if (!ctx) {
            return { width: 0, height: 0 };
        }
        this.ApplyStyles_(ctx);
        let metrics = ctx.measureText(this.ComputeValue_());
        let height = (metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent);
        return (this.state_.cache ? (this.size_ = { width: metrics.width, height }) : ({ width: metrics.width, height }));
    }
    GetFixedSize(ctx) {
        return this.GetSize(ctx);
    }
    ContainsPoint(point, ctx) {
        return TestPoint(point, this.GetOffsetPosition_(ctx), this.GetSize(ctx), this.GetTransformScale());
    }
    Render_(ctx) {
        ('save' in ctx) && ctx.save();
        this.ApplyStyles_(ctx);
        let position = this.GetUnscaledOffsetPosition_(('stroke' in ctx) ? ctx : undefined);
        if (this.state_.mode === 'stroke' && 'strokeText' in ctx) {
            ctx.strokeText(this.ComputeValue_(), position.x, position.y, (this.state_.size.width || undefined));
        }
        else if (this.state_.mode !== 'stroke' && 'fillText' in ctx) {
            ctx.fillText(this.ComputeValue_(), position.x, position.y, (this.state_.size.width || undefined));
        }
        ('restore' in ctx) && ctx.restore();
    }
    AttributeChanged_(name) {
        super.AttributeChanged_(name);
        fontKeys.includes(name) && (this.font_ = this.ComputeFont_());
        (name === 'value' || name === 'cache') && (this.size_ = null);
    }
    ApplyStyles_(ctx) {
        ('font' in ctx) && (ctx.font = this.font_);
        ('textAlign' in ctx) && (ctx.textAlign = this.state_.align);
        ('textBaseline' in ctx) && (ctx.textBaseline = this.state_.baseline);
        ('direction' in ctx) && (ctx.direction = this.state_.direction);
    }
    ComputeFont_() {
        let parts = new Array();
        parts.push((this.state_['line-height'] === 'normal') ? this.state_['font-size'] : `${this.state_['font-size']}/${this.state_['line-height']}`);
        parts.push(this.state_['font-family'] || 'san-serif');
        (this.state_['font-style'] !== 'normal') && parts.push(this.state_['font-style']);
        (this.state_['font-weight'] !== 'normal') && parts.push(this.state_['font-weight']);
        this.size_ = null;
        return parts.join(' ');
    }
    ComputeValue_() {
        var _a;
        return (this.state_.value || ((_a = this.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || '');
    }
}
export function CanvasTextCompact() {
    customElements.define(GetGlobal().GetConfig().GetElementName('canvas-text'), CanvasText);
}
