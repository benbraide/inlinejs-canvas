import { ICanvasPosition, ICanvasRect, ICanvasSize } from "../types";
import { CanvasShape } from "./shape";

export class CanvasParent extends CanvasShape{
    public constructor(state?: Record<string, any>){
        super(state);
    }

    public GetSize(ctx: CanvasRenderingContext2D | null): ICanvasSize{
        return this.GetChildSize_(ctx);
    }
    
    public FindChildWithPoint(point: ICanvasPosition, ctx: CanvasRenderingContext2D){
        for (let child of this.GetFigureChildren()){
            let found = child.FindChildWithPoint(point, ctx);
            if (found){
                return found;
            }
        }
        
        return null;
    }

    public OffsetPosition(position: ICanvasPosition): ICanvasPosition{
        return this.OffsetPosition_(position);
    }
    
    protected Render_(ctx: CanvasRenderingContext2D | Path2D){
        this.GetShapeChildren().forEach(child => child.Paint(ctx));
    }

    protected OffsetPosition_(position: ICanvasPosition): ICanvasPosition{
        let myPosition = this.GetOffsetPosition_();
        return {
            x: (position.x + myPosition.x),
            y: (position.y + myPosition.y),
        };
    }

    protected GetChildSize_(ctx: CanvasRenderingContext2D | null): ICanvasSize{
        let rect: ICanvasRect | null = null;
        for (let child of this.GetFigureChildren()){
            let childRect = child.GetRect(ctx);
            if (rect){//Union with previous
                rect = {
                    x: ((childRect.x < rect.x) ? childRect.x : rect.x),
                    y: ((childRect.y < rect.y) ? childRect.y : rect.y),
                    width: (((rect.x + rect.width) < (childRect.x + childRect.width)) ? (rect.width + (childRect.x + childRect.width) - (rect.x + rect.width)) : rect.width),
                    height: (((rect.y + rect.height) < (childRect.y + childRect.height)) ? (rect.height + (childRect.y + childRect.height) - (rect.y + rect.height)) : rect.height),
                };
            }
            else{//First child
                rect = childRect;
            }
        }

        return (rect ? { width: rect.width, height: rect.height } : { width: 0, height: 0 });
    }
}
