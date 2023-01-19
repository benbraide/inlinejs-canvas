"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasTransform = void 0;
const compute_displacement_1 = require("../utilities/compute-displacement");
const rotate_point_1 = require("../utilities/rotate-point");
const parent_1 = require("./parent");
class CanvasTransform extends parent_1.CanvasParent {
    constructor(state) {
        super(state);
    }
    FindChildWithPoint(point, ctx) {
        let position;
        if ('angle' in this.state_) {
            position = (0, compute_displacement_1.ComputeDisplacement)((0, rotate_point_1.RotatePoint)(this.GetOffsetPosition_(ctx), this.state_.angle), (0, rotate_point_1.RotatePoint)(point, this.state_.angle));
        }
        else {
            position = (0, compute_displacement_1.ComputeDisplacement)(this.GetOffsetPosition_(ctx), point);
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
exports.CanvasTransform = CanvasTransform;
