import { GetGlobal } from "@benbraide/inlinejs";
import { CanvasShape } from "./shape";

export class CanvasLine extends CanvasShape{
    protected Render_(ctx: CanvasRenderingContext2D | Path2D){
        let position = this.GetOffsetPosition_();
        ctx.lineTo(position.x, position.y);
    }
}

export function CanvasLineCompact(){
    customElements.define(GetGlobal().GetConfig().GetDirectiveName('canvas-line'), CanvasLine);
}
