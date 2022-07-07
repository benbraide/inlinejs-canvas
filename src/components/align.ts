import { GetGlobal } from "@benbraide/inlinejs";
import { CanvasAlignmentType, ICanvasFigure, ICanvasPosition } from "../types";
import { Align } from "../utilities/align";
import { CanvasParent } from "./parent";

export class CanvasAlign extends CanvasParent{
    public constructor(){
        super({
            value: { horizontal: <CanvasAlignmentType>'start', vertical: <CanvasAlignmentType>'start' },
            group: false,
        });
    }

    public OffsetPosition(position: ICanvasPosition, source: ICanvasFigure | null, ctx?: CanvasRenderingContext2D): ICanvasPosition{
        let myPosition = this.GetOffsetPosition_(ctx), parentSize = this.GetParentSize_(null), childSize = ((source && !this.state_.group) ? source.GetSize(ctx || null) : this.GetChildSize_(ctx || null));
        let alignment: ICanvasPosition = {
            x: Align(this.state_.value.horizontal, childSize.width, parentSize.width),
            y: Align(this.state_.value.vertical, childSize.height, parentSize.height),
        };

        return {
            x: (position.x + alignment.x + myPosition.x),
            y: (position.y + alignment.y + myPosition.y),
        };
    }
}

export function CanvasAlignCompact(){
    customElements.define(GetGlobal().GetConfig().GetDirectiveName('canvas-align'), CanvasAlign);
}
