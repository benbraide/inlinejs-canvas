import { GetGlobal } from "@benbraide/inlinejs";
import { CanvasRefreshEvent, ICanvasFigure, ICanvasPaintMode, ICanvasPosition } from "../types";
import { CanvasParent } from "./parent";

export class CanvasPath extends CanvasParent{
    protected ctx_: Path2D | null = null;

    public constructor(state?: Record<string, any>){
        super({
            mode: <ICanvasPaintMode>'fill',
            color: '',
            close: true,
            ...(state || {}),
        });
        this.addEventListener(CanvasRefreshEvent, () => (this.ctx_ = null));
    }

    public ContainsPoint(point: ICanvasPosition, ctx: CanvasRenderingContext2D){
        !this.ctx_ && this.Fill_();
        return !!(this.ctx_ && ctx.isPointInPath(this.ctx_, point.x, point.y));
    }

    public FindChildWithPoint(point: ICanvasPosition, ctx: CanvasRenderingContext2D): ICanvasFigure | null{
        return (this.ContainsPoint(point, ctx) ? this : null);
    }
    
    protected Render_(ctx: CanvasRenderingContext2D | Path2D){
        (!this.ctx_ || 'addPath' in ctx) && this.Fill_();//Fill if empty OR inside another path
        this.Project_(ctx);
    }

    protected Fill_(){
        let position = this.GetUnscaledOffsetPosition_();
        
        this.ctx_ = new Path2D;
        this.ctx_.moveTo(position.x, position.y);

        super.Render_(this.ctx_);
        this.state_.close && this.ctx_.closePath();
    }

    protected Project_(ctx: CanvasRenderingContext2D | Path2D){
        if (this.ctx_ && this.state_.mode === 'stroke' && 'strokeStyle' in ctx){
            ctx.strokeStyle = (this.state_.color || 'black');
            ctx.stroke(this.ctx_);
        }
        else if (this.ctx_ && this.state_.mode !== 'stroke' && 'fillStyle' in ctx){
            ctx.fillStyle = (this.state_.color || 'black');
            ctx.fill(this.ctx_);
        }
        else if (this.ctx_ && 'addPath' in ctx){
            ctx.addPath(this.ctx_);
        }
    }
}

export function CanvasPathCompact(){
    customElements.define(GetGlobal().GetConfig().GetDirectiveName('canvas-path'), CanvasPath);
}
