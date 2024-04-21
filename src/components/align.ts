import { Property, RegisterCustomElement } from "@benbraide/inlinejs-element";
import { CanvasAlignmentType, ICanvasAlignment, ICanvasFigure, ICanvasPosition } from "../types";
import { Align } from "../utilities/align";
import { CanvasParentElement } from "./parent";

export class CanvasAlignElement extends CanvasParentElement{
    @Property({ type: 'string', spread: 'alignment' })
    public horizontal: CanvasAlignmentType = 'start';

    @Property({ type: 'string', spread: 'alignment' })
    public vertical: CanvasAlignmentType = 'start';

    @Property({ type: 'boolean' })
    public group: boolean = false;
    
    public constructor(){
        super();
    }

    public OffsetPosition(position: ICanvasPosition, source: ICanvasFigure | null, ctx?: CanvasRenderingContext2D): ICanvasPosition{
        const myPosition = this.GetOffsetPosition_(ctx), parentSize = this.GetParentSize_(null), alignment = this.GetAlignment_();
        const childSize = ((source && !this.group) ? source.GetSize(ctx || null) : this.GetChildSize_(ctx || null));

        const computedAlignment: ICanvasPosition = {
            x: Align(alignment.horizontal, childSize.width, parentSize.width),
            y: Align(alignment.vertical, childSize.height, parentSize.height),
        };

        return {
            x: (position.x + computedAlignment.x + myPosition.x),
            y: (position.y + computedAlignment.y + myPosition.y),
        };
    }

    protected GetAlignment_(): ICanvasAlignment{
        return {
            horizontal: this.horizontal,
            vertical: this.vertical,
        };
    }
}

export function CanvasAlignCompact(){
    RegisterCustomElement(CanvasAlignElement, 'canvas-align');
}
