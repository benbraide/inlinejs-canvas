import { Property, RegisterCustomElement } from "@benbraide/inlinejs-element";
import { CanvasFullShapeElement } from "./full-shape";

export class CanvasArcElement extends CanvasFullShapeElement{
    @Property({ type: 'number' })
    public radius = 0;
    
    public constructor(){
        super();
    }

    protected Paint_(ctx: CanvasRenderingContext2D | Path2D){
        this.Render_(ctx);
    }
    
    protected Render_(ctx: CanvasRenderingContext2D | Path2D){
        const position = this.GetUnscaledOffsetPosition_();
        ctx.arcTo(position.x, position.y, (position.x + this.width), (position.y + this.height), this.radius);
    }
}

export function CanvasArcCompact(){
    RegisterCustomElement(CanvasArcElement, 'canvas-arc');
}
