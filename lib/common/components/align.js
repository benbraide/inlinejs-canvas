"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasAlignCompact = exports.CanvasAlignElement = void 0;
const inlinejs_element_1 = require("@benbraide/inlinejs-element");
const align_1 = require("../utilities/align");
const parent_1 = require("./parent");
class CanvasAlignElement extends parent_1.CanvasParentElement {
    constructor() {
        super();
        this.horizontal = 'start';
        this.vertical = 'start';
        this.group = false;
    }
    OffsetPosition(position, source, ctx) {
        const myPosition = this.GetOffsetPosition_(ctx), parentSize = this.GetParentSize_(null), alignment = this.GetAlignment_();
        const childSize = ((source && !this.group) ? source.GetSize(ctx || null) : this.GetChildSize_(ctx || null));
        const computedAlignment = {
            x: (0, align_1.Align)(alignment.horizontal, childSize.width, parentSize.width),
            y: (0, align_1.Align)(alignment.vertical, childSize.height, parentSize.height),
        };
        return {
            x: (position.x + computedAlignment.x + myPosition.x),
            y: (position.y + computedAlignment.y + myPosition.y),
        };
    }
    GetAlignment_() {
        return {
            horizontal: this.horizontal,
            vertical: this.vertical,
        };
    }
}
__decorate([
    (0, inlinejs_element_1.Property)({ type: 'string', spread: 'alignment' })
], CanvasAlignElement.prototype, "horizontal", void 0);
__decorate([
    (0, inlinejs_element_1.Property)({ type: 'string', spread: 'alignment' })
], CanvasAlignElement.prototype, "vertical", void 0);
__decorate([
    (0, inlinejs_element_1.Property)({ type: 'boolean' })
], CanvasAlignElement.prototype, "group", void 0);
exports.CanvasAlignElement = CanvasAlignElement;
function CanvasAlignCompact() {
    (0, inlinejs_element_1.RegisterCustomElement)(CanvasAlignElement, 'canvas-align');
}
exports.CanvasAlignCompact = CanvasAlignCompact;
