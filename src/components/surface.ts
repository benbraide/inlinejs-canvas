import { IElementScopeCreatedCallbackParams, JournalTry, ToString } from "@benbraide/inlinejs";
import { CustomElement, Property, RegisterCustomElement } from '@benbraide/inlinejs-element';
import { ICanvasComponent, ICanvasFigure, ICanvasPosition, ICanvasShape, ICanvasSize, ICanvasSurface } from "../types";
import { FilterByFunction } from "../utilities/filter";
import { GuardContext } from "../utilities/context";

export class CanvasSurfaceElement extends CustomElement implements ICanvasSurface{
    protected shadow_: HTMLCanvasElement | null = null;
    protected ctx_: CanvasRenderingContext2D | null = null;
    
    protected withMouse_: Element | null = null;
    protected mouseOffset_: ICanvasPosition | null = null;

    protected rendered_ = false;
    protected queued_ = false;

    protected hidden_ = false;
    
    @Property({ type: 'boolean' })
    public vsync = false;

    @Property({ type: 'boolean' })
    public locked = false;

    @Property({ type: 'boolean' })
    public manual = false;

    @Property({ type: 'boolean' })
    public priorityAware = false;
    
    @Property({ type: 'boolean' })
    public UpdateHiddenProperty(value: boolean){
        this.hidden_ = value;
    }

    @Property({ type: 'number', spread: 'size' })
    public UpdateWidthProperty(value: number){
        this.style.width = `${value}px`;
        this.shadow_?.setAttribute('width', ToString(value));
        this.Refresh();
    }
    
    @Property({ type: 'number', spread: 'size' })
    public UpdateHeightProperty(value: number){
        this.style.height = `${value}px`;
        this.shadow_?.setAttribute('height', ToString(value));
        this.Refresh();
    }
    
    public constructor(){
        super();
        this.style.display = 'flex';
    }
    
    public GetComponentChildren(){
        return FilterByFunction<ICanvasComponent>(Array.from(this.children), 'GetComponentChildren');
    }

    public Render(){
        this.Render_();
    }

    public IsPriorityAware(){
        return this.priorityAware;
    }

    public Refresh(){
        if (this.rendered_ && !this.hidden_ && !this.manual){
            this.Render();
            if (this.mouseOffset_ && this.ctx_ && (!this.withMouse_ || !(this.withMouse_ as unknown as ICanvasFigure).ContainsPoint(this.mouseOffset_, this.ctx_))){
                this.UpdateWithMouse_(this.FindWithMouse_());
            }
        }
    }

    public GetContext(){
        return this.ctx_;
    }

    public GetSurfaceContext(){
        return this.ctx_;
    }

    public GetSurfaceSize(): ICanvasSize{
        return this.GetSize();
    }
    
    public GetSize(): ICanvasSize{
        return {
            width: (this.shadow_?.width || 0),
            height: (this.shadow_?.height || 0),
        };
    }

    public GetFixedSize(): ICanvasSize{
        return this.GetSize();
    }

    public GetNative(){
        return this.shadow_;
    }

    public GetBlob(type = 'image/png'){
        return (this.shadow_ ? new Promise<Blob | null>(resolve => this.shadow_!.toBlob(blob => resolve(blob), type)) : null);
    }

    public GetDataUrl(type = 'image/png'){
        return (this.shadow_ ? this.shadow_.toDataURL(type) : '');
    }

    protected HandleElementScopeCreated_({ scope, ...rest }: IElementScopeCreatedCallbackParams, postAttributesCallback?: (() => void) | undefined){
        super.HandleElementScopeCreated_({ scope, ...rest }, postAttributesCallback);
        
        scope.AddUninitCallback(() => (this.shadow_ = null));
        scope.AddPostProcessCallback(() => {
            this.InitializeShadow_();
            this.Render();
        });
    }

    protected InitializeShadow_(){
        this.shadow_ = document.createElement('canvas');

        this.shadow_.setAttribute('width', (this.getAttribute('width') || '0'));
        this.shadow_.setAttribute('height', (this.getAttribute('height') || '0'));
        
        this.attachShadow({
            mode: 'open',
        });

        this.shadowRoot?.append(this.shadow_);
        
        this.ctx_ = (this.shadow_.getContext('2d') || null);
        this.ctx_ && (this.ctx_.imageSmoothingQuality = 'high');

        this.shadow_.addEventListener('mouseleave', () => this.RemoveWithMouse_(true));
        this.shadow_.addEventListener('mousemove', (e) => {
            if (this.ctx_){
                this.mouseOffset_ = { x: e.offsetX, y: e.offsetY };
                this.UpdateWithMouse_(this.FindWithMouse_());
            }
        });

        this.shadow_.addEventListener('mousedown', () => (this.withMouse_ && this.withMouse_.dispatchEvent(new CustomEvent('mousedown', { bubbles: true }))));
        this.shadow_.addEventListener('mouseup', () => (this.withMouse_ && this.withMouse_.dispatchEvent(new CustomEvent('mouseup', { bubbles: true }))));

        this.shadow_.addEventListener('click', () => (this.withMouse_ && this.withMouse_.dispatchEvent(new CustomEvent('click', { bubbles: true }))));
        this.shadow_.addEventListener('dblclick', () => (this.withMouse_ && this.withMouse_.dispatchEvent(new CustomEvent('dblclick', { bubbles: true }))));
    }

    protected Render_(){
        if (this.shadow_ && !this.hidden_ && this.ctx_ && !this.queued_){
            this.queued_ = true;
            this.vsync ? requestAnimationFrame(() => this.RenderCallback_()) : queueMicrotask(() => this.RenderCallback_());
        }
    }

    protected RenderCallback_(){
        this.queued_ = false;
        if (!this.shadow_ || !this.ctx_){
            return;
        }

        this.rendered_ && !this.locked && this.ctx_.clearRect(0, 0, this.shadow_.width, this.shadow_.height);//Clear canvas
        this.rendered_ = true;

        GuardContext(this.ctx_, (ctx) => {
            if (this.priorityAware){
                const inPriority: Record<string, Array<ICanvasShape>> = {};
                FilterByFunction<ICanvasShape>(Array.from(this.children), 'GetPriority').forEach((child) => {
                    const priority = child.GetPriority();
                    inPriority[priority] = (inPriority[priority] || []);
                    inPriority[priority].push(child);
                });

                Object.keys(inPriority).sort().forEach((priority) => {
                    FilterByFunction<ICanvasShape>(inPriority[priority], 'Paint').forEach(child => JournalTry(() => child.Paint(ctx), 'Canvas.Render'));
                });
            }
            else{
                FilterByFunction<ICanvasShape>(Array.from(this.children), 'Paint').forEach(child => JournalTry(() => child.Paint(ctx), 'Canvas.Render'));
            }
        });
    }

    protected FindWithMouse_(){
        if (!this.ctx_ || !this.mouseOffset_){
            return null;
        }
        
        for (let child of FilterByFunction<ICanvasFigure>(Array.from(this.children), 'FindFigureWithPoint')){
            let found = child.FindFigureWithPoint(this.mouseOffset_, this.ctx_);
            if (found){
                return (found as unknown as Element);
            }
        }
        
        return null;
    }

    protected UpdateWithMouse_(el: Element | null){
        (el !== this.withMouse_) && this.RemoveWithMouse_(false);
        (el !== this.withMouse_) && (this.withMouse_ = el)?.dispatchEvent(new CustomEvent('mouseenter', { bubbles: true }));
        if (el){//Move - notify with relative offset
            let offset = (el as unknown as ICanvasFigure).OffsetPosition((el as unknown as ICanvasFigure).GetPosition(), null);
            el?.dispatchEvent(new CustomEvent('mousemove', {
                bubbles: true,
                detail: {
                    offset: { x: ((this.mouseOffset_?.x || 0) - offset.x), y: ((this.mouseOffset_?.y || 0) - offset.y) },
                },
            }));
        }
    }

    protected RemoveWithMouse_(resetOffset: boolean){
        this.withMouse_ && this.withMouse_.dispatchEvent(new CustomEvent('mouseleave'));
        this.withMouse_ = null;
        resetOffset && (this.mouseOffset_ = null);
    }
}

export function CanvasSurfaceCompact(){
    RegisterCustomElement(CanvasSurfaceElement, 'canvas');
}
