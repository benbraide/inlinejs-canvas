"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasRoundRectCompact = exports.CanvasRoundRect = void 0;
const inlinejs_1 = require("@benbraide/inlinejs");
const path_1 = require("./path");
class CanvasRoundRect extends path_1.CanvasPath {
    constructor() {
        super({
            size: {
                width: 0,
                height: 0,
            },
            radius: 0,
        });
        this.append(document.createElement('x-canvas-arc')); //Top-Left
        this.append(document.createElement('x-canvas-arc')); //Top-Right
        this.append(document.createElement('x-canvas-arc')); //Bottom-Right
        this.append(document.createElement('x-canvas-arc')); //Bottom-Left
        this.state_.close = false;
        this.UpdateParts_(true);
    }
    AttributeChanged_(name) {
        super.AttributeChanged_(name);
        ['size', 'width', 'height', 'radius'].includes(name) && this.UpdateParts_(name === 'radius');
    }
    UpdateParts_(radiusUpdated) {
        let [topLeft, topRight, bottomRight, bottomLeft] = this.children;
        topLeft.setAttribute('position', `0 ${this.state_.size.height}`);
        radiusUpdated && topLeft.setAttribute('size', `${this.state_.radius} 0`);
        radiusUpdated && topLeft.setAttribute('radius', this.state_.radius.toString());
        topRight.setAttribute('position', `${this.state_.size.width} ${this.state_.size.height}`);
        radiusUpdated && topRight.setAttribute('size', `0 ${-this.state_.radius}`);
        radiusUpdated && topRight.setAttribute('radius', this.state_.radius.toString());
        bottomRight.setAttribute('position', `${this.state_.size.width} 0`);
        radiusUpdated && bottomRight.setAttribute('size', `${-this.state_.radius} 0`);
        radiusUpdated && bottomRight.setAttribute('radius', this.state_.radius.toString());
        bottomLeft.setAttribute('position', '0 0');
        radiusUpdated && bottomLeft.setAttribute('size', `0 ${this.state_.radius}`);
        radiusUpdated && bottomLeft.setAttribute('radius', this.state_.radius.toString());
    }
}
exports.CanvasRoundRect = CanvasRoundRect;
function CanvasRoundRectCompact() {
    customElements.define((0, inlinejs_1.GetGlobal)().GetConfig().GetElementName('canvas-round-rect'), CanvasRoundRect);
}
exports.CanvasRoundRectCompact = CanvasRoundRectCompact;
