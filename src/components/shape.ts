import { CanvasRefreshEvent, ICanvasComponent, ICanvasFigure, ICanvasPosition, ICanvasRect, ICanvasScaleValue, ICanvasShape, ICanvasSize } from "../types";
import { FindAncestor } from "../utilities/find-ancestor";
import { RemoveScale } from "../utilities/remove-scale";
import { TestPoint } from "../utilities/test-point";
import { CanvasAttributed } from "./attributed";

export class CanvasShape extends CanvasAttributed implements ICanvasShape{
    public constructor(state?: Record<string, any>){
        super({
            position: {
                x: 0,
                y: 0,
            },
            hidden: false,
            ...(state || {}),
        });
    }
    
    public GetComponentChildren(){
        return (Array.from(this.children).filter(child => (typeof child['GetComponentChildren'] === 'function')) as Array<unknown> as Array<ICanvasComponent>);
    }

    public GetFigureChildren(){
        return (this.GetComponentChildren().filter(child => (typeof child['GetFigureChildren'] === 'function')) as Array<unknown> as Array<ICanvasFigure>);
    }

    public GetPosition(): ICanvasPosition{
        return this.state_['position'];
    }

    public GetSize(ctx: CanvasRenderingContext2D | null): ICanvasSize{
        return (this.state_['size'] || { width: 0, height: 0 });
    }

    public GetFixedSize(ctx: CanvasRenderingContext2D | null): ICanvasSize{
        return (this.state_.size || this.GetParentSize_(ctx));
    }

    public GetRect(ctx: CanvasRenderingContext2D | null): ICanvasRect{
        return { ...this.GetPosition(), ...this.GetSize(ctx) };
    }

    public OffsetPosition(position: ICanvasPosition, source: ICanvasFigure | null){
        return position;
    }

    public ContainsPoint(point: ICanvasPosition, ctx: CanvasRenderingContext2D){
        return TestPoint(point, this.GetOffsetPosition_(), (this.state_.size || { width: 0, height: 0 }), this.GetTransformScale());
    }

    public FindChildWithPoint(point: ICanvasPosition, ctx: CanvasRenderingContext2D): ICanvasFigure | null{
        return (this.ContainsPoint(point, ctx) ? this : null);
    }

    public GetTransformScale(): ICanvasScaleValue{
        let ancestor = FindAncestor(this, 'GetTransformScale');
        return (ancestor ? (ancestor as any)['GetTransformScale']() : { horizontal: 1, vertical: 1 });
    }

    public GetShapeChildren(){
        return (this.GetComponentChildren().filter(child => (typeof child['GetShapeChildren'] === 'function')) as Array<unknown> as Array<ICanvasShape>);
    }

    public Paint(ctx: CanvasRenderingContext2D | Path2D){
        !this.state_.hidden && this.Paint_(ctx);
    }

    protected Cast_(name: string, value: any){
        return ((name === 'hidden') ? this.hasAttribute('hidden') : super.Cast_(name, value));
    }

    protected Paint_(ctx: CanvasRenderingContext2D | Path2D){
        this.Render_(ctx);
    }

    protected Render_(ctx: CanvasRenderingContext2D | Path2D){}

    protected Refresh_(){
        this.dispatchEvent(new CustomEvent(CanvasRefreshEvent, {
            bubbles: true,
        }));
    }

    protected GetOffsetPosition_(): ICanvasPosition{
        let ancestor = FindAncestor(this, 'OffsetPosition');
        return (ancestor ? (ancestor as any)['OffsetPosition'](this.state_.position, this) : this.state_.position);
    }

    protected GetUnscaledOffsetPosition_(): ICanvasPosition{
        return RemoveScale(this.GetOffsetPosition_(), this.GetTransformScale());
    }

    protected GetParentSize_(ctx: CanvasRenderingContext2D | null): ICanvasSize{
        let ancestor = FindAncestor(this, 'GetFixedSize');
        return (ancestor ? (ancestor as any)['GetFixedSize'](ctx): { width: 0, height: 0 });
    }
}
