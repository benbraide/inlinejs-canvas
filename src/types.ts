export const CanvasRefreshEvent = 'canvas.refresh';
export const CanvasCollisionEvent = 'canvas.collision';
export const CanvasCollisionCheckEvent = 'canvas.collision.check';

export interface ICanvasPosition{
    x: number;
    y: number;
}

export interface ICanvasSize{
    width: number;
    height: number;
}

export interface ICanvasRect{
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface ICanvasScaleValue{
    horizontal: number;
    vertical: number;
}

export type ICanvasPaintMode = 'fill' | 'stroke';

export type CanvasAlignmentType = 'start' | 'center' | 'end';

export interface ICanvasCoreState{
    hidden: boolean;
    position: ICanvasPosition;
    size: ICanvasSize;
}

export interface ICanvasShapeState extends ICanvasCoreState{
    mode: ICanvasPaintMode;
    color: string;
}

export type ICanvasPaintRect = ICanvasRect;

export interface ICanvasComponent{
    GetComponentChildren(): Array<ICanvasComponent>;
}

export interface ICanvasFigure extends ICanvasComponent{
    GetFigureChildren(): Array<ICanvasFigure>;
    GetPosition(): ICanvasPosition;
    GetOffsetPosition(ctx?: CanvasRenderingContext2D): ICanvasPosition;
    GetContext(): CanvasRenderingContext2D | Path2D | null;
    GetSurfaceContext(): CanvasRenderingContext2D | null;
    GetSurfaceSize(): ICanvasSize;
    GetSize(ctx: CanvasRenderingContext2D | null): ICanvasSize;
    GetFixedSize(ctx: CanvasRenderingContext2D | null): ICanvasSize;
    GetRect(ctx: CanvasRenderingContext2D | null): ICanvasRect;
    OffsetPosition(position: ICanvasPosition, source: ICanvasFigure | null, ctx?: CanvasRenderingContext2D): ICanvasPosition;
    ContainsPoint(point: ICanvasPosition, ctx: CanvasRenderingContext2D): boolean;
    FindChildWithPoint(point: ICanvasPosition, ctx: CanvasRenderingContext2D): ICanvasFigure | null;
    GetTransformScale(): ICanvasScaleValue;
}

export interface ICanvasShape extends ICanvasFigure{
    GetShapeChildren(): Array<ICanvasShape>;
    Paint(ctx: CanvasRenderingContext2D | Path2D): void;
}

export type CanvasBodyDirection = '' | 'n' | 'nw' | 'w' | 'sw' | 's' | 'se' | 'e' | 'ne';
export type CanvasBodyOrientation = 'horizontal' | 'vertical' | 'none';
export type CanvasBodyCollisionSide = 'top' | 'right' | 'bottom' | 'left' | 'edge';
