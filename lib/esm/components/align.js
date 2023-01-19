import { GetGlobal } from "@benbraide/inlinejs";
import { Align } from "../utilities/align";
import { CanvasParent } from "./parent";
export class CanvasAlign extends CanvasParent {
    constructor() {
        super({
            value: { horizontal: 'start', vertical: 'start' },
            group: false,
        });
    }
    OffsetPosition(position, source, ctx) {
        let myPosition = this.GetOffsetPosition_(ctx), parentSize = this.GetParentSize_(null), childSize = ((source && !this.state_.group) ? source.GetSize(ctx || null) : this.GetChildSize_(ctx || null));
        let alignment = {
            x: Align(this.state_.value.horizontal, childSize.width, parentSize.width),
            y: Align(this.state_.value.vertical, childSize.height, parentSize.height),
        };
        return {
            x: (position.x + alignment.x + myPosition.x),
            y: (position.y + alignment.y + myPosition.y),
        };
    }
}
export function CanvasAlignCompact() {
    customElements.define(GetGlobal().GetConfig().GetElementName('canvas-align'), CanvasAlign);
}
