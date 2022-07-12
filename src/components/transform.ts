import { ICanvasFigure, ICanvasPosition } from "../types";
import { ComputeDisplacement } from "../utilities/compute-displacement";
import { RotatePoint } from "../utilities/rotate-point";
import { CanvasParent } from "./parent";

export class CanvasTransform extends CanvasParent{
    public constructor(state?: Record<string, any>){
        super(state);
    }

    public FindChildWithPoint(point: ICanvasPosition, ctx: CanvasRenderingContext2D){
        let position: ICanvasPosition;
        if ('angle' in this.state_){
            position = ComputeDisplacement(RotatePoint(this.GetOffsetPosition_(ctx), this.state_.angle), RotatePoint(point, this.state_.angle));
        }
        else{
            position = ComputeDisplacement(this.GetOffsetPosition_(ctx), point);
        }
        
        return this.FindChildWithPoint_(position, ctx);
    }

    public OffsetPosition(position: ICanvasPosition, source: ICanvasFigure | null, ctx?: CanvasRenderingContext2D){
        return position;
    }
    
    protected Render_(ctx: CanvasRenderingContext2D | Path2D){
        ('save' in ctx) && ctx.save();

        this.Apply_(ctx);
        super.Render_(ctx);
        
        ('restore' in ctx) && ctx.restore();
    }

    protected Apply_(ctx: CanvasRenderingContext2D | Path2D){}

    protected FindChildWithPoint_(point: ICanvasPosition, ctx: CanvasRenderingContext2D){
        for (let child of this.GetFigureChildren()){
            let found = child.FindChildWithPoint(point, ctx);
            if (found){
                return found;
            }
        }
        
        return null;
    }

    protected Translate_(ctx: CanvasRenderingContext2D | Path2D, position?: ICanvasPosition){
        position = (position || this.GetUnscaledOffsetPosition_());
        ('translate' in ctx) && ctx.translate(position.x, position.y);
    }
}
