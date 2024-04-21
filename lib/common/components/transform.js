"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasTransformElement = void 0;
const compute_displacement_1 = require("../utilities/compute-displacement");
const context_1 = require("../utilities/context");
const parent_1 = require("./parent");
class CanvasTransformElement extends parent_1.CanvasParentElement {
    constructor() {
        super();
    }
    FindFigureWithPoint(point, ctx) {
        return this.FindFigureWithPoint_(this.ComputeDisplacement_(point, ctx), ctx);
    }
    OffsetPosition(position, source, ctx) {
        return position;
    }
    Render_(ctx) {
        (0, context_1.TryGuardContext)(ctx, (ctx) => {
            this.Apply_(ctx);
            super.Render_(ctx);
        });
    }
    ComputeDisplacement_(point, ctx) {
        return (0, compute_displacement_1.ComputeDisplacement)(this.GetOffsetPosition_(ctx), point);
    }
    Apply_(ctx) {
        this.Translate_(ctx);
    }
    FindFigureWithPoint_(point, ctx) {
        return super.FindFigureWithPoint(point, ctx);
    }
    Translate_(ctx, position) {
        position = (position || this.GetUnscaledOffsetPosition_(('save' in ctx) ? ctx : undefined));
        (0, context_1.CallContextMethod)(ctx, 'translate', position.x, position.y);
    }
}
exports.CanvasTransformElement = CanvasTransformElement;
