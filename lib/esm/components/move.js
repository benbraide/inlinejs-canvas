import { GetGlobal } from "@benbraide/inlinejs";
import { CanvasShape } from "./shape";
export class CanvasMove extends CanvasShape {
    Render_(ctx) {
        let position = this.GetUnscaledOffsetPosition_();
        ctx.moveTo(position.x, position.y);
    }
}
export function CanvasMoveCompact() {
    customElements.define(GetGlobal().GetConfig().GetElementName('canvas-move'), CanvasMove);
}
