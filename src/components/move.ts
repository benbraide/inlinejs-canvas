import { RegisterCustomElement } from "@benbraide/inlinejs-element";
import { CanvasShapeElement } from "./shape";

export class CanvasMoveElement extends CanvasShapeElement{
    public constructor(){
        super();
    }
    
    protected Render_(ctx: CanvasRenderingContext2D | Path2D){
        const position = this.GetUnscaledOffsetPosition_();
        ctx.moveTo(position.x, position.y);
    }
}

export function CanvasMoveCompact(){
    RegisterCustomElement(CanvasMoveElement, 'canvas-move');
}
