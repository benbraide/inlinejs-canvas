import { GetGlobal, JournalTry, ToString } from "@benbraide/inlinejs";
import { CustomElement, SetValue } from '@benbraide/inlinejs-element';
import { CanvasRefreshEvent, ICanvasComponent, ICanvasFigure, ICanvasPosition, ICanvasSize } from "../types";

export class CanvasSurface extends CustomElement<HTMLCanvasElement> implements ICanvasComponent{
    private ctx_: CanvasRenderingContext2D | null;
    
    private withMouse_: Element | null = null;
    private mouseOffset_: ICanvasPosition | null = null;

    private rendered_ = false;
    private queued_ = false;
    private requested_ = false;
    
    public constructor(){
        super({
            vsync: true,
            manual: false,
            size: {
                width: 0,
                height: 0,
            },
        }, document.createElement('canvas'));

        this.attachShadow({
            mode: 'open',
        });
        
        if (!this.hasAttribute('size')){
            SetValue(this.state_['size'], 'width', (this.getAttribute('width') || '0'));
            SetValue(this.state_['size'], 'height', (this.getAttribute('height') || '0'));
        }
        else{//Initialize with size attribute
            SetValue(this.state_, 'size', (this.getAttribute('size') || '0'));
        }

        this.shadow_?.setAttribute('width', ToString(this.state_['size']['width']));
        this.shadow_?.setAttribute('height', ToString(this.state_['size']['height']));

        this.addEventListener(CanvasRefreshEvent, () => this.Refresh());
        this.shadow_ && this.shadowRoot?.append(this.shadow_);
        
        this.ctx_ = (this.shadow_?.getContext('2d') || null);
        this.ctx_ && (this.ctx_.imageSmoothingQuality = 'high');

        this.shadow_?.addEventListener('mouseleave', () => this.RemoveWithMouse_(true));
        this.shadow_?.addEventListener('mousemove', (e) => {
            if (this.ctx_){
                this.mouseOffset_ = { x: e.offsetX, y: e.offsetY };
                this.UpdateWithMouse_(this.FindWithMouse_());
            }
        });

        this.shadow_?.addEventListener('mousedown', () => (this.withMouse_ && this.withMouse_.dispatchEvent(new CustomEvent('mousedown', { bubbles: true }))));
        this.shadow_?.addEventListener('mouseup', () => (this.withMouse_ && this.withMouse_.dispatchEvent(new CustomEvent('mouseup', { bubbles: true }))));

        this.shadow_?.addEventListener('click', () => (this.withMouse_ && this.withMouse_.dispatchEvent(new CustomEvent('click', { bubbles: true }))));
        this.shadow_?.addEventListener('dblclick', () => (this.withMouse_ && this.withMouse_.dispatchEvent(new CustomEvent('dblclick', { bubbles: true }))));

        this.style.display = 'block';
        this.style.width = `${this.state_.size.width}px`;
        this.style.height = `${this.state_.size.height}px`;

        let dataDirective = GetGlobal().GetConfig().GetDirectiveName('data', false);
        let altDataDirective = GetGlobal().GetConfig().GetDirectiveName('data', true);

        let farthestAncestor: Node | null = null;
        for (let ancestor: Node | null = this; ancestor; ancestor = ancestor.parentNode){
            if ((ancestor instanceof Element) && (ancestor.hasAttribute(dataDirective) || ancestor.hasAttribute(altDataDirective))){
                farthestAncestor = ancestor;
            }
        }

        (this.requested_ = this.state_.vsync) && requestAnimationFrame(() => this.VsyncCallback_());
        (!this.state_.manual) && this.Render();
    }
    
    public GetComponentChildren(){
        return (Array.from(this.children).filter(child => (typeof child['GetComponentChildren'] === 'function')) as Array<unknown> as Array<ICanvasComponent>);
    }

    public Render(){
        !this.state_.vsync && !this.queued_ && (this.queued_ = true) && this.Render_();
    }

    public Refresh(){
        if (this.rendered_){
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

    public GetSurfaceSize(){
        return this.state_.size;
    }
    
    public GetSize(): ICanvasSize{
        return this.state_.size;
    }

    public GetFixedSize(): ICanvasSize{
        return this.state_.size;
    }

    public GetNative(){
        return this.shadow_;
    }

    protected AttributeChanged_(name: string){
        super.AttributeChanged_(name);

        if (name === 'size' || name === 'width' || name === 'height'){
            this.style.width = `${this.state_.size.width}px`;
            this.style.height = `${this.state_.size.height}px`;
        }
        else if (name === 'vsync'){
            !this.requested_ && (this.requested_ = this.state_.vsync) && requestAnimationFrame(() => this.VsyncCallback_());
        }
    }

    private Render_(){
        if (!this.queued_ || !this.shadow_ || !this.ctx_){
            return;
        }

        this.queued_ = false;
        this.rendered_ && this.ctx_.clearRect(0, 0, this.state_.size.width, this.state_.size.height);//Clear canvas
        this.rendered_ = true;

        this.ctx_.save();
        Array.from(this.children).filter(child => (typeof child['Paint'] === 'function')).forEach(child => JournalTry(() => child['Paint'](this.ctx_), 'Canvas.Render'));
        this.ctx_.restore();
    }

    private FindWithMouse_(){
        for (let child of Array.from(this.children).filter(child => (typeof child['FindChildWithPoint'] === 'function'))){
            let found = (child as any)['FindChildWithPoint'](this.mouseOffset_, this.ctx_);
            if (found){
                return found;
            }
        }
        
        return null;
    }

    private UpdateWithMouse_(el: Element | null){
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

    private RemoveWithMouse_(resetOffset: boolean){
        this.withMouse_ && this.withMouse_.dispatchEvent(new CustomEvent('mouseleave'));
        this.withMouse_ = null;
        resetOffset && (this.mouseOffset_ = null);
    }

    private VsyncCallback_(){
        this.rendered_ && this.Render();
        (this.requested_ = this.state_.vsync) && requestAnimationFrame(() => this.VsyncCallback_());
        !this.queued_ && (this.queued_ = true) && this.Render_();
    }
}

export function CanvasSurfaceCompact(){
    customElements.define(GetGlobal().GetConfig().GetElementName('canvas'), CanvasSurface);
}
