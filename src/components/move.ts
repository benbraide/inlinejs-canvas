import { GetGlobal } from "@benbraide/inlinejs";
import { CanvasShape } from "./shape";

export class CanvasMove extends CanvasShape{
    protected Render_(ctx: CanvasRenderingContext2D | Path2D){
        let position = this.GetUnscaledOffsetPosition_();
        ctx.moveTo(position.x, position.y);
    }
}

export function CanvasMoveCompact(){
    customElements.define(GetGlobal().GetConfig().GetDirectiveName('canvas-move'), CanvasMove);
}
