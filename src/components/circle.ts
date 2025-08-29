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
            width: (Math.abs(this.radius) * 2),
            height: (Math.abs(this.radius) * 2),
        };
    }

    public GetRadius(){
        return Math.abs(this.radius);
    }
    
    protected Fill_(){
        let position = this.GetUnscaledOffsetPosition_();
        const radius = Math.abs(this.radius);
        this.ctx_ = new Path2D;
        this.ctx_.arc((position.x + radius), (position.y + radius), radius, 0, (Math.PI * 2), false);
    }
}

export function CanvasCircleCompact(){
    RegisterCustomElement(CanvasCircleElement, 'canvas-circle');
}
