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
    ('save' in ctx) && ctx.restore();
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
    if (mode === 'stroke' && 'strokeStyle' in ctx) {
        ctx.strokeStyle = (color || 'black');
        path ? ctx.stroke(path) : ctx.stroke();
    }
    else if (mode !== 'stroke' && 'fillStyle' in ctx) {
        ctx.fillStyle = (color || 'black');
        path ? ctx.fill(path) : ctx.fill();
    }
    else {
        return false;
    }
    return true;
}
exports.FillOrStrokeContext = FillOrStrokeContext;
