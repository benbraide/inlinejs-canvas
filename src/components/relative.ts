import { Property, RegisterCustomElement } from "@benbraide/inlinejs-element";

import { CanvasParentElement } from "./parent";
import { ICanvasFigure, ICanvasPosition } from "../types";
import { CanvasShapeElement } from "./shape";

export class CanvasRelativeElement extends CanvasParentElement{
    @Property({ type: 'string' })
    public direction: 'row' | 'column' = 'row';

    public GetPosition(): ICanvasPosition{
        return this.ApplyOffset_(super.GetPosition());
    }

    public GetOffsetPosition(ctx?: CanvasRenderingContext2D): ICanvasPosition{
        return this.ApplyOffset_(super.GetOffsetPosition(ctx));
    }

    protected OffsetPosition_(position: ICanvasPosition, source: ICanvasFigure | null, ctx?: CanvasRenderingContext2D): ICanvasPosition{
        return this.ApplyOffset_(super.OffsetPosition_({
            x: position.x + this.x,
            y: position.y + this.y,
        }, source, ctx), ctx);
    }

    protected ApplyOffset_(position: ICanvasPosition, ctx?: CanvasRenderingContext2D): ICanvasPosition{
        if (!this.parentElement){
            return position;
        }
        
        let previous: CanvasShapeElement | null = null;
        for (const child of this.parentElement.children){
            if (child === this){
                break;
            }
            
            if (child instanceof CanvasShapeElement){
                previous = child;
            }
        }

        const isRow = this.direction === 'row';
        
        if (previous){
            const previousPosition = previous.GetPosition();
            const previousSize = previous.GetSize(ctx || null);

            if (isRow){
                position.x += previousPosition.x + previousSize.width;
                position.y += previousPosition.y;
            }
            else{
                position.y += previousPosition.y + previousSize.height;
                position.x += previousPosition.x;
            }
        }

        return position;
    }
}

export function CanvasRelativeCompact(){
    RegisterCustomElement(CanvasRelativeElement, 'canvas-relative');
}
