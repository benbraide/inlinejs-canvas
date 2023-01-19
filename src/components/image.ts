import { GetGlobal } from "@benbraide/inlinejs";
import { ICanvasSize } from "../types";
import { CanvasFullShape } from "./full-shape";

export class CanvasImage extends CanvasFullShape{
    private object_: HTMLImageElement | null = null;
    
    public constructor(){
        super({
            src: '',
            size: {
                width: '',
                height: '',
            },
        });
    }

    protected AttributeChanged_(name: string){
        super.AttributeChanged_(name);
        if (name === 'src'){//Load image
            (this.object_ = new Image).addEventListener('load', () => this.Refresh_());
            this.object_.src = this.state_.src;
        }
    }
    
    protected Render_(ctx: CanvasRenderingContext2D | Path2D){
        if (this.object_){
            let position = this.GetUnscaledOffsetPosition_(), size = this.ResolveSize_();
            ('drawImage' in ctx) && ctx.drawImage(this.object_, position.x, position.y, size.width, size.height);
        }
    }

    protected ResolveSize_(): ICanvasSize{
        if (!this.object_){
            return { width: 0, height: 0 };
        }

        let aspectRatio = (this.object_.width / this.object_.height), width = 0, height = 0;
        if (this.state_.size.width === 'auto'){
            height = this.ResolvePart_(this.state_.size.height, this.object_.height, this.object_.width, aspectRatio);
            width = this.ResolvePart_(this.state_.size.width, this.object_.width, height, aspectRatio);
        }
        else{
            width = this.ResolvePart_(this.state_.size.width, this.object_.width, this.object_.height, aspectRatio);
            height = this.ResolvePart_(this.state_.size.height, this.object_.height, width, aspectRatio);
        }

        return { width, height };
    }

    protected ResolvePart_(value: string, target: number, otherValue: number, aspectRatio: number){
        if (value === 'auto'){//Use aspect ratio
            return (otherValue * aspectRatio);
        }
        
        if (/^.+%$/.test(value)){//Percentage
            return ((parseFloat(value.substring(0, (value.length - 1))) || 0) * target);
        }

        return (parseFloat(value) || target);
    }
}

export function CanvasImageCompact(){
    customElements.define(GetGlobal().GetConfig().GetElementName('canvas-image'), CanvasImage);
}
