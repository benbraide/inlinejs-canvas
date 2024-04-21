import { Property, RegisterCustomElement } from "@benbraide/inlinejs-element";
import { CanvasPathElement } from "./path";
import { ICanvasPosition, ICanvasSize } from "../types";

interface ICanvasRoundRectPart{
    position: ICanvasPosition;
    size: ICanvasSize;
}

interface ICanvasRoundRectParts{
    topLeft: ICanvasRoundRectPart;
    topRight: ICanvasRoundRectPart;
    bottomRight: ICanvasRoundRectPart;
    bottomLeft: ICanvasRoundRectPart;
}

export class CanvasRoundRectElement extends CanvasPathElement{
    protected parts_: ICanvasRoundRectParts | null = null;

    @Property({ type: 'number', spread: 'size' })
    public width = 0;

    @Property({ type: 'number', spread: 'size' })
    public height = 0;

    @Property({ type: 'number' })
    public radius = 0;
    
    public constructor(){
        super();
    }
    
    protected AttributeChanged_(name: string){
        super.AttributeChanged_(name);
        ['width', 'height', 'radius'].includes(name) && (this.parts_ = null);
    }

    protected Draw_(){
        if (!this.ctx_){
            return;
        }
        
        let unscaledPosition = this.GetUnscaledOffsetPosition_(), renderPart = ({ position, size }: ICanvasRoundRectPart) => {
            const computedPosition: ICanvasPosition = {
                x: (position.x + unscaledPosition.x),
                y: (position.y + unscaledPosition.y),
            };
            this.ctx_!.arcTo(computedPosition.x, computedPosition.y, (computedPosition.x + size.width), (computedPosition.y + size.height), this.radius);
        };

        this.ctx_.moveTo(unscaledPosition.x, (unscaledPosition.y + this.radius));
        this.parts_ = (this.parts_ || this.ResolveParts_());
        
        ['bottomLeft', 'bottomRight', 'topRight', 'topLeft'].forEach(key => renderPart(this.parts_![key]));
    }

    protected ResolveParts_(){
        return {
            topLeft: {
                position: { x: 0, y: 0 },
                size: { width: 0, height: this.radius },
            },
            topRight: {
                position: { x: this.width, y: 0 },
                size: { width: -this.radius, height: 0 },
            },
            bottomRight: {
                position: { x: this.width, y: this.height },
                size: { width: 0, height: -this.radius },
            },
            bottomLeft: {
                position: { x: 0, y: this.height },
                size: { width: this.radius, height: 0 },
            },
        };
    }
}

export function CanvasRoundRectCompact(){
    RegisterCustomElement(CanvasRoundRectElement, 'canvas-round-rect');
}
