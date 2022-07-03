import { GetGlobal } from "@benbraide/inlinejs";
import { CanvasTransform } from "./transform";

export class CanvasRotate extends CanvasTransform{
    public constructor(){
        super({
            angle: 0,
        });
    }

    protected Cast_(name: string, value: any){
        return ((name === 'angle' && typeof value === 'string' && /^.+deg$/.test(value)) ? ((Math.PI / 180) * (parseFloat(value.substring(0, (value.length - 3))) || 0)) : super.Cast_(name, value));
    }
    
    protected Apply_(ctx: CanvasRenderingContext2D | Path2D){
        ('translate' in ctx) && this.Translate_(ctx);
        ('rotate' in ctx) && ctx.rotate(this.state_.angle);
    }
}

export function CanvasRotateCompact(){
    customElements.define(GetGlobal().GetConfig().GetDirectiveName('canvas-rotate'), CanvasRotate);
}
