import { GetGlobal } from "@benbraide/inlinejs";
import { ICanvasSize } from "../types";
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

    protected Render_(ctx: CanvasRenderingContext2D | Path2D){
        ('save' in ctx) && ctx.save();
        super.Render_(ctx);
        ('restore' in ctx) && ctx.restore();
    }
}

export function CanvasBoxCompact(){
    customElements.define(GetGlobal().GetConfig().GetDirectiveName('canvas-box'), CanvasBox);
}
