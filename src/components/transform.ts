import { ICanvasFigure, ICanvasPosition } from "../types";
import { ComputeDisplacement } from "../utilities/compute-displacement";
import { CallContextMethod, TryGuardContext } from "../utilities/context";
import { CanvasParentElement } from "./parent";

export class CanvasTransformElement extends CanvasParentElement{
    public constructor(){
        super();
    }

    public FindFigureWithPoint(point: ICanvasPosition, ctx: CanvasRenderingContext2D){
        return this.FindFigureWithPoint_(this.ComputeDisplacement_(point, ctx), ctx);
    }

    protected Render_(ctx: CanvasRenderingContext2D | Path2D){
        TryGuardContext(ctx, (ctx) => {
            this.Apply_(ctx);
            super.Render_(ctx);
        });
    }

    protected ComputeDisplacement_(point: ICanvasPosition, ctx: CanvasRenderingContext2D){
        return ComputeDisplacement(this.GetOffsetPosition_(ctx), point);
    }
    
    protected Apply_(ctx: CanvasRenderingContext2D | Path2D){
        this.Translate_(ctx);
    }

    protected FindFigureWithPoint_(point: ICanvasPosition, ctx: CanvasRenderingContext2D){
        return super.FindFigureWithPoint(point, ctx);
    }

    protected Translate_(ctx: CanvasRenderingContext2D | Path2D, position?: ICanvasPosition){
        position = (position || this.GetUnscaledOffsetPosition_(('save' in ctx) ? ctx : undefined));
        CallContextMethod(ctx, 'translate', position.x, position.y);
    }
}
