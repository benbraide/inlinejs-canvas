import { Property, RegisterCustomElement } from "@benbraide/inlinejs-element";
import { CanvasPathElement } from "./path";

export class CanvasRoundRectElement extends CanvasPathElement{
    @Property({ type: 'number', spread: 'size' })
    public width = 0;

    @Property({ type: 'number', spread: 'size' })
    public height = 0;

    @Property({ type: 'number' })
    public radius = 0;
    
    public constructor(){
        super();
    }
    
    protected Draw_(){
        if (!this.ctx_){
            return;
        }
        
        const { x, y } = this.GetUnscaledOffsetPosition_();
        const { width, height, radius } = this;

        this.ctx_.moveTo(x + radius, y);
        this.ctx_.arcTo(x + width, y,   x + width, y + height, radius);
        this.ctx_.arcTo(x + width, y + height, x, y + height, radius);
        this.ctx_.arcTo(x, y + height, x, y,   radius);
        this.ctx_.arcTo(x, y,   x + width, y,   radius);
    }
}

export function CanvasRoundRectCompact(){
    RegisterCustomElement(CanvasRoundRectElement, 'canvas-round-rect');
}
