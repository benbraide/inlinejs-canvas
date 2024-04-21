import { ComputeDisplacement } from "../utilities/compute-displacement";
import { CallContextMethod, TryGuardContext } from "../utilities/context";
import { CanvasParentElement } from "./parent";
export class CanvasTransformElement extends CanvasParentElement {
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
        TryGuardContext(ctx, (ctx) => {
            this.Apply_(ctx);
            super.Render_(ctx);
        });
    }
    ComputeDisplacement_(point, ctx) {
        return ComputeDisplacement(this.GetOffsetPosition_(ctx), point);
    }
    Apply_(ctx) {
        this.Translate_(ctx);
    }
    FindFigureWithPoint_(point, ctx) {
        return super.FindFigureWithPoint(point, ctx);
    }
    Translate_(ctx, position) {
        position = (position || this.GetUnscaledOffsetPosition_(('save' in ctx) ? ctx : undefined));
        CallContextMethod(ctx, 'translate', position.x, position.y);
    }
}
