import { RegisterCustomElement } from "@benbraide/inlinejs-element";
import { CanvasShapeElement } from "./shape";

export class CanvasLineElement extends CanvasShapeElement{
    public constructor(){
        super();
    }
    
    protected Render_(ctx: CanvasRenderingContext2D | Path2D){
        const position = this.GetOffsetPosition_(('stroke' in ctx) ? ctx : undefined);
        ctx.lineTo(position.x, position.y);
    }
}

export function CanvasLineCompact(){
    RegisterCustomElement(CanvasLineElement, 'canvas-line');
}
