import { CanvasPaintModeType } from "../types";
export declare function GuardContext(ctx: CanvasRenderingContext2D, callback: (ctx: CanvasRenderingContext2D) => void): void;
export declare function TryGuardContext(ctx: CanvasRenderingContext2D | Path2D, callback: (ctx: CanvasRenderingContext2D | Path2D) => void): void;
export declare function AssignContextValue(ctx: CanvasRenderingContext2D | Path2D, key: string, value: any): void;
export declare function CallContextMethod<T = void>(ctx: CanvasRenderingContext2D | Path2D, key: string, ...params: any[]): T | undefined;
export declare function FillOrStrokeContext(ctx: CanvasRenderingContext2D | Path2D, mode: CanvasPaintModeType, color?: string, path?: Path2D): boolean;
