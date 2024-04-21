var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Property, RegisterCustomElement } from "@benbraide/inlinejs-element";
import { CanvasPathElement } from "./path";
export class CanvasRoundRectElement extends CanvasPathElement {
    constructor() {
        super();
        this.parts_ = null;
        this.width = 0;
        this.height = 0;
        this.radius = 0;
    }
    AttributeChanged_(name) {
        super.AttributeChanged_(name);
        ['width', 'height', 'radius'].includes(name) && (this.parts_ = null);
    }
    Draw_() {
        if (!this.ctx_) {
            return;
        }
        let unscaledPosition = this.GetUnscaledOffsetPosition_(), renderPart = ({ position, size }) => {
            const computedPosition = {
                x: (position.x + unscaledPosition.x),
                y: (position.y + unscaledPosition.y),
            };
            this.ctx_.arcTo(computedPosition.x, computedPosition.y, (computedPosition.x + size.width), (computedPosition.y + size.height), this.radius);
        };
        this.ctx_.moveTo(unscaledPosition.x, (unscaledPosition.y + this.radius));
        this.parts_ = (this.parts_ || this.ResolveParts_());
        ['bottomLeft', 'bottomRight', 'topRight', 'topLeft'].forEach(key => renderPart(this.parts_[key]));
    }
    ResolveParts_() {
        return {
            topLeft: {
                position: { x: 0, y: 0 },
                size: { width: 0, height: this.radius },
            },
            topRight: {
                position: { x: this.width, y: 0 },
                size: { width: -this.radius, height: 0 },
            },
            bottomRight: {
                position: { x: this.width, y: this.height },
                size: { width: 0, height: -this.radius },
            },
            bottomLeft: {
                position: { x: 0, y: this.height },
                size: { width: this.radius, height: 0 },
            },
        };
    }
}
__decorate([
    Property({ type: 'number', spread: 'size' })
], CanvasRoundRectElement.prototype, "width", void 0);
__decorate([
    Property({ type: 'number', spread: 'size' })
], CanvasRoundRectElement.prototype, "height", void 0);
__decorate([
    Property({ type: 'number' })
], CanvasRoundRectElement.prototype, "radius", void 0);
export function CanvasRoundRectCompact() {
    RegisterCustomElement(CanvasRoundRectElement, 'canvas-round-rect');
}
