import { GetGlobal } from "@benbraide/inlinejs";
import { CanvasRefreshEvent, ICanvasFigure, ICanvasPaintMode, ICanvasPosition } from "../types";
import { CanvasParent } from "./parent";

export class CanvasPath extends CanvasParent{
    protected ctx_: Path2D | null = null;

    public constructor(state?: Record<string, any>){
        super({
            mode: <ICanvasPaintMode>'fill',
            color: '',
            close: false,
            'line-width': 1,
            'line-cap': <CanvasLineCap>'butt',
            'line-join': <CanvasLineJoin>'miter',
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

    public GetContext(): CanvasRenderingContext2D | Path2D | null{
        return this.ctx_;
    }
    
    protected Render_(ctx: CanvasRenderingContext2D | Path2D){
        ('save' in ctx) && ctx.save();

        this.Fill_();
        this.Project_(ctx);

        ('restore' in ctx) && ctx.restore();
    }

    protected Fill_(){
        let position = this.GetUnscaledOffsetPosition_();
        
        this.ctx_ = new Path2D;
        this.ctx_.moveTo(position.x, position.y);

        super.Render_(this.ctx_);
        this.state_.close && this.ctx_.closePath();
    }

    protected Project_(ctx: CanvasRenderingContext2D | Path2D){
        ('lineWidth' in ctx) && (ctx.lineWidth = this.state_['line-width']);
        ('lineCap' in ctx) && (ctx.lineCap = this.state_['line-cap']);
        ('lineJoin' in ctx) && (ctx.lineJoin = this.state_['line-join']);
        
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
