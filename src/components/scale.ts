import { GetGlobal } from "@benbraide/inlinejs";
import { ICanvasPosition, ICanvasScaleValue } from "../types";
import { CanvasTransform } from "./transform";

export class CanvasScale extends CanvasTransform{
    public constructor(){
        super({
            value: { horizontal: 1, vertical: 1 },
        });
    }

    public OffsetPosition(position: ICanvasPosition){
        return this.OffsetPosition_(position, this);
    }

    public FindChildWithPoint(point: ICanvasPosition, ctx: CanvasRenderingContext2D){
        return this.FindChildWithPoint_(point, ctx);
    }

    public GetTransformScale(): ICanvasScaleValue{
        return this.state_.value;
    }

    protected Apply_(ctx: CanvasRenderingContext2D | Path2D){
        ('scale' in ctx) && ctx.scale(this.state_.value.horizontal, this.state_.value.vertical);
    }
}

export function CanvasScaleCompact(){
    customElements.define(GetGlobal().GetConfig().GetDirectiveName('canvas-scale'), CanvasScale);
}
