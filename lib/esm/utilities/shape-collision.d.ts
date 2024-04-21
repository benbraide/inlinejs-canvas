import { ICanvasRect, ICanvasCircle, CanvasBodyDirectionType } from "../types";
export declare function CheckRectangleCollision(rect1: ICanvasRect, rect2: ICanvasRect, includeTouch?: boolean): boolean;
export declare function CheckCircleCollision(circle1: ICanvasCircle, circle2: ICanvasCircle, includeTouch?: boolean): boolean;
export declare function CheckRectangleCircleCollision(rect: ICanvasRect, circle: ICanvasCircle, includeTouch?: boolean): boolean;
export declare function GetIntersectionRectangle(rect1: ICanvasRect, rect2: ICanvasRect, includeTouch?: boolean): ICanvasRect | null;
export declare function GetIntersectionDirection(intersection: ICanvasRect, rect: ICanvasRect): CanvasBodyDirectionType;
