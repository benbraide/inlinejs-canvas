"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasImageCompact = exports.CanvasImage = void 0;
const inlinejs_1 = require("@benbraide/inlinejs");
const full_shape_1 = require("./full-shape");
class CanvasImage extends full_shape_1.CanvasFullShape {
    constructor() {
        super({
            src: '',
            size: {
                width: '',
                height: '',
            },
        });
        this.object_ = null;
    }
    AttributeChanged_(name) {
        super.AttributeChanged_(name);
        if (name === 'src') { //Load image
            (this.object_ = new Image).addEventListener('load', () => this.Refresh_());
            this.object_.src = this.state_.src;
        }
    }
    Render_(ctx) {
        if (this.object_) {
            let position = this.GetUnscaledOffsetPosition_(), size = this.ResolveSize_();
            ('drawImage' in ctx) && ctx.drawImage(this.object_, position.x, position.y, size.width, size.height);
        }
    }
    ResolveSize_() {
        if (!this.object_) {
            return { width: 0, height: 0 };
        }
        let aspectRatio = (this.object_.width / this.object_.height), width = 0, height = 0;
        if (this.state_.size.width === 'auto') {
            height = this.ResolvePart_(this.state_.size.height, this.object_.height, this.object_.width, aspectRatio);
            width = this.ResolvePart_(this.state_.size.width, this.object_.width, height, aspectRatio);
        }
        else {
            width = this.ResolvePart_(this.state_.size.width, this.object_.width, this.object_.height, aspectRatio);
            height = this.ResolvePart_(this.state_.size.height, this.object_.height, width, aspectRatio);
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
exports.CanvasImage = CanvasImage;
function CanvasImageCompact() {
    customElements.define((0, inlinejs_1.GetGlobal)().GetConfig().GetElementName('canvas-image'), CanvasImage);
}
exports.CanvasImageCompact = CanvasImageCompact;
