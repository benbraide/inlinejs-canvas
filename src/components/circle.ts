import { GetGlobal } from "@benbraide/inlinejs";
import { ICanvasSize } from "../types";
import { CanvasPath } from "./path";

export class CanvasCircle extends CanvasPath{
    public constructor(){
        super({
            radius: 0,
        });

        this.Fill_();
    }

    public GetSize(ctx: CanvasRenderingContext2D | null): ICanvasSize{
        return {
            width: (this.state_.radius * 2),
            height: (this.state_.radius * 2),
        };
    }
    
    protected Fill_(){
        let position = this.GetUnscaledOffsetPosition_();
        
        this.ctx_ = new Path2D;
        this.ctx_.arc((position.x + this.state_.radius), (position.y + this.state_.radius), this.state_.radius, 0, (Math.PI * 2), false);
    }
}

export function CanvasCircleCompact(){
    customElements.define(GetGlobal().GetConfig().GetDirectiveName('canvas-circle'), CanvasCircle);
}
