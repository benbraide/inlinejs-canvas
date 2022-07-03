import { ICanvasPaintMode, ICanvasPosition, ICanvasSize } from "../types";
import { TestPoint } from "../utilities/test-point";
import { CanvasShape } from "./shape"

export class CanvasFullShape extends CanvasShape{
    public constructor(state?: Record<string, any>){
        super({
            size: {
                width: 0,
                height: 0,
            },
            mode: <ICanvasPaintMode>'fill',
            color: '',
            ...(state || {}),
        });
    }

    public ContainsPoint(point: ICanvasPosition, ctx: CanvasRenderingContext2D){
        return TestPoint(point, this.GetOffsetPosition_(), this.state_.size, this.GetTransformScale());
    }

    protected Paint_(ctx: CanvasRenderingContext2D | Path2D){
        ('save' in ctx) && ctx.save();
        
        if (this.state_.mode === 'stroke' && 'strokeStyle' in ctx){
            ctx.strokeStyle = (this.state_.color || 'black');
        }
        else if (this.state_.mode !== 'stroke' && 'fillStyle' in ctx){
            ctx.fillStyle = (this.state_.color || 'black');
        }
        
        this.Render_(ctx);

        ('restore' in ctx) && ctx.restore();
    }
}
