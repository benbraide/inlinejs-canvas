import { Property, RegisterCustomElement } from "@benbraide/inlinejs-element";
import { CanvasPaintModeType } from "../types";
import { CanvasParentElement } from "./parent";
import { AssignContextValue, CallContextMethod, FillOrStrokeContext, TryGuardContext } from "../utilities/context";

export class CanvasOpenPathElement extends CanvasParentElement{
    @Property({ type:'string' })
    public mode: CanvasPaintModeType = 'fill';

    @Property({ type:'string' })
    public color = '';

    @Property({ type:'boolean' })
    public close = false;

    @Property({ type:'number', spread: 'line' })
    public lineWidth = 1;

    @Property({ type:'string', spread: 'line' })
    public lineCap: CanvasLineCap = 'butt';

    @Property({ type:'string', spread: 'line' })
    public lineJoin: CanvasLineJoin = 'miter';
    
    public constructor(){
        super();
    }
    
    protected Render_(ctx: CanvasRenderingContext2D | Path2D){
        TryGuardContext(ctx, (ctx) => {
            const position = this.GetUnscaledOffsetPosition_();

            CallContextMethod(ctx, 'beginPath');
            ctx.moveTo(position.x, position.y);
            
            super.Render_(ctx);
            this.Project_(ctx);
        });
    }

    protected Project_(ctx: CanvasRenderingContext2D | Path2D){
        this.close && ctx.closePath();

        if (this.mode === 'stroke' || this.mode === 'both'){
            ['lineWidth', 'lineCap', 'lineJoin'].forEach(prop => AssignContextValue(ctx, prop, this[prop]));
            FillOrStrokeContext(ctx, 'stroke', this.color || 'black');
        }
        
        if (this.mode === 'fill' || this.mode === 'both'){
            FillOrStrokeContext(ctx, 'fill', this.color || 'black');
        }
    }
}

export function CanvasOpenPathCompact(){
    RegisterCustomElement(CanvasOpenPathElement, 'canvas-open-path');
}
