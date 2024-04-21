import { RegisterCustomElement } from "@benbraide/inlinejs-element";
import { CanvasShapeElement } from "./shape";

export class CanvasClosePathElement extends CanvasShapeElement{
    public constructor(){
        super();
    }
    
    protected Render_(ctx: CanvasRenderingContext2D | Path2D){
        ctx.closePath();
    }
}

export function CanvasClosePathCompact(){
    RegisterCustomElement(CanvasClosePathElement, 'canvas-close-path');
}
