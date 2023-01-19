import { GetGlobal } from "@benbraide/inlinejs";
import { CanvasShape } from "./shape";
export class CanvasClosePath extends CanvasShape {
    Render_(ctx) {
        ctx.closePath();
    }
}
export function CanvasClosePathCompact() {
    customElements.define(GetGlobal().GetConfig().GetElementName('canvas-close-path'), CanvasClosePath);
}
