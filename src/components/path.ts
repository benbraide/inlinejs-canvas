import { CanvasRefreshEvent, ICanvasFigure, CanvasPaintModeType, ICanvasPosition } from "../types";
import { CanvasParentElement } from "./parent";
import { Property, RegisterCustomElement } from "@benbraide/inlinejs-element";
import { AssignContextValue, CallContextMethod, FillOrStrokeContext, TryGuardContext } from "../utilities/context";

export class CanvasPathElement extends CanvasParentElement{
    protected ctx_: Path2D | null = null;

    @Property({ type: 'string' })
    public mode: CanvasPaintModeType = 'fill';

    @Property({ type: 'string' })
    public color = '';

    @Property({ type: 'boolean' })
    public close = false;

    @Property({ type: 'number', spread: 'line' })
    public lineWidth = 1;

    @Property({ type: 'string', spread: 'line' })
    public lineCap: CanvasLineCap = 'butt';

    @Property({ type: 'string', spread: 'line' })
    public lineJoin: CanvasLineJoin = 'miter';

    public constructor(){
        super();
        this.addEventListener(CanvasRefreshEvent, () => (this.ctx_ = null));
    }

    public ContainsPoint(point: ICanvasPosition, ctx: CanvasRenderingContext2D){
        !this.ctx_ && this.Fill_();
        return !!(this.ctx_ && ctx.isPointInPath(this.ctx_, point.x, point.y));
    }

    public FindFigureWithPoint(point: ICanvasPosition, ctx: CanvasRenderingContext2D): ICanvasFigure | null{
        return (this.ContainsPoint(point, ctx) ? this : null);
    }

    public GetContext(): CanvasRenderingContext2D | Path2D | null{
        return this.ctx_;
    }
    
    protected Render_(ctx: CanvasRenderingContext2D | Path2D){
        TryGuardContext(ctx, (ctx) => {
            this.Fill_();
            this.Project_(ctx);
        });
    }

    protected Fill_(){
        let position = this.GetUnscaledOffsetPosition_();
        
        this.ctx_ = new Path2D;
        this.ctx_.moveTo(position.x, position.y);

        this.Draw_();
        super.Render_(this.ctx_);
        this.close && this.ctx_.closePath();
    }

    protected Draw_(){}

    protected Project_(ctx: CanvasRenderingContext2D | Path2D){
        if (this.ctx_){
            ['lineWidth', 'lineCap', 'lineJoin'].forEach(prop => AssignContextValue(ctx, prop, this[prop]));
            !FillOrStrokeContext(ctx, this.mode, this.color, this.ctx_) && CallContextMethod(ctx, 'addPath', this.ctx_);
        }
    }
}

export function CanvasPathCompact(){
    RegisterCustomElement(CanvasPathElement, 'canvas-path');
}
