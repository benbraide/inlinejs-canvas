import { Property, RegisterCustomElement } from "@benbraide/inlinejs-element";
import { ICanvasFigure, ICanvasPosition, ICanvasScaleValue } from "../types";
import { CanvasTransformElement } from "./transform";
import { CallContextMethod } from "../utilities/context";

export class CanvasScaleElement extends CanvasTransformElement{
    @Property({ type: 'number', spread: 'factor' })
    public horizontal = 1;

    @Property({ type: 'number', spread: 'factor' })
    public vertical = 1;
    
    public constructor(){
        super();
    }

    public OffsetPosition(position: ICanvasPosition, source: ICanvasFigure | null, ctx?: CanvasRenderingContext2D){
        return this.OffsetPosition_(position, this, ctx);
    }

    public FindFigureWithPoint(point: ICanvasPosition, ctx: CanvasRenderingContext2D){
        return this.FindFigureWithPoint_(point, ctx);
    }

    public GetTransformScale(): ICanvasScaleValue{
        return { horizontal: this.horizontal, vertical: this.vertical };
    }

    protected Apply_(ctx: CanvasRenderingContext2D | Path2D){
        CallContextMethod(ctx, 'scale', this.horizontal, this.vertical);
    }
}

export function CanvasScaleCompact(){
    RegisterCustomElement(CanvasScaleElement, 'canvas-scale');
}
