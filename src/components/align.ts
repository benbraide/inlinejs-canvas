import { GetGlobal } from "@benbraide/inlinejs";
import { CanvasAlignmentType, ICanvasPosition } from "../types";
import { Align } from "../utilities/align";
import { CanvasParent } from "./parent";

export class CanvasAlign extends CanvasParent{
    public constructor(){
        super({
            value: { horizontal: <CanvasAlignmentType>'start', vertical: <CanvasAlignmentType>'start' },
        });
    }

    public OffsetPosition(position: ICanvasPosition): ICanvasPosition{
        let myPosition = this.GetOffsetPosition_(), parentSize = this.GetParentSize_(null), childSize = this.GetChildSize_(null);
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
