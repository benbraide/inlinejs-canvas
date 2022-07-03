import { FindComponentById, GetGlobal, JournalTry, ToString } from "@benbraide/inlinejs";
import { CanvasRefreshEvent, ICanvasComponent, ICanvasFigure, ICanvasPosition, ICanvasSize } from "../types";
import { SetValue } from "../utilities/set-value";
import { CanvasAttributed } from "./attributed";

export class CanvasSurface extends CanvasAttributed<HTMLCanvasElement> implements ICanvasComponent{
    private ctx_: CanvasRenderingContext2D | null;
    
    private withMouse_: Element | null = null;
    private mouseOffset_: ICanvasPosition | null = null;

    private rendered_ = false;
    private queued_ = false;
    
    public constructor(){
        super({
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

        let component = GetGlobal().CreateComponent((farthestAncestor as HTMLElement) || this), componentId = component.GetId();

        component.CreateElementScope(this)?.AddUninitCallback(() => FindComponentById(componentId)?.RemoveAttributeChangeCallback(this));
        component.AddAttributeChangeCallback(this, attributes => this.OnChange_(attributes));

        (!this.state_.manual) && this.Render();
    }
    
    public GetComponentChildren(){
        return (Array.from(this.children).filter(child => (typeof child['GetComponentChildren'] === 'function')) as Array<unknown> as Array<ICanvasComponent>);
    }

    public Render(){
        if (this.queued_ || !this.shadow_){
            return;
        }

        this.queued_ = true;
        queueMicrotask(() => {
            this.queued_ = false;
            if (!this.ctx_){
                return;
            }
            
            this.rendered_ && this.ctx_.clearRect(0, 0, this.state_['size']['width'], this.state_['size']['height']);//Clear canvas
            this.rendered_ = true;

            Array.from(this.children).filter(child => (typeof child['Paint'] === 'function')).forEach(child => JournalTry(() => child['Paint'](this.ctx_), 'Canvas.Render'));
        });
    }

    public Refresh(){
        if (this.rendered_){
            this.Render();
            if (this.mouseOffset_ && this.ctx_ && (!this.withMouse_ || !(this.withMouse_ as unknown as ICanvasFigure).ContainsPoint(this.mouseOffset_, this.ctx_))){
                this.UpdateWithMouse_(this.FindWithMouse_());
            }
        }
    }

    public GetSize(): ICanvasSize{
        return this.state_.size;
    }

    public GetNative(){
        return this.shadow_;
    }

    protected AttributeChanged_(name: string){
        super.AttributeChanged_(name);
        this.style.width = `${this.state_.size.width}px`;
        this.style.height = `${this.state_.size.height}px`;
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
            let offset = (el as unknown as ICanvasFigure).OffsetPosition((el as unknown as ICanvasFigure).GetPosition());
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
}

export function CanvasSurfaceCompact(){
    customElements.define(GetGlobal().GetConfig().GetDirectiveName('canvas'), CanvasSurface);
}
