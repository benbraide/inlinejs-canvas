import { Property, RegisterCustomElement } from "@benbraide/inlinejs-element";
import { ICanvasPosition, ICanvasSize } from "../types";
import { TestPoint } from "../utilities/test-point";
import { CanvasFullShapeElement } from "./full-shape";
import { AssignContextValue, GuardContext, TryGuardContext } from "../utilities/context";
import { IElementScopeCreatedCallbackParams } from "@benbraide/inlinejs";

export class CanvasTextElement extends CanvasFullShapeElement{
    protected observer_: globalThis.MutationObserver | null = null;
    
    protected font_ = '';
    protected size_: ICanvasSize | null = null;

    @Property({ type: 'string', spread: 'font' })
    public fontFamily = 'sans-serif';

    @Property({ type: 'string', spread: 'font' })
    public fontSize = '1rem';

    @Property({ type: 'string', spread: 'font' })
    public fontStyle = 'normal';

    @Property({ type: 'string', spread: 'font' })
    public fontWeight = 'normal';
    
    @Property({ type: 'string', spread: 'font' })
    public lineHeight = 'normal';

    @Property({ type: 'string' })
    public align: CanvasTextAlign = 'left';

    @Property({ type: 'string' })
    public baseline: CanvasTextBaseline = 'top';

    @Property({ type: 'string' })
    public direction: CanvasDirection = 'inherit';

    @Property({ type: 'string' })
    public value = '';

    @Property({ type: 'boolean' })
    public cache = true;
    
    public constructor(){
        super();
    }

    public GetSize(ctx: CanvasRenderingContext2D | null): ICanvasSize{
        if (this.size_){
            return { ...this.size_ };
        }
        
        let size: ICanvasSize = { width: 0, height: 0 };
        if (!ctx){
            return size;
        }

        GuardContext(ctx, (ctx) => {
            this.ApplyStyles_(ctx);
            const metrics = ctx.measureText(this.ComputeValue_());
            size = {
                width: metrics.width,
                height: (metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent),
            };
            this.cache && this.value.trim() && (this.size_ = { ...size });
        });
        
        return size;
    }

    public ContainsPoint(point: ICanvasPosition, ctx: CanvasRenderingContext2D){
        return TestPoint(point, this.GetOffsetPosition_(ctx), this.GetSize(ctx), this.GetTransformScale());
    }

    protected HandleElementScopeCreated_({ scope, ...rest }: IElementScopeCreatedCallbackParams, postAttributesCallback?: (() => void) | undefined){
        super.HandleElementScopeCreated_({ scope, ...rest }, postAttributesCallback);
        
        if (globalThis.MutationObserver){
            this.observer_ = new globalThis.MutationObserver(() => (!this.value.trim() && this.Refresh_()));
            this.observer_.observe(this, { childList: true, subtree: true, characterData: true });
        }

        scope.AddUninitCallback(() => {
            this.observer_?.disconnect();
            this.observer_ = null;
        });
    }
    
    protected Render_(ctx: CanvasRenderingContext2D | Path2D){
        TryGuardContext(ctx, (ctx) => {
            this.ApplyStyles_(ctx);
        
            let position = this.GetUnscaledOffsetPosition_(('stroke' in ctx) ? ctx : undefined);
            if (this.mode === 'stroke' && 'strokeText' in ctx){
                ctx.strokeText(this.ComputeValue_(), position.x, position.y, (this.width || undefined));
            }
            else if (this.mode !== 'stroke' && 'fillText' in ctx){
                ctx.fillText(this.ComputeValue_(), position.x, position.y, (this.width || undefined));
            }
        });
    }

    protected AttributeChanged_(name: string){
        super.AttributeChanged_(name);
        ('font' in this.spreads_) && this.spreads_.font.includes(name) && (this.font_ = '');
        (name === 'value' || name === 'cache') && (this.size_ = null);
    }

    protected ShouldRefreshOnChange_(name: string){
        return (name !== 'cache');
    }

    protected ApplyStyles_(ctx: CanvasRenderingContext2D | Path2D){
        AssignContextValue(ctx, 'font', (this.font_ = (this.font_ || this.ComputeFont_())));
        AssignContextValue(ctx, 'textAlign', this.align);
        AssignContextValue(ctx, 'textBaseline', this.baseline);
        AssignContextValue(ctx, 'direction', this.direction);
    }

    protected ComputeFont_(){
        let parts = new Array<string>();

        parts.push((this.lineHeight === 'normal') ? this.fontSize : `${this.fontSize}/${this.lineHeight}`);
        parts.push(this.fontFamily || 'san-serif');

        (this.fontStyle !== 'normal') && parts.push(this.fontStyle);
        (this.fontWeight !== 'normal') && parts.push(this.fontWeight);

        this.size_ = null;
        
        return parts.join(' ');
    }

    protected ComputeValue_(){
        return (this.value || this.textContent || '').trim();
    }
}

export function CanvasTextCompact(){
    RegisterCustomElement(CanvasTextElement, 'canvas-text');
}
