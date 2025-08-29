"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FillOrStrokeContext = exports.CallContextMethod = exports.AssignContextValue = exports.TryGuardContext = exports.GuardContext = void 0;
const inlinejs_1 = require("@benbraide/inlinejs");
function GuardContext(ctx, callback) {
    ctx.save();
    (0, inlinejs_1.JournalTry)(() => callback(ctx), 'Canvas.GuardContext');
    ctx.restore();
}
exports.GuardContext = GuardContext;
function TryGuardContext(ctx, callback) {
    ('save' in ctx) && ctx.save();
    (0, inlinejs_1.JournalTry)(() => callback(ctx), 'Canvas.TryGuardContext');
    ('restore' in ctx) && ctx.restore();
}
exports.TryGuardContext = TryGuardContext;
function AssignContextValue(ctx, key, value) {
    (key in ctx) && (ctx[key] = value);
}
exports.AssignContextValue = AssignContextValue;
function CallContextMethod(ctx, key, ...params) {
    return ((key in ctx) ? (ctx[key](...params)) : undefined);
}
exports.CallContextMethod = CallContextMethod;
function FillOrStrokeContext(ctx, mode, color, path) {
    if ((mode === 'fill' || mode === 'both') && 'fillStyle' in ctx) {
        ctx.fillStyle = (color || 'black');
        path ? ctx.fill(path) : ctx.fill();
    }
    if ((mode === 'stroke' || mode === 'both') && 'strokeStyle' in ctx) {
        ctx.strokeStyle = (color || 'black');
        path ? ctx.stroke(path) : ctx.stroke();
    }
}
exports.FillOrStrokeContext = FillOrStrokeContext;
