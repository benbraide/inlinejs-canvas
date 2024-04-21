import { JournalTry } from "@benbraide/inlinejs";
import { CanvasPaintModeType } from "../types";

export function GuardContext(ctx: CanvasRenderingContext2D, callback: (ctx: CanvasRenderingContext2D) => void){
    ctx.save();
    JournalTry(() => callback(ctx), 'Canvas.GuardContext');
    ctx.restore();
}

export function TryGuardContext(ctx: CanvasRenderingContext2D | Path2D, callback: (ctx: CanvasRenderingContext2D | Path2D) => void){
    ('save' in ctx) && ctx.save();
    JournalTry(() => callback(ctx), 'Canvas.TryGuardContext');
    ('save' in ctx) && ctx.restore();
}

export function AssignContextValue(ctx: CanvasRenderingContext2D | Path2D, key: string, value: any){
    (key in ctx) && (ctx[key] = value);
}

export function CallContextMethod<T = void>(ctx: CanvasRenderingContext2D | Path2D, key: string, ...params: any[]){
    return ((key in ctx) ? <T>(ctx[key](...params)) : undefined);
}

export function FillOrStrokeContext(ctx: CanvasRenderingContext2D | Path2D, mode: CanvasPaintModeType, color?: string, path?: Path2D){
    if (mode === 'stroke' && 'strokeStyle' in ctx){
        ctx.strokeStyle = (color || 'black');
        path ? ctx.stroke(path) : ctx.stroke();
    }
    else if (mode !== 'stroke' && 'fillStyle' in ctx){
        ctx.fillStyle = (color || 'black');
        path ? ctx.fill(path) : ctx.fill();
    }
    else{
        return false;
    }
    
    return true;
}
