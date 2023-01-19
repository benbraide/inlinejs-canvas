import { GetGlobal } from "@benbraide/inlinejs";
import { CanvasCollisionCheckEvent, CanvasCollisionEvent } from "../types";
import { CanvasParent } from "./parent";
export class CanvasBody extends CanvasParent {
    constructor() {
        super({
            direction: '',
            orientation: 'none',
            steps: 1,
        });
        this.dispatching_ = false;
        this.direction_ = '';
        window.addEventListener(CanvasCollisionCheckEvent, (e) => {
            if (e.detail.source && 'CheckCollision_' in e.detail.source && e.detail.source !== this) {
                this.CheckCollision_(e.detail.source);
            }
        });
        this.addEventListener(CanvasCollisionEvent, (e) => {
            if (e.detail.target && 'CheckCollision_' in e.detail.target && e.detail.target !== this) {
                this.HandleCollision_(e.detail.target);
            }
        });
        this.direction_ = this.state_.direction;
    }
    GetShape() {
        return ((this.firstElementChild && 'GetRadius' in this.firstElementChild) ? 'circle' : 'rect');
    }
    GetRadius() {
        return ((this.firstElementChild && 'GetRadius' in this.firstElementChild) ? this.firstElementChild['GetRadius']() : 0);
    }
    Reset(position, direction) {
        this.state_.position = position;
        this.direction_ = direction;
    }
    Step() {
        this.Step_();
    }
    AttributeChanged_(name) {
        super.AttributeChanged_(name);
        (name === 'position' || name === 'x' || name === 'y') && this.DispatchEvent_();
        (name === 'direction') && (this.direction_ = this.state_.direction);
    }
    DispatchEvent_() {
        if (this.dispatching_) {
            return;
        }
        this.dispatching_ = true;
        queueMicrotask(() => {
            this.dispatching_ = false;
            window.dispatchEvent(new CustomEvent(CanvasCollisionCheckEvent, {
                detail: { source: this },
            }));
        });
    }
    CheckCollision_(source) {
        // let shape = this.GetShape(), srcShape = source.GetShape(), colliding = false;
        // if (shape === 'circle' && srcShape === 'circle'){
        //     colliding = this.CheckCirclesCollision_(source);
        // }
        // else if (shape === 'circle' && srcShape === 'rect'){
        //     colliding = this.CheckCircleRectCollision_(this, source);
        // }
        // else if (shape === 'rect' && srcShape === 'circle'){
        //     colliding = this.CheckCircleRectCollision_(source, this);
        // }
        // else{//Rects
        //     colliding = this.CheckRectsCollision_(source);
        // }
        if (!this.CheckRectsCollision_(source)) {
            return;
        }
        if (this.direction_ && source.direction_ && this.direction_ !== source.direction_) {
            let pos = this.GetOffsetPosition_(), size = this.GetSize(null), srcPos = source.GetOffsetPosition(), srcSize = source.GetSize(null);
            let isNorth = this.direction_.includes('n'), isEast = this.direction_.includes('e');
            let [x1, x2, x3] = (isEast ? [pos.x, (srcPos.x + srcSize.width), (pos.x + size.width)] : [srcPos.x, (pos.x + size.width), pos.x]);
            let [y1, y2, y3] = (isNorth ? [pos.y, (srcPos.y + srcSize.height), (pos.y + size.height)] : [srcPos.y, (pos.y + size.height), pos.y]);
            if (Math.abs(x3 - x2) < Math.abs(x1 - x2) && Math.abs(y3 - y2) < Math.abs(y1 - y2)) {
                return; // Bodies are moving away from each other
            }
            // let xOff = ((pos.x < srcPos.x) ? Math.abs((pos.x + size.width) - srcPos.x) : Math.abs((srcPos.x + srcSize.width) - pos.x));
            // let yOff = ((pos.y < srcPos.y) ? Math.abs((pos.y + size.height) - srcPos.y) : Math.abs((srcPos.y + srcSize.height) - pos.y));
            // let maxSteps = Math.max(this.state_.steps, source.state_.steps);
            // if (Math.min(xOff, yOff)  > maxSteps){
            //     return;//Too much overlap
            // }
            // if ((pos.y < srcPos.y && Math.abs((pos.y + size.height) - srcPos.y) > maxSteps) ||  > maxSteps){
            //     return;//Too much overlap
            // }
            // if ((pos.x < srcPos.x && Math.abs((pos.x + size.width) - srcPos.x) > maxSteps) || Math.abs((srcPos.x + srcSize.width) - pos.x) > maxSteps){
            //     return;//Too much overlap
            // }
        }
        source.dispatchEvent(new CustomEvent(CanvasCollisionEvent, {
            detail: { target: this },
        }));
        this.dispatchEvent(new CustomEvent(CanvasCollisionEvent, {
            detail: { target: source },
        }));
        queueMicrotask(() => {
            source.Step_(false);
            this.Step_(false);
        });
    }
    CheckCirclesCollision_(source) {
        let pos = this.GetOffsetPosition_(), radius = this.GetRadius(), srcPos = source.GetOffsetPosition(), srcRadius = source.GetRadius();
        let dx = (srcPos.x - pos.x), dy = (srcPos.y - pos.y), rSum = (radius + srcRadius);
        return (((dx * dx) + (dy * dy)) <= (rSum * rSum));
    }
    CheckCircleRectCollision_(circle, rect) {
        let cPos = circle.GetOffsetPosition_(), radius = circle.GetRadius(), rPos = rect.GetOffsetPosition(), size = rect.GetSize(null);
        let dx = Math.abs(cPos.x - (rPos.x + (size.width / 2))), dy = Math.abs(cPos.y - (rPos.y + (size.height / 2)));
        if (dx > (radius + (size.width / 2)) || dy > (radius + (size.height / 2))) {
            return false;
        }
        if (dx <= size.width || dy <= size.height) {
            return true;
        }
        dx -= size.width;
        dy -= size.height;
        return (((dx * dx) + (dy * dy)) <= (radius * radius));
    }
    CheckRectsCollision_(source) {
        let pos = this.GetOffsetPosition_(), size = this.GetSize(null), srcPos = source.GetOffsetPosition(), srcSize = source.GetSize(null);
        return (pos.x < (srcPos.x + srcSize.width) && (pos.x + size.width) > srcPos.x && pos.y < (srcPos.y + srcSize.height) && (pos.y + size.height) > srcPos.y);
    }
    HandleCollision_(source) {
        if (!this.direction_) {
            return;
        }
        if (source.state_.orientation === 'horizontal' || source.state_.orientation === 'top' || source.state_.orientation === 'bottom') {
            this.HandleHCollision_(source.state_.orientation);
        }
        else if (source.state_.orientation === 'vertical' || source.state_.orientation === 'left' || source.state_.orientation === 'right') {
            this.HandleVCollision_(source.state_.orientation);
        }
        else if (this.direction_ === source.direction_) {
            this.HandleChaseCollision_(source);
        }
        else {
            this.HandleCrashCollision_(source);
        }
    }
    HandleHCollision_(orientation) {
        let isNorth = this.direction_.includes('n');
        if (!(['e', 'w'].includes(this.direction_) || (isNorth && orientation === 'bottom') || (this.direction_.includes('s') && orientation === 'top'))) {
            this.direction_ = ((isNorth ? 's' : 'n') + (this.direction_.substring(1) || ''));
        }
    }
    HandleVCollision_(orientation) {
        let isEast = this.direction_.includes('e');
        if (!(['n', 's'].includes(this.direction_) || (isEast && orientation === 'right') || (this.direction_.includes('w') && orientation === 'left'))) {
            this.direction_ = (((this.direction_.length == 1) ? '' : this.direction_[0]) + (isEast ? 'w' : 'e'));
        }
    }
    HandleChaseCollision_(source) {
        this.HandleCrashCollision_(source);
    }
    HandleCrashCollision_(source) {
        let pos = this.GetOffsetPosition_(), size = this.GetSize(null), srcPos = source.GetOffsetPosition(), srcSize = source.GetSize(null);
        let isNorth = this.direction_.includes('n'), isEast = this.direction_.includes('e');
        let [x1, x2] = (isEast ? [pos.x, (srcPos.x + srcSize.width)] : [srcPos.x, (pos.x + size.width)]);
        let [y1, y2] = (isNorth ? [pos.y, (srcPos.y + srcSize.height)] : [srcPos.y, (pos.y + size.height)]);
        if (Math.abs(y1 - y2) < Math.abs(x1 - x2)) { // Hit target: Horizontal
            this.direction_ = ((isNorth ? 's' : 'n') + (this.direction_.substring(1) || ''));
        }
        else { // Hit target: Vertical
            this.direction_ = (((this.direction_.length == 1) ? '' : this.direction_[0]) + (isEast ? 'w' : 'e'));
        }
    }
    Step_(dispatch = true) {
        if (!this.direction_) {
            return;
        }
        this.ApplySteps_(this.state_.steps);
        let surfaceSize = this.GetSurfaceSize();
        (this.state_.position.x < 0) && (this.direction_ = (((this.direction_.length == 1) ? '' : this.direction_[0]) + 'w'));
        (this.state_.position.y < 0) && (this.direction_ = ('s' + (this.direction_.substring(1) || '')));
        (this.state_.position.x > surfaceSize.width) && (this.direction_ = (((this.direction_.length == 1) ? '' : this.direction_[0]) + 'e'));
        (this.state_.position.y > surfaceSize.height) && (this.direction_ = ('n' + (this.direction_.substring(1) || '')));
        dispatch && this.DispatchEvent_();
    }
    ApplySteps_(steps) {
        this.direction_.includes('n') && (this.state_.position.y -= steps);
        this.direction_.includes('s') && (this.state_.position.y += steps);
        this.direction_.includes('e') && (this.state_.position.x -= steps);
        this.direction_.includes('w') && (this.state_.position.x += steps);
    }
    ReverseDirection_() {
        let vertical = (/n|s/.test(this.direction_) ? (this.direction_.includes('n') ? 's' : 'n') : '');
        let horizontal = (/e|w/.test(this.direction_) ? (this.direction_.includes('e') ? 'w' : 'e') : '');
        this.direction_ = `${vertical}${horizontal}`;
    }
}
export function CanvasBodyCompact() {
    customElements.define(GetGlobal().GetConfig().GetElementName('canvas-body'), CanvasBody);
}
