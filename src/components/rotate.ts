import { Property, RegisterCustomElement } from "@benbraide/inlinejs-element";
import { CanvasAlignmentType, ICanvasFigure, ICanvasPosition } from "../types";
import { CanvasTransformElement } from "./transform";
import { CallContextMethod } from "../utilities/context";
import { RotatePoint } from "../utilities/rotate-point";
import { ResolveAngle } from "../utilities/angle";

export class CanvasRotateElement extends CanvasTransformElement{
    @Property({ type: 'string' })
    public angle = '0';
    
    @Property({ type: 'string', spread: 'origin' })
    public horizontalOrigin: CanvasAlignmentType = 'start';

    @Property({ type: 'string', spread: 'origin' })
    public verticalOrigin: CanvasAlignmentType = 'start';
    
    public constructor(){
        super();
    }

    public OffsetPosition(position: ICanvasPosition, source: ICanvasFigure | null, ctx?: CanvasRenderingContext2D){
        return position;
    }

    protected ComputeDisplacement_(point: ICanvasPosition, ctx: CanvasRenderingContext2D){
        const origin = this.GetOriginPoint_(ctx);
        const translated = { x: (point.x - origin.x), y: (point.y - origin.y) };
        const rotated = RotatePoint(translated, -ResolveAngle(this.angle));
        const final = { x: (rotated.x + origin.x), y: (rotated.y + origin.y) };
        
        return super.ComputeDisplacement_(final, ctx);
    }
    
    protected Apply_(ctx: CanvasRenderingContext2D | Path2D){
        super.Apply_(ctx);

        const size = this.GetChildSize_(('save' in ctx) ? ctx : null);
        const getOriginOffset = (origin: CanvasAlignmentType, size: number) => {
            return ((origin === 'center') ? (size / 2) : ((origin === 'end') ? size : 0));
        };

        const originOffset = {
            x: getOriginOffset(this.horizontalOrigin, size.width),
            y: getOriginOffset(this.verticalOrigin, size.height),
        };

        CallContextMethod(ctx, 'translate', originOffset.x, originOffset.y);
        CallContextMethod(ctx, 'rotate', ResolveAngle(this.angle));
        CallContextMethod(ctx, 'translate', -originOffset.x, -originOffset.y);
    }

    protected GetOriginPoint_(ctx: CanvasRenderingContext2D | null){
        const position = this.GetUnscaledOffsetPosition_(ctx || undefined);
        const size = this.GetChildSize_(ctx);
        
        const getOriginOffset = (origin: CanvasAlignmentType, size: number) => {
            return ((origin === 'center') ? (size / 2) : ((origin === 'end') ? size : 0));
        };

        return {
            x: (position.x + getOriginOffset(this.horizontalOrigin, size.width)),
            y: (position.y + getOriginOffset(this.verticalOrigin, size.height)),
        };
    }
}

export function CanvasRotateCompact(){
    RegisterCustomElement(CanvasRotateElement, 'canvas-rotate');
}
