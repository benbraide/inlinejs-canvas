import { GetGlobal } from "@benbraide/inlinejs";
import { CanvasAlignmentType, ICanvasFigure, ICanvasPosition } from "../types";
import { CanvasTransform } from "./transform";

export class CanvasRotate extends CanvasTransform{
    public constructor(){
        super({
            angle: 0,
            alignment: { horizontal: <CanvasAlignmentType>'start', vertical: <CanvasAlignmentType>'start' },
        });
    }

    public OffsetPosition(position: ICanvasPosition, source: ICanvasFigure | null, ctx?: CanvasRenderingContext2D){
        if (this.state_.alignment.horizontal === 'start' && this.state_.alignment.vertical === 'start'){
            return position;
        }

        let size = this.GetChildSize_(ctx || null), offsetValue = (alignment: CanvasAlignmentType, value: number, size: number) => {
            if (alignment === 'center'){
                return (value - (size / 2));
            }

            if (alignment === 'end'){
                return (value - size);
            }

            return value;
        };
        
        return {
            x: offsetValue(this.state_.alignment.horizontal, position.x, size.width),
            y: offsetValue(this.state_.alignment.vertical, position.y, size.height),
        };
    }

    protected Cast_(name: string, value: any){
        return ((name === 'angle' && typeof value === 'string' && /^.+deg$/.test(value)) ? ((Math.PI / 180) * (parseFloat(value.substring(0, (value.length - 3))) || 0)) : super.Cast_(name, value));
    }
    
    protected Apply_(ctx: CanvasRenderingContext2D | Path2D){
        this.Translate_(ctx);
        ('rotate' in ctx) && ctx.rotate(this.state_.angle);
    }
}

export function CanvasRotateCompact(){
    customElements.define(GetGlobal().GetConfig().GetDirectiveName('canvas-rotate'), CanvasRotate);
}
