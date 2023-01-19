import { GetGlobal } from "@benbraide/inlinejs";
import { CanvasShape } from "./shape";
export class CanvasLine extends CanvasShape {
    Render_(ctx) {
        let position = this.GetOffsetPosition_(('stroke' in ctx) ? ctx : undefined);
        ctx.lineTo(position.x, position.y);
    }
}
export function CanvasLineCompact() {
    customElements.define(GetGlobal().GetConfig().GetElementName('canvas-line'), CanvasLine);
}
