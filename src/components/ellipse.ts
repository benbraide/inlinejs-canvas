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
        const angle = ResolveAngle(this.angle);
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const xRadius = Math.abs(this.xRadius);
        const yRadius = Math.abs(this.yRadius);

        return {
            width: (2 * Math.sqrt(Math.pow(xRadius * cos, 2) + Math.pow(yRadius * sin, 2))),
            height: (2 * Math.sqrt(Math.pow(xRadius * sin, 2) + Math.pow(yRadius * cos, 2))),
        };
    }

    public GetFixedSize(ctx: CanvasRenderingContext2D | null): ICanvasSize{
        return this.GetSize(ctx);
    }
    
    protected Fill_(){
        const position = this.GetUnscaledOffsetPosition_();
        const xRadius = Math.abs(this.xRadius);
        const yRadius = Math.abs(this.yRadius);
        (this.ctx_ = new Path2D).ellipse(
            (position.x + xRadius),
            (position.y + yRadius),
            xRadius,
            yRadius,
            ResolveAngle(this.angle),
            0,
            (Math.PI * 2),
        );
    }
}

export function CanvasEllipseCompact(){
    RegisterCustomElement(CanvasEllipseElement, 'canvas-ellipse');
}
