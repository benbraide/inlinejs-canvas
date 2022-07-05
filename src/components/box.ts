import { GetGlobal } from "@benbraide/inlinejs";
import { ICanvasFigure, ICanvasPosition, ICanvasSize } from "../types";
import { CanvasParent } from "./parent";

export class CanvasBox extends CanvasParent{
    public constructor(){
        super({
            size: { width: 0, height: 0 },
        });
    }

    public GetSize(ctx: CanvasRenderingContext2D | null): ICanvasSize{
        return this.state_.size;
    }

    public FindChildWithPoint(point: ICanvasPosition, ctx: CanvasRenderingContext2D): ICanvasFigure | null{
        return (super.FindChildWithPoint(point, ctx) || (this.ContainsPoint(point, ctx) ? this : null));
    }

    protected Render_(ctx: CanvasRenderingContext2D | Path2D){
        ('save' in ctx) && ctx.save();
        super.Render_(ctx);
        ('restore' in ctx) && ctx.restore();
    }
}

export function CanvasBoxCompact(){
    customElements.define(GetGlobal().GetConfig().GetDirectiveName('canvas-box'), CanvasBox);
}
