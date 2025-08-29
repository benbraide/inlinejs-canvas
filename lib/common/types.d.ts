export declare const CanvasRefreshEvent = "canvas.refresh";
export declare const CanvasCollisionEvent = "canvas.collision";
export declare const CanvasCollisionCheckEvent = "canvas.collision.check";
export interface ICanvasPosition extends Record<string, number> {
    x: number;
    y: number;
}
export interface ICanvasSize extends Record<string, number> {
    width: number;
    height: number;
}
export interface ICanvasRect extends Record<string, number> {
    x: number;
    y: number;
    width: number;
    height: number;
}
export interface ICanvasCircle extends Record<string, number> {
    x: number;
    y: number;
    radius: number;
}
export interface ICanvasScaleValue extends Record<string, number> {
    horizontal: number;
    vertical: number;
}
export declare type CanvasPaintModeType = 'fill' | 'stroke' | 'both';
export declare type CanvasAlignmentType = 'start' | 'center' | 'end';
export interface ICanvasAlignment {
    horizontal: CanvasAlignmentType;
    vertical: CanvasAlignmentType;
}
export declare type ICanvasPaintRect = ICanvasRect;
export interface ICanvasComponent {
    GetComponentChildren(): Array<ICanvasComponent>;
    GetContext(): CanvasRenderingContext2D | Path2D | null;
    GetSurfaceContext(): CanvasRenderingContext2D | null;
    GetSurfaceSize(): ICanvasSize;
    Refresh(): void;
}
export interface ICanvasSurface extends ICanvasComponent {
    Render(): void;
    IsPriorityAware(): boolean;
}
export interface ICanvasFigure extends ICanvasComponent {
    GetFigureChildren(): Array<ICanvasFigure>;
    GetPosition(): ICanvasPosition;
    GetOffsetPosition(ctx?: CanvasRenderingContext2D): ICanvasPosition;
    GetSize(ctx: CanvasRenderingContext2D | null): ICanvasSize;
    GetFixedSize(ctx: CanvasRenderingContext2D | null): ICanvasSize;
    GetRect(ctx: CanvasRenderingContext2D | null): ICanvasRect;
    OffsetPosition(position: ICanvasPosition, source: ICanvasFigure | null, ctx?: CanvasRenderingContext2D): ICanvasPosition;
    ContainsPoint(point: ICanvasPosition, ctx: CanvasRenderingContext2D): boolean;
    FindFigureWithPoint(point: ICanvasPosition, ctx: CanvasRenderingContext2D): ICanvasFigure | null;
    GetTransformScale(): ICanvasScaleValue;
}
export interface ICanvasShape extends ICanvasFigure {
    GetPriority(): number;
    GetShapeChildren(): Array<ICanvasShape>;
    Paint(ctx: CanvasRenderingContext2D | Path2D): void;
}
export declare type CanvasBodyDirectionType = '' | 'n' | 'nw' | 'w' | 'sw' | 's' | 'se' | 'e' | 'ne';
