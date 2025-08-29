import { JournalTry } from "@benbraide/inlinejs";
import { ICanvasFigure, ICanvasPosition, ICanvasRect, ICanvasShape, ICanvasSize, ICanvasSurface } from "../types";
import { FindAncestorByFunction } from "../utilities/ancestor";
import { CanvasShapeElement } from "./shape";

export class CanvasParentElement extends CanvasShapeElement{
    public constructor(){
        super();
        this.options_.isTemplate = false;
    }

    public GetSize(ctx: CanvasRenderingContext2D | null): ICanvasSize{
        return this.GetChildSize_(ctx);
    }
    
    public FindFigureWithPoint(point: ICanvasPosition, ctx: CanvasRenderingContext2D){
        for (const child of this.GetFigureChildren()){
            const found = child.FindFigureWithPoint(point, ctx);
            if (found){
                return found;
            }
        }
        
        return null;
    }

    public OffsetPosition(position: ICanvasPosition, source: ICanvasFigure | null, ctx?: CanvasRenderingContext2D): ICanvasPosition{
        return this.OffsetPosition_(position, source, ctx);
    }
    
    protected Render_(ctx: CanvasRenderingContext2D | Path2D){
        if (FindAncestorByFunction<ICanvasSurface>(this, 'IsPriorityAware')?.IsPriorityAware()){
            const inPriority: Record<string, Array<ICanvasShape>> = {};
            this.GetShapeChildren().forEach((child) => {
                const priority = child.GetPriority();
                inPriority[priority] = (inPriority[priority] || []);
                inPriority[priority].push(child);
            });

            Object.keys(inPriority).sort((a, b) => (Number(a) - Number(b))).forEach((priority) => {
                inPriority[priority].forEach(child => JournalTry(() => child.Paint(ctx), 'Canvas.Render'));
            });
        }
        else{
            this.GetShapeChildren().forEach(child => child.Paint(ctx));
        }
    }

    protected OffsetPosition_(position: ICanvasPosition, source: ICanvasFigure | null, ctx?: CanvasRenderingContext2D): ICanvasPosition{
        const myPosition = this.GetOffsetPosition_(ctx);
        return {
            x: (position.x + myPosition.x),
            y: (position.y + myPosition.y),
        };
    }

    protected GetChildSize_(ctx: CanvasRenderingContext2D | null): ICanvasSize{
        let rect: ICanvasRect | null = null;
        for (const child of this.GetFigureChildren()){
            const childRect = { ...child.GetRect(ctx) };

            childRect.x = ((childRect.x < 0) ? 0 : childRect.x);
            childRect.y = ((childRect.y < 0) ? 0 : childRect.y);
            
            if (rect){//Union with previous
                const newX = Math.min(childRect.x, rect.x);
                const newY = Math.min(childRect.y, rect.y);
                
                rect = {
                    x: newX,
                    y: newY,
                    width: (Math.max(rect.x + rect.width, childRect.x + childRect.width) - newX),
                    height: (Math.max(rect.y + rect.height, childRect.y + childRect.height) - newY),
                };
            }
            else{//First child
                rect = childRect;
            }
        }

        return (rect ? { width: rect.width, height: rect.height } : { width: 0, height: 0 });
    }
}
