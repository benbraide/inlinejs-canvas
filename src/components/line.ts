import { GetGlobal } from "@benbraide/inlinejs";
import { CanvasShape } from "./shape";

export class CanvasLine extends CanvasShape{
    public constructor(){
        super({
            size: { width: 0, height: 0 },
            cap: <CanvasLineCap>'butt',
            join: <CanvasLineJoin>'miter',
        });
    }
    
    protected Render_(ctx: CanvasRenderingContext2D | Path2D){
        ('lineWidth' in ctx) && (ctx.lineWidth = this.state_.size.width);
        ('lineCap' in ctx) && (ctx.lineCap = this.state_.cap);
        ('lineJoin' in ctx) && (ctx.lineJoin = this.state_.cap);
        
        let position = this.GetOffsetPosition_();
        ctx.lineTo(position.x, position.y);
    }
}

export function CanvasLineCompact(){
    customElements.define(GetGlobal().GetConfig().GetDirectiveName('canvas-line'), CanvasLine);
}
