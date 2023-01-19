"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasPathCompact = exports.CanvasPath = void 0;
const inlinejs_1 = require("@benbraide/inlinejs");
const types_1 = require("../types");
const parent_1 = require("./parent");
class CanvasPath extends parent_1.CanvasParent {
    constructor(state) {
        super(Object.assign({ mode: 'fill', color: '', close: false, 'line-width': 1, 'line-cap': 'butt', 'line-join': 'miter' }, (state || {})));
        this.ctx_ = null;
        this.addEventListener(types_1.CanvasRefreshEvent, () => (this.ctx_ = null));
    }
    ContainsPoint(point, ctx) {
        !this.ctx_ && this.Fill_();
        return !!(this.ctx_ && ctx.isPointInPath(this.ctx_, point.x, point.y));
    }
    FindChildWithPoint(point, ctx) {
        return (this.ContainsPoint(point, ctx) ? this : null);
    }
    GetContext() {
        return this.ctx_;
    }
    Render_(ctx) {
        ('save' in ctx) && ctx.save();
        this.Fill_();
        this.Project_(ctx);
        ('restore' in ctx) && ctx.restore();
    }
    Fill_() {
        let position = this.GetUnscaledOffsetPosition_();
        this.ctx_ = new Path2D;
        this.ctx_.moveTo(position.x, position.y);
        super.Render_(this.ctx_);
        this.state_.close && this.ctx_.closePath();
    }
    Project_(ctx) {
        ('lineWidth' in ctx) && (ctx.lineWidth = this.state_['line-width']);
        ('lineCap' in ctx) && (ctx.lineCap = this.state_['line-cap']);
        ('lineJoin' in ctx) && (ctx.lineJoin = this.state_['line-join']);
        if (this.ctx_ && this.state_.mode === 'stroke' && 'strokeStyle' in ctx) {
            ctx.strokeStyle = (this.state_.color || 'black');
            ctx.stroke(this.ctx_);
        }
        else if (this.ctx_ && this.state_.mode !== 'stroke' && 'fillStyle' in ctx) {
            ctx.fillStyle = (this.state_.color || 'black');
            ctx.fill(this.ctx_);
        }
        else if (this.ctx_ && 'addPath' in ctx) {
            ctx.addPath(this.ctx_);
        }
    }
}
exports.CanvasPath = CanvasPath;
function CanvasPathCompact() {
    customElements.define((0, inlinejs_1.GetGlobal)().GetConfig().GetElementName('canvas-path'), CanvasPath);
}
exports.CanvasPathCompact = CanvasPathCompact;
