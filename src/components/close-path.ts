import { GetGlobal } from "@benbraide/inlinejs";
import { CanvasShape } from "./shape";

export class CanvasClosePath extends CanvasShape{
    protected Render_(ctx: CanvasRenderingContext2D | Path2D){
        ctx.closePath();
    }
}

export function CanvasClosePathCompact(){
    customElements.define(GetGlobal().GetConfig().GetElementName('canvas-close-path'), CanvasClosePath);
}
