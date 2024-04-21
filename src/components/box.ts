import { Property, RegisterCustomElement } from "@benbraide/inlinejs-element";
import { ICanvasFigure, ICanvasPosition, ICanvasSize } from "../types";
import { CanvasParentElement } from "./parent";
import { TryGuardContext } from "../utilities/context";

export class CanvasBoxElement extends CanvasParentElement{
    @Property({ type: 'number', spread: 'size' })
    public width = 0;

    @Property({ type: 'number', spread: 'size' })
    public height = 0;
    
    public constructor(){
        super();
    }

    public FindFigureWithPoint(point: ICanvasPosition, ctx: CanvasRenderingContext2D): ICanvasFigure | null{
        return (super.FindFigureWithPoint(point, ctx) || (this.ContainsPoint(point, ctx) ? this : null));
    }

    public GetSize(ctx: CanvasRenderingContext2D | null): ICanvasSize{
        return { width: this.width, height: this.height };
    }

    protected Render_(ctx: CanvasRenderingContext2D | Path2D){
        TryGuardContext(ctx, ctx => super.Render_(ctx));
    }
}

export function CanvasBoxCompact(){
    RegisterCustomElement(CanvasBoxElement, 'canvas-box');
}
