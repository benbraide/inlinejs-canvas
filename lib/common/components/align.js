"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasAlignCompact = exports.CanvasAlign = void 0;
const inlinejs_1 = require("@benbraide/inlinejs");
const align_1 = require("../utilities/align");
const parent_1 = require("./parent");
class CanvasAlign extends parent_1.CanvasParent {
    constructor() {
        super({
            value: { horizontal: 'start', vertical: 'start' },
            group: false,
        });
    }
    OffsetPosition(position, source, ctx) {
        let myPosition = this.GetOffsetPosition_(ctx), parentSize = this.GetParentSize_(null), childSize = ((source && !this.state_.group) ? source.GetSize(ctx || null) : this.GetChildSize_(ctx || null));
        let alignment = {
            x: (0, align_1.Align)(this.state_.value.horizontal, childSize.width, parentSize.width),
            y: (0, align_1.Align)(this.state_.value.vertical, childSize.height, parentSize.height),
        };
        return {
            x: (position.x + alignment.x + myPosition.x),
            y: (position.y + alignment.y + myPosition.y),
        };
    }
}
exports.CanvasAlign = CanvasAlign;
function CanvasAlignCompact() {
    customElements.define((0, inlinejs_1.GetGlobal)().GetConfig().GetElementName('canvas-align'), CanvasAlign);
}
exports.CanvasAlignCompact = CanvasAlignCompact;
