import { GetGlobal } from "@benbraide/inlinejs";
import { CanvasPath } from "./path";

export class CanvasRoundRect extends CanvasPath{
    public constructor(){
        super({
            size: {
                width: 0,
                height: 0,
            },
            radius: 0,
        });

        this.append(document.createElement('x-canvas-arc'));//Top-Left
        this.append(document.createElement('x-canvas-arc'));//Top-Right
        this.append(document.createElement('x-canvas-arc'));//Bottom-Right
        this.append(document.createElement('x-canvas-arc'));//Bottom-Left

        this.state_.close = false;
        this.UpdateParts_(true);
    }
    
    protected AttributeChanged_(name: string){
        super.AttributeChanged_(name);
        ['size', 'width', 'height', 'radius'].includes(name) && this.UpdateParts_(name === 'radius');
    }

    protected UpdateParts_(radiusUpdated: boolean){
        let [topLeft, topRight, bottomRight, bottomLeft] = this.children;
        
        topLeft.setAttribute('position', `0 ${this.state_.size.height}`);
        radiusUpdated && topLeft.setAttribute('size', `${this.state_.radius} 0`);
        radiusUpdated && topLeft.setAttribute('radius', this.state_.radius.toString());
    
        topRight.setAttribute('position', `${this.state_.size.width} ${this.state_.size.height}`);
        radiusUpdated && topRight.setAttribute('size', `0 ${-this.state_.radius}`);
        radiusUpdated && topRight.setAttribute('radius', this.state_.radius.toString());

        bottomRight.setAttribute('position', `${this.state_.size.width} 0`);
        radiusUpdated && bottomRight.setAttribute('size', `${-this.state_.radius} 0`);
        radiusUpdated && bottomRight.setAttribute('radius', this.state_.radius.toString());

        bottomLeft.setAttribute('position', '0 0');
        radiusUpdated && bottomLeft.setAttribute('size', `0 ${this.state_.radius}`);
        radiusUpdated && bottomLeft.setAttribute('radius', this.state_.radius.toString());
    }
}

export function CanvasRoundRectCompact(){
    customElements.define(GetGlobal().GetConfig().GetElementName('canvas-round-rect'), CanvasRoundRect);
}
