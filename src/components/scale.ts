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
        const myPosition = this.GetOffsetPosition_(ctx);
        return {
            x: (myPosition.x + (position.x * this.horizontal)),
            y: (myPosition.y + (position.y * this.vertical)),
        };
    }

    public GetTransformScale(): ICanvasScaleValue{
        const parentScale = super.GetTransformScale();
        return {
            horizontal: (parentScale.horizontal * this.horizontal),
            vertical: (parentScale.vertical * this.vertical),
        };
    }

    protected ComputeDisplacement_(point: ICanvasPosition, ctx: CanvasRenderingContext2D){
        const displacement = super.ComputeDisplacement_(point, ctx);
        return { x: (displacement.x / this.horizontal), y: (displacement.y / this.vertical) };
    }

    protected Apply_(ctx: CanvasRenderingContext2D | Path2D){
        super.Apply_(ctx);
        CallContextMethod(ctx, 'scale', this.horizontal, this.vertical);
    }
}

export function CanvasScaleCompact(){
    RegisterCustomElement(CanvasScaleElement, 'canvas-scale');
}
