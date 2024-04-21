import { Property, RegisterCustomElement } from "@benbraide/inlinejs-element";
import { ICanvasSize } from "../types";
import { CanvasPathElement } from "./path";
import { ResolveAngle } from "../utilities/angle";

export class CanvasEllipseElement extends CanvasPathElement{
    @Property({ type: 'number', spread: 'radius' })
    public xRadius = 0;

    @Property({ type: 'number', spread: 'radius' })
    public yRadius = 0;

    @Property({ type: 'string' })
    public angle = '0';
    
    public constructor(){
        super();
    }

    public GetSize(ctx: CanvasRenderingContext2D | null): ICanvasSize{
        return {
            width: (this.xRadius * 2),
            height: (this.yRadius * 2),
        };
    }

    public GetFixedSize(ctx: CanvasRenderingContext2D | null): ICanvasSize{
        return this.GetSize(ctx);
    }
    
    protected Fill_(){
        const position = this.GetUnscaledOffsetPosition_();
        (this.ctx_ = new Path2D).ellipse(
            (position.x + this.xRadius),
            (position.y + this.yRadius),
            this.xRadius,
            this.yRadius,
            ResolveAngle(this.angle),
            0,
            (Math.PI * 2),
        );
    }
}

export function CanvasEllipseCompact(){
    RegisterCustomElement(CanvasEllipseElement, 'canvas-ellipse');
}
