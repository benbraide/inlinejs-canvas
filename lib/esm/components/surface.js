var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { JournalTry, ToString } from "@benbraide/inlinejs";
import { CustomElement, Property, RegisterCustomElement } from '@benbraide/inlinejs-element';
import { FilterByFunction } from "../utilities/filter";
import { GuardContext } from "../utilities/context";
export class CanvasSurfaceElement extends CustomElement {
    constructor() {
        super();
        this.shadow_ = null;
        this.ctx_ = null;
        this.withMouse_ = null;
        this.mouseOffset_ = null;
        this.rendered_ = false;
        this.queued_ = false;
        this.hidden_ = false;
        this.vsync = false;
        this.locked = false;
        this.manual = false;
        this.priorityAware = false;
        this.style.display = 'flex';
    }
    UpdateHiddenProperty(value) {
        this.hidden_ = value;
    }
    UpdateWidthProperty(value) {
        var _a;
        this.style.width = `${value}px`;
        (_a = this.shadow_) === null || _a === void 0 ? void 0 : _a.setAttribute('width', ToString(value));
        this.Refresh();
    }
    UpdateHeightProperty(value) {
        var _a;
        this.style.height = `${value}px`;
        (_a = this.shadow_) === null || _a === void 0 ? void 0 : _a.setAttribute('height', ToString(value));
        this.Refresh();
    }
    GetComponentChildren() {
        return FilterByFunction(Array.from(this.children), 'GetComponentChildren');
    }
    Render() {
        this.Render_();
    }
    IsPriorityAware() {
        return this.priorityAware;
    }
    Refresh() {
        if (this.rendered_ && !this.hidden_ && !this.manual) {
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
        return this.GetSize();
    }
    GetSize() {
        var _a, _b;
        return {
            width: (((_a = this.shadow_) === null || _a === void 0 ? void 0 : _a.width) || 0),
            height: (((_b = this.shadow_) === null || _b === void 0 ? void 0 : _b.height) || 0),
        };
    }
    GetFixedSize() {
        return this.GetSize();
    }
    GetNative() {
        return this.shadow_;
    }
    GetBlob(type = 'image/png') {
        return (this.shadow_ ? new Promise(resolve => this.shadow_.toBlob(blob => resolve(blob), type)) : null);
    }
    GetDataUrl(type = 'image/png') {
        return (this.shadow_ ? this.shadow_.toDataURL(type) : '');
    }
    HandleElementScopeDestroyed_(scope) {
        super.HandleElementScopeDestroyed_(scope);
        this.shadow_ = null;
        this.ctx_ = null;
    }
    HandlePostProcess_() {
        super.HandlePostProcess_();
        this.InitializeShadow_();
        this.Render();
    }
    InitializeShadow_() {
        var _a;
        this.shadow_ = document.createElement('canvas');
        this.shadow_.setAttribute('width', (this.getAttribute('width') || '0'));
        this.shadow_.setAttribute('height', (this.getAttribute('height') || '0'));
        this.attachShadow({
            mode: 'open',
        });
        (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.append(this.shadow_);
        this.ctx_ = (this.shadow_.getContext('2d') || null);
        this.ctx_ && (this.ctx_.imageSmoothingQuality = 'high');
        this.shadow_.addEventListener('mouseleave', () => this.RemoveWithMouse_(true));
        this.shadow_.addEventListener('mousemove', (e) => {
            if (this.ctx_) {
                this.mouseOffset_ = { x: e.offsetX, y: e.offsetY };
                this.UpdateWithMouse_(this.FindWithMouse_());
            }
        });
        this.shadow_.addEventListener('mousedown', () => (this.withMouse_ && this.withMouse_.dispatchEvent(new CustomEvent('mousedown', { bubbles: true }))));
        this.shadow_.addEventListener('mouseup', () => (this.withMouse_ && this.withMouse_.dispatchEvent(new CustomEvent('mouseup', { bubbles: true }))));
        this.shadow_.addEventListener('click', () => (this.withMouse_ && this.withMouse_.dispatchEvent(new CustomEvent('click', { bubbles: true }))));
        this.shadow_.addEventListener('dblclick', () => (this.withMouse_ && this.withMouse_.dispatchEvent(new CustomEvent('dblclick', { bubbles: true }))));
    }
    Render_() {
        if (this.shadow_ && !this.hidden_ && this.ctx_ && !this.queued_) {
            this.queued_ = true;
            this.vsync ? requestAnimationFrame(() => this.RenderCallback_()) : queueMicrotask(() => this.RenderCallback_());
        }
    }
    RenderCallback_() {
        this.queued_ = false;
        if (!this.shadow_ || !this.ctx_) {
            return;
        }
        this.rendered_ && !this.locked && this.ctx_.clearRect(0, 0, this.shadow_.width, this.shadow_.height); //Clear canvas
        this.rendered_ = true;
        GuardContext(this.ctx_, (ctx) => {
            if (this.priorityAware) {
                const inPriority = {};
                FilterByFunction(Array.from(this.children), 'GetPriority').forEach((child) => {
                    const priority = child.GetPriority();
                    inPriority[priority] = (inPriority[priority] || []);
                    inPriority[priority].push(child);
                });
                Object.keys(inPriority).sort((a, b) => (Number(a) - Number(b))).forEach((priority) => {
                    FilterByFunction(inPriority[priority], 'Paint').forEach(child => JournalTry(() => child.Paint(ctx), 'Canvas.Render'));
                });
            }
            else {
                FilterByFunction(Array.from(this.children), 'Paint').forEach(child => JournalTry(() => child.Paint(ctx), 'Canvas.Render'));
            }
        });
    }
    FindWithMouse_() {
        if (!this.ctx_ || !this.mouseOffset_) {
            return null;
        }
        const children = FilterByFunction(Array.from(this.children), 'FindFigureWithPoint');
        if (this.priorityAware) {
            const inPriority = {};
            children.forEach((child) => {
                const priority = child.GetPriority();
                inPriority[priority] = (inPriority[priority] || []);
                inPriority[priority].push(child);
            });
            const sortedKeys = Object.keys(inPriority).sort((a, b) => (Number(b) - Number(a))); // Sort descending
            for (const priority of sortedKeys) {
                for (const child of inPriority[priority]) {
                    const found = child.FindFigureWithPoint(this.mouseOffset_, this.ctx_);
                    if (found) {
                        return found;
                    }
                }
            }
        }
        else { // Default behavior, but iterate backwards (last rendered is on top)
            for (let i = children.length - 1; i >= 0; --i) {
                const found = children[i].FindFigureWithPoint(this.mouseOffset_, this.ctx_);
                if (found) {
                    return found;
                }
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
}
__decorate([
    Property({ type: 'boolean' })
], CanvasSurfaceElement.prototype, "vsync", void 0);
__decorate([
    Property({ type: 'boolean' })
], CanvasSurfaceElement.prototype, "locked", void 0);
__decorate([
    Property({ type: 'boolean' })
], CanvasSurfaceElement.prototype, "manual", void 0);
__decorate([
    Property({ type: 'boolean' })
], CanvasSurfaceElement.prototype, "priorityAware", void 0);
__decorate([
    Property({ type: 'boolean' })
], CanvasSurfaceElement.prototype, "UpdateHiddenProperty", null);
__decorate([
    Property({ type: 'number', spread: 'size' })
], CanvasSurfaceElement.prototype, "UpdateWidthProperty", null);
__decorate([
    Property({ type: 'number', spread: 'size' })
], CanvasSurfaceElement.prototype, "UpdateHeightProperty", null);
export function CanvasSurfaceCompact() {
    RegisterCustomElement(CanvasSurfaceElement, 'canvas');
}
