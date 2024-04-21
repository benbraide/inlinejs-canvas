import { IElementScopeCreatedCallbackParams } from "@benbraide/inlinejs";
import { Property, RegisterCustomElement } from "@benbraide/inlinejs-element";
import { ICanvasSize } from "../types";
import { CanvasFullShapeElement } from "./full-shape";

export class CanvasImageElement extends CanvasFullShapeElement{
    protected object_: HTMLImageElement | null = new Image;
    protected size_ = { width: '', height: 'auto' };

    @Property({ type: 'string' })
    public src = '';

    @Property({ type: 'string' })
    public UpdateWidthProperty(value: string){
        this.size_.width = value;
    }

    @Property({ type: 'string' })
    public UpdateHeightProperty(value: string){
        this.size_.height = value;
    }
    
    public constructor(){
        super();
    }

    protected HandleElementScopeCreated_({ scope, ...rest }: IElementScopeCreatedCallbackParams, postAttributesCallback?: (() => void) | undefined): void {
        super.HandleElementScopeCreated_({ scope, ...rest }, postAttributesCallback);
        scope.AddUninitCallback(() => (this.object_ = null));
    }

    protected AttributeChanged_(name: string){
        super.AttributeChanged_(name);
        (name === 'src') && this.object_ && (this.object_.src = this.src);
    }

    protected ShouldRefreshOnChange_(name: string){
        return (name !== 'src');
    }
    
    protected Render_(ctx: CanvasRenderingContext2D | Path2D){
        if (this.object_ && ('drawImage' in ctx)){
            const position = this.GetUnscaledOffsetPosition_(), size = this.ResolveSize_();
            ctx.drawImage(this.object_, position.x, position.y, size.width, size.height);
        }
        else if (!this.object_ && this.src){
            (this.object_ = new Image).addEventListener('load', () => this.Refresh());
            this.object_.src = this.src;
        }
    }

    protected ResolveSize_(): ICanvasSize{
        if (!this.object_){
            return { width: 0, height: 0 };
        }

        let aspectRatio = (this.object_.width / this.object_.height), width = 0, height = 0;
        if (this.size_.width === 'auto'){
            height = this.ResolvePart_(this.size_.height, this.object_.height, this.object_.width, aspectRatio);
            width = this.ResolvePart_(this.size_.width, this.object_.width, height, aspectRatio);
        }
        else{
            width = this.ResolvePart_(this.size_.width, this.object_.width, this.object_.height, aspectRatio);
            height = this.ResolvePart_(this.size_.height, this.object_.height, width, aspectRatio);
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
    RegisterCustomElement(CanvasImageElement, 'canvas-image');
}
