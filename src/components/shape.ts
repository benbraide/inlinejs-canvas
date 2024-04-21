import { CustomElement, Property } from "@benbraide/inlinejs-element";
import { ICanvasComponent, ICanvasFigure, ICanvasPosition, ICanvasRect, ICanvasScaleValue, ICanvasShape, ICanvasSize } from "../types";
import { RemoveScale } from "../utilities/remove-scale";
import { TestPoint } from "../utilities/test-point";
import { FilterByFunction } from "../utilities/filter";
import { FindAncestorByFunction } from "../utilities/ancestor";

export class CanvasShapeElement extends CustomElement implements ICanvasShape{
    protected hidden_ = false;
    
    @Property({ type: 'boolean' })
    public UpdateHiddenProperty(value: boolean){
        this.hidden_ = value;
    }
    
    @Property({ type: 'number', spread: 'position' })
    public x = 0;

    @Property({ type: 'number', spread: 'position' })
    public y = 0;

    @Property({ type: 'number' })
    public priority = 0;
    
    public constructor(){
        super({
            isTemplate: true,
            isHidden: true,
        });
    }
    
    public GetComponentChildren(){
        return FilterByFunction<ICanvasComponent>(Array.from(this.children), 'GetComponentChildren');
    }

    public GetFigureChildren(){
        return FilterByFunction<ICanvasFigure>(Array.from(this.children), 'GetFigureChildren');
    }

    public GetPosition(): ICanvasPosition{
        return { x: this.x, y: this.y };
    }

    public GetOffsetPosition(ctx?: CanvasRenderingContext2D): ICanvasPosition{
        return this.GetOffsetPosition_(ctx);
    }

    public GetContext(): CanvasRenderingContext2D | Path2D | null{
        return (FindAncestorByFunction<ICanvasComponent>(this, 'GetContext')?.GetContext() || null);
    }

    public GetSurfaceContext(): CanvasRenderingContext2D | null{
        return (FindAncestorByFunction<ICanvasComponent>(this, 'GetSurfaceContext')?.GetSurfaceContext() || null);
    }

    public GetSurfaceSize(): ICanvasSize{
        return (FindAncestorByFunction<ICanvasComponent>(this, 'GetSurfaceSize')?.GetSurfaceSize() || { width: 0, height: 0 });
    }

    public GetSize(ctx: CanvasRenderingContext2D | null): ICanvasSize{
        return { width: ((('width' in this) && (this as any)['width']) || 0), height: ((('height' in this) && (this as any)['height']) || 0) };
    }

    public GetFixedSize(ctx: CanvasRenderingContext2D | null): ICanvasSize{
        return this.GetSize(ctx);
    }

    public GetRect(ctx: CanvasRenderingContext2D | null): ICanvasRect{
        return { ...this.GetPosition(), ...this.GetSize(ctx) };
    }

    public OffsetPosition(position: ICanvasPosition, source: ICanvasFigure | null, ctx?: CanvasRenderingContext2D){
        return position;
    }

    public ContainsPoint(point: ICanvasPosition, ctx: CanvasRenderingContext2D){
        return TestPoint(point, this.GetOffsetPosition_(), this.GetSize(ctx), this.GetTransformScale());
    }

    public FindFigureWithPoint(point: ICanvasPosition, ctx: CanvasRenderingContext2D): ICanvasFigure | null{
        return (this.ContainsPoint(point, ctx) ? this : null);
    }

    public GetTransformScale(): ICanvasScaleValue{
        return (FindAncestorByFunction<ICanvasFigure>(this, 'GetTransformScale')?.GetTransformScale() || { horizontal: 1, vertical: 1 });
    }

    public GetPriority(){
        return this.priority;
    }
    
    public GetShapeChildren(){
        return FilterByFunction<ICanvasShape>(Array.from(this.children), 'GetShapeChildren');
    }

    public Refresh(){
        this.Refresh_();
    }

    public Paint(ctx: CanvasRenderingContext2D | Path2D){
        !this.hidden_ && this.Paint_(ctx);
    }

    protected Paint_(ctx: CanvasRenderingContext2D | Path2D){
        this.Render_(ctx);
    }

    protected Render_(ctx: CanvasRenderingContext2D | Path2D){}

    protected AttributeChanged_(name: string){
        super.AttributeChanged_(name);
        this.ShouldRefreshOnChange_(name) && this.Refresh_();//Refresh if possible
    }

    protected ShouldRefreshOnChange_(name: string){
        return true;
    }

    protected Refresh_(){
        FindAncestorByFunction<ICanvasComponent>(this, 'Refresh')?.Refresh();
    }

    protected GetOffsetPosition_(ctx?: CanvasRenderingContext2D): ICanvasPosition{
        const ancestor = FindAncestorByFunction<ICanvasFigure>(this, 'OffsetPosition');
        return (ancestor ? ancestor.OffsetPosition(this.GetPosition(), (this as unknown as ICanvasFigure), ctx) : this.GetPosition());
    }

    protected GetUnscaledOffsetPosition_(ctx?: CanvasRenderingContext2D): ICanvasPosition{
        return RemoveScale(this.GetOffsetPosition_(ctx), this.GetTransformScale());
    }

    protected GetParentSize_(ctx: CanvasRenderingContext2D | null): ICanvasSize{
        const ancestor = FindAncestorByFunction<ICanvasFigure>(this, 'GetFixedSize');
        return (ancestor ? ancestor.GetFixedSize(ctx) : { width: 0, height: 0 });
    }
}
