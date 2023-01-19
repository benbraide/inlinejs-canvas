import { ComputeDisplacement } from "../utilities/compute-displacement";
import { RotatePoint } from "../utilities/rotate-point";
import { CanvasParent } from "./parent";
export class CanvasTransform extends CanvasParent {
    constructor(state) {
        super(state);
    }
    FindChildWithPoint(point, ctx) {
        let position;
        if ('angle' in this.state_) {
            position = ComputeDisplacement(RotatePoint(this.GetOffsetPosition_(ctx), this.state_.angle), RotatePoint(point, this.state_.angle));
        }
        else {
            position = ComputeDisplacement(this.GetOffsetPosition_(ctx), point);
        }
        return this.FindChildWithPoint_(position, ctx);
    }
    OffsetPosition(position, source, ctx) {
        return position;
    }
    Render_(ctx) {
        ('save' in ctx) && ctx.save();
        this.Apply_(ctx);
        super.Render_(ctx);
        ('restore' in ctx) && ctx.restore();
    }
    Apply_(ctx) { }
    FindChildWithPoint_(point, ctx) {
        for (let child of this.GetFigureChildren()) {
            let found = child.FindChildWithPoint(point, ctx);
            if (found) {
                return found;
            }
        }
        return null;
    }
    Translate_(ctx, position) {
        position = (position || this.GetUnscaledOffsetPosition_());
        ('translate' in ctx) && ctx.translate(position.x, position.y);
    }
}
