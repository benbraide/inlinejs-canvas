import { JournalTry } from "@benbraide/inlinejs";
export function GuardContext(ctx, callback) {
    ctx.save();
    JournalTry(() => callback(ctx), 'Canvas.GuardContext');
    ctx.restore();
}
export function TryGuardContext(ctx, callback) {
    ('save' in ctx) && ctx.save();
    JournalTry(() => callback(ctx), 'Canvas.TryGuardContext');
    ('restore' in ctx) && ctx.restore();
}
export function AssignContextValue(ctx, key, value) {
    (key in ctx) && (ctx[key] = value);
}
export function CallContextMethod(ctx, key, ...params) {
    return ((key in ctx) ? (ctx[key](...params)) : undefined);
}
export function FillOrStrokeContext(ctx, mode, color, path) {
    if ((mode === 'fill' || mode === 'both') && 'fillStyle' in ctx) {
        ctx.fillStyle = (color || 'black');
        path ? ctx.fill(path) : ctx.fill();
    }
    if ((mode === 'stroke' || mode === 'both') && 'strokeStyle' in ctx) {
        ctx.strokeStyle = (color || 'black');
        path ? ctx.stroke(path) : ctx.stroke();
    }
}
