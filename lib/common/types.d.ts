export declare const CanvasRefreshEvent = "canvas.refresh";
export interface ICanvasPosition {
    x: number;
    y: number;
}
export interface ICanvasSize {
    width: number;
    height: number;
}
export interface ICanvasRect {
    x: number;
    y: number;
    width: number;
    height: number;
}
export interface ICanvasScaleValue {
    horizontal: number;
    vertical: number;
}
export declare type ICanvasPaintMode = 'fill' | 'stroke';
export declare type CanvasAlignmentType = 'start' | 'center' | 'end';
export interface ICanvasCoreState {
    hidden: boolean;
    position: ICanvasPosition;
    size: ICanvasSize;
}
export interface ICanvasShapeState extends ICanvasCoreState {
    mode: ICanvasPaintMode;
    color: string;
}
export declare type ICanvasPaintRect = ICanvasRect;
export interface ICanvasComponent {
    GetComponentChildren(): Array<ICanvasComponent>;
}
export interface ICanvasFigure extends ICanvasComponent {
    GetFigureChildren(): Array<ICanvasFigure>;
    GetPosition(): ICanvasPosition;
    GetSize(ctx: CanvasRenderingContext2D | null): ICanvasSize;
    GetFixedSize(ctx: CanvasRenderingContext2D | null): ICanvasSize;
    GetRect(ctx: CanvasRenderingContext2D | null): ICanvasRect;
    OffsetPosition(position: ICanvasPosition): ICanvasPosition;
    ContainsPoint(point: ICanvasPosition, ctx: CanvasRenderingContext2D): boolean;
    FindChildWithPoint(point: ICanvasPosition, ctx: CanvasRenderingContext2D): ICanvasFigure | null;
    GetTransformScale(): ICanvasScaleValue;
}
export interface ICanvasShape extends ICanvasFigure {
    GetShapeChildren(): Array<ICanvasShape>;
    Paint(ctx: CanvasRenderingContext2D | Path2D): void;
}
