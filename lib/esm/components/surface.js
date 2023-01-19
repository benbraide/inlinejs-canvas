import { GetGlobal, JournalTry, ToString } from "@benbraide/inlinejs";
import { CustomElement, SetValue } from '@benbraide/inlinejs-element';
import { CanvasRefreshEvent } from "../types";
export class CanvasSurface extends CustomElement {
    constructor() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        super({
            vsync: true,
            manual: false,
            size: {
                width: 0,
                height: 0,
            },
        }, true, document.createElement('canvas'));
        this.withMouse_ = null;
        this.mouseOffset_ = null;
        this.rendered_ = false;
        this.queued_ = false;
        this.requested_ = false;
        this.attachShadow({
            mode: 'open',
        });
        if (!this.hasAttribute('size')) {
            SetValue(this.state_['size'], 'width', (this.getAttribute('width') || '0'));
            SetValue(this.state_['size'], 'height', (this.getAttribute('height') || '0'));
        }
        else { //Initialize with size attribute
            SetValue(this.state_, 'size', (this.getAttribute('size') || '0'));
        }
        (_a = this.shadow_) === null || _a === void 0 ? void 0 : _a.setAttribute('width', ToString(this.state_['size']['width']));
        (_b = this.shadow_) === null || _b === void 0 ? void 0 : _b.setAttribute('height', ToString(this.state_['size']['height']));
        this.addEventListener(CanvasRefreshEvent, () => this.Refresh());
        this.shadow_ && ((_c = this.shadowRoot) === null || _c === void 0 ? void 0 : _c.append(this.shadow_));
        this.ctx_ = (((_d = this.shadow_) === null || _d === void 0 ? void 0 : _d.getContext('2d')) || null);
        this.ctx_ && (this.ctx_.imageSmoothingQuality = 'high');
        (_e = this.shadow_) === null || _e === void 0 ? void 0 : _e.addEventListener('mouseleave', () => this.RemoveWithMouse_(true));
        (_f = this.shadow_) === null || _f === void 0 ? void 0 : _f.addEventListener('mousemove', (e) => {
            if (this.ctx_) {
                this.mouseOffset_ = { x: e.offsetX, y: e.offsetY };
                this.UpdateWithMouse_(this.FindWithMouse_());
            }
        });
        (_g = this.shadow_) === null || _g === void 0 ? void 0 : _g.addEventListener('mousedown', () => (this.withMouse_ && this.withMouse_.dispatchEvent(new CustomEvent('mousedown', { bubbles: true }))));
        (_h = this.shadow_) === null || _h === void 0 ? void 0 : _h.addEventListener('mouseup', () => (this.withMouse_ && this.withMouse_.dispatchEvent(new CustomEvent('mouseup', { bubbles: true }))));
        (_j = this.shadow_) === null || _j === void 0 ? void 0 : _j.addEventListener('click', () => (this.withMouse_ && this.withMouse_.dispatchEvent(new CustomEvent('click', { bubbles: true }))));
        (_k = this.shadow_) === null || _k === void 0 ? void 0 : _k.addEventListener('dblclick', () => (this.withMouse_ && this.withMouse_.dispatchEvent(new CustomEvent('dblclick', { bubbles: true }))));
        this.style.display = 'block';
        this.style.width = `${this.state_.size.width}px`;
        this.style.height = `${this.state_.size.height}px`;
        let dataDirective = GetGlobal().GetConfig().GetDirectiveName('data', false);
        let altDataDirective = GetGlobal().GetConfig().GetDirectiveName('data', true);
        let farthestAncestor = null;
        for (let ancestor = this; ancestor; ancestor = ancestor.parentNode) {
            if ((ancestor instanceof Element) && (ancestor.hasAttribute(dataDirective) || ancestor.hasAttribute(altDataDirective))) {
                farthestAncestor = ancestor;
            }
        }
        (this.requested_ = this.state_.vsync) && requestAnimationFrame(() => this.VsyncCallback_());
        (!this.state_.manual) && this.Render();
    }
    GetComponentChildren() {
        return Array.from(this.children).filter(child => (typeof child['GetComponentChildren'] === 'function'));
    }
    Render() {
        !this.state_.vsync && !this.queued_ && (this.queued_ = true) && this.Render_();
    }
    Refresh() {
        if (this.rendered_) {
            this.Render();
            if (this.mouseOffset_ && this.ctx_ && (!this.withMouse_ || !this.withMouse_.ContainsPoint(this.mouseOffset_, this.ctx_))) {
                this.UpdateWithMouse_(this.FindWithMouse_());
            }
        }
    }
    GetContext() {
        return this.ctx_;
    }
    GetSurfaceContext() {
        return this.ctx_;
    }
    GetSurfaceSize() {
        return this.state_.size;
    }
    GetSize() {
        return this.state_.size;
    }
    GetFixedSize() {
        return this.state_.size;
    }
    GetNative() {
        return this.shadow_;
    }
    AttributeChanged_(name) {
        super.AttributeChanged_(name);
        if (name === 'size' || name === 'width' || name === 'height') {
            this.style.width = `${this.state_.size.width}px`;
            this.style.height = `${this.state_.size.height}px`;
        }
        else if (name === 'vsync') {
            !this.requested_ && (this.requested_ = this.state_.vsync) && requestAnimationFrame(() => this.VsyncCallback_());
        }
    }
    Render_() {
        if (!this.queued_ || !this.shadow_ || !this.ctx_) {
            return;
        }
        this.queued_ = false;
        this.rendered_ && this.ctx_.clearRect(0, 0, this.state_.size.width, this.state_.size.height); //Clear canvas
        this.rendered_ = true;
        this.ctx_.save();
        Array.from(this.children).filter(child => (typeof child['Paint'] === 'function')).forEach(child => JournalTry(() => child['Paint'](this.ctx_), 'Canvas.Render'));
        this.ctx_.restore();
    }
    FindWithMouse_() {
        for (let child of Array.from(this.children).filter(child => (typeof child['FindChildWithPoint'] === 'function'))) {
            let found = child['FindChildWithPoint'](this.mouseOffset_, this.ctx_);
            if (found) {
                return found;
            }
        }
        return null;
    }
    UpdateWithMouse_(el) {
        var _a, _b, _c;
        (el !== this.withMouse_) && this.RemoveWithMouse_(false);
        (el !== this.withMouse_) && ((_a = (this.withMouse_ = el)) === null || _a === void 0 ? void 0 : _a.dispatchEvent(new CustomEvent('mouseenter', { bubbles: true })));
        if (el) { //Move - notify with relative offset
            let offset = el.OffsetPosition(el.GetPosition(), null);
            el === null || el === void 0 ? void 0 : el.dispatchEvent(new CustomEvent('mousemove', {
                bubbles: true,
                detail: {
                    offset: { x: ((((_b = this.mouseOffset_) === null || _b === void 0 ? void 0 : _b.x) || 0) - offset.x), y: ((((_c = this.mouseOffset_) === null || _c === void 0 ? void 0 : _c.y) || 0) - offset.y) },
                },
            }));
        }
    }
    RemoveWithMouse_(resetOffset) {
        this.withMouse_ && this.withMouse_.dispatchEvent(new CustomEvent('mouseleave'));
        this.withMouse_ = null;
        resetOffset && (this.mouseOffset_ = null);
    }
    VsyncCallback_() {
        this.rendered_ && this.Render();
        (this.requested_ = this.state_.vsync) && requestAnimationFrame(() => this.VsyncCallback_());
        !this.queued_ && (this.queued_ = true) && this.Render_();
    }
}
export function CanvasSurfaceCompact() {
    customElements.define(GetGlobal().GetConfig().GetElementName('canvas'), CanvasSurface);
}
