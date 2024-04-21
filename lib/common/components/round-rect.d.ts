import { CanvasPathElement } from "./path";
import { ICanvasPosition, ICanvasSize } from "../types";
interface ICanvasRoundRectPart {
    position: ICanvasPosition;
    size: ICanvasSize;
}
interface ICanvasRoundRectParts {
    topLeft: ICanvasRoundRectPart;
    topRight: ICanvasRoundRectPart;
    bottomRight: ICanvasRoundRectPart;
    bottomLeft: ICanvasRoundRectPart;
}
export declare class CanvasRoundRectElement extends CanvasPathElement {
    protected parts_: ICanvasRoundRectParts | null;
    width: number;
    height: number;
    radius: number;
    constructor();
    protected AttributeChanged_(name: string): void;
    protected Draw_(): void;
    protected ResolveParts_(): {
        topLeft: {
            position: {
                x: number;
                y: number;
            };
            size: {
                width: number;
                height: number;
            };
        };
        topRight: {
            position: {
                x: number;
                y: number;
            };
            size: {
                width: number;
                height: number;
            };
        };
        bottomRight: {
            position: {
                x: number;
                y: number;
            };
            size: {
                width: number;
                height: number;
            };
        };
        bottomLeft: {
            position: {
                x: number;
                y: number;
            };
            size: {
                width: number;
                height: number;
            };
        };
    };
}
export declare function CanvasRoundRectCompact(): void;
export {};
