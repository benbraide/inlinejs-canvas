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
        this.object_?.addEventListener('load', () => this.Refresh());
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
        if (!this.object_ || !this.object_.width || !this.object_.height){
            return { width: 0, height: 0 };
        }

        const aspectRatio = (this.object_.width / this.object_.height);
        let width = this.ResolvePart_(this.size_.width, this.object_.width);
        let height = this.ResolvePart_(this.size_.height, this.object_.height);

        if (this.size_.width === 'auto' && this.size_.height !== 'auto'){//Height is specified
            width = height * aspectRatio;
        }
        else if (this.size_.height === 'auto' && this.size_.width !== 'auto'){//Width is specified
            height = width / aspectRatio;
        }

        return { width, height };
    }

    protected ResolvePart_(value: string, target: number){
        if (value === 'auto') return target;

        if (/^.+%$/.test(value)){//Percentage
            return ((parseFloat(value.substring(0, (value.length - 1))) || 0) / 100 * target);
        }

        return (parseFloat(value) || target);
    }
}

export function CanvasImageCompact(){
    RegisterCustomElement(CanvasImageElement, 'canvas-image');
}
