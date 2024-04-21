import { ICanvasSize } from "../types";
import { CanvasPathElement } from "./path";

import { Property, RegisterCustomElement } from "@benbraide/inlinejs-element";

export class CanvasCircleElement extends CanvasPathElement{
    @Property({ type: 'number' })
    public radius = 0;
    
    public constructor(){
        super();
    }

    public GetSize(ctx: CanvasRenderingContext2D | null): ICanvasSize{
        return {
            width: (this.radius * 2),
            height: (this.radius * 2),
        };
    }

    public GetRadius(){
        return this.radius;
    }
    
    protected Fill_(){
        let position = this.GetUnscaledOffsetPosition_();
        this.ctx_ = new Path2D;
        this.ctx_.arc((position.x + this.radius), (position.y + this.radius), this.radius, 0, (Math.PI * 2), false);
    }
}

export function CanvasCircleCompact(){
    RegisterCustomElement(CanvasCircleElement, 'canvas-circle');
}
