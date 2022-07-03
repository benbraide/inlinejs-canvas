import { CanvasTransform } from "./transform";
export declare class CanvasRotate extends CanvasTransform {
    constructor();
    protected Cast_(name: string, value: any): any;
    protected Apply_(ctx: CanvasRenderingContext2D | Path2D): void;
}
export declare function CanvasRotateCompact(): void;
