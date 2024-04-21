import { Property, RegisterCustomElement } from "@benbraide/inlinejs-element";
import { CanvasAlignmentType, ICanvasFigure, ICanvasPosition } from "../types";
import { CanvasTransformElement } from "./transform";
import { CallContextMethod } from "../utilities/context";
import { ComputeDisplacement } from "../utilities/compute-displacement";
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
        if (this.horizontalOrigin === 'start' && this.verticalOrigin === 'start'){
            return position;
        }

        let size = this.GetChildSize_(ctx || null), offsetValue = (origin: CanvasAlignmentType, value: number, size: number) => {
            if (origin === 'center'){
                return (value - (size / 2));
            }

            if (origin === 'end'){
                return (value - size);
            }

            return value;
        };
        
        return {
            x: offsetValue(this.horizontalOrigin, position.x, size.width),
            y: offsetValue(this.verticalOrigin, position.y, size.height),
        };
    }

    protected ComputeDisplacement_(point: ICanvasPosition, ctx: CanvasRenderingContext2D){
        const angle = ResolveAngle(this.angle);
        return ComputeDisplacement(RotatePoint(this.GetOffsetPosition_(ctx), angle), RotatePoint(point, angle));
    }
    
    protected Apply_(ctx: CanvasRenderingContext2D | Path2D){
        super.Apply_(ctx);
        CallContextMethod(ctx, 'rotate', ResolveAngle(this.angle));
    }
}

export function CanvasRotateCompact(){
    RegisterCustomElement(CanvasRotateElement, 'canvas-rotate');
}
