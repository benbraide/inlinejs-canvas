var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { EvaluateLater, GetGlobalScope } from "@benbraide/inlinejs";
import { Property, RegisterCustomElement } from "@benbraide/inlinejs-element";
import { CanvasParentElement } from "./parent";
import { CheckCircleCollision, CheckRectangleCircleCollision, CheckRectangleCollision, GetIntersectionDirection, GetIntersectionRectangle } from "../utilities/shape-collision";
export class CanvasBodyElement extends CanvasParentElement {
    constructor() {
        super();
        this.group = '';
        this.direction = '';
        this.steps = 1;
        this.circular = false;
        this.phase = false;
        this.oncollision = '';
        this.onphase = '';
        const group = GetGlobalScope(this.group), state = (group['bodies'] || (group['bodies'] = { queued: false, bodies: [], moved: [] }));
        !state.bodies.includes(this) && state.bodies.push(this);
    }
    GetRadius() {
        return ((this.firstElementChild && 'GetRadius' in this.firstElementChild) ? this.firstElementChild['GetRadius']() : 0);
    }
    Reset(position, direction) {
        this.x = position.x;
        this.y = position.y;
        this.direction = direction;
    }
    Step() {
        this.Step_();
    }
    HandleElementScopeCreated_(_a, postAttributesCallback) {
        var { scope } = _a, rest = __rest(_a, ["scope"]);
        super.HandleElementScopeCreated_(Object.assign({ scope }, rest), postAttributesCallback);
        scope.AddUninitCallback(() => {
            const state = GetGlobalScope(this.group ? `${this.group}.bodies` : 'bodies');
            Array.isArray(state.bodies) && state.bodies.includes(this) && state.bodies.splice(state.bodies.indexOf(this), 1);
            Array.isArray(state.moved) && state.moved.includes(this) && state.moved.splice(state.moved.indexOf(this), 1);
        });
    }
    AttributeChanged_(name) {
        super.AttributeChanged_(name);
        (name === 'x' || name === 'y') && this.DispatchEvent_();
    }
    DispatchEvent_() {
        const state = GetGlobalScope(this.group ? `${this.group}.bodies` : 'bodies');
        if (!Array.isArray(state.bodies) || !state.bodies.includes(this)) {
            return;
        }
        Array.isArray(state.moved) && !state.moved.includes(this) && state.moved.push(this);
        if (!state.queued) {
            state.queued = true;
            queueMicrotask(() => {
                state.queued = false;
                this.CheckCollisions_(state);
            });
        }
    }
    CheckCollisions_(state) {
        let checked = new Array(), isChecked = (body1, body2) => {
            return !!checked.find((pair) => {
                return ((pair.body1 === body1 && pair.body2 === body2) || (pair.body1 === body2 && pair.body2 === body1));
            });
        };
        state.moved.splice(0).forEach((body) => {
            if (!state.bodies.includes(body)) {
                return;
            }
            state.bodies.forEach((source) => {
                if (body === source || isChecked(body, source)) {
                    return;
                }
                checked.push({ body1: body, body2: source });
                body.CheckCollision_(source);
            });
        });
    }
    CheckCollision_(source) {
        let collides = false;
        if (this.circular && source.circular) { //Circles
            collides = CheckCircleCollision(this.GetCollisionCircle_(), source.GetCollisionCircle_());
        }
        else if (this.circular) { //Circle, Rectangle
            collides = CheckRectangleCircleCollision(source.GetCollisionRect_(), this.GetCollisionCircle_());
        }
        else if (source.circular) { //Rectangle, Circle
            collides = CheckRectangleCircleCollision(this.GetCollisionRect_(), source.GetCollisionCircle_());
        }
        else { //Rectangles
            collides = CheckRectangleCollision(this.GetCollisionRect_(), source.GetCollisionRect_());
        }
        collides && this.HandleCollision_(source);
    }
    GetCollisionCircle_() {
        const pos = this.GetOffsetPosition_(), radius = this.GetRadius();
        return {
            x: (pos.x + radius),
            y: (pos.y + radius),
            radius,
        };
    }
    ;
    GetCollisionRect_() {
        const pos = this.GetOffsetPosition_(), size = this.GetSize(null);
        return {
            x: pos.x,
            y: pos.y,
            width: size.width,
            height: size.height,
        };
    }
    HandleCollision_(source) {
        const thisCollisionRect = this.GetCollisionRect_(), sourceCollisionRect = source.GetCollisionRect_();
        const intersection = GetIntersectionRectangle(thisCollisionRect, sourceCollisionRect);
        if (intersection) {
            this.InvertDirection_(GetIntersectionDirection(intersection, thisCollisionRect));
            source.InvertDirection_(GetIntersectionDirection(intersection, sourceCollisionRect));
        }
    }
    InvertDirection_(collisionDirection, dispatchEvent = true) {
        const direction = this.direction;
        if (collisionDirection.includes('n') && !this.direction.includes('s')) {
            this.direction = ((this.direction === 'n') ? 's' : ('s' + this.GetLastDirectionPart_()));
        }
        else if (collisionDirection.includes('s') && !this.direction.includes('n')) {
            this.direction = ((this.direction === 's') ? 'n' : ('n' + this.GetLastDirectionPart_()));
        }
        if (collisionDirection.includes('w') && !this.direction.includes('e')) {
            this.direction = ((this.direction === 'w') ? 'e' : (this.direction[0] + 'e'));
        }
        else if (collisionDirection.includes('e') && !this.direction.includes('w')) {
            this.direction = ((this.direction === 'e') ? 'w' : (this.direction[0] + 'w'));
        }
        dispatchEvent && EvaluateLater({
            componentId: this.componentId_,
            contextElement: this,
            expression: this.oncollision,
            disableFunctionCall: false,
        })(undefined, [], { target: null, direction: this.direction, oldDirection: direction });
    }
    Step_(dispatch = true) {
        if (!this.direction) {
            return;
        }
        this.ApplySteps_(this.steps);
        if (!this.phase) {
            const surfaceSize = this.GetSurfaceSize(), size = this.GetSize(null), direction = this.direction;
            (this.direction.includes('n') && (this.y <= 0)) && (this.direction = ((this.direction === 'n') ? 's' : ('s' + this.GetLastDirectionPart_())));
            (this.direction.includes('s') && ((this.y + size.height) >= surfaceSize.height)) && (this.direction = ((this.direction === 's') ? 'n' : ('n' + this.GetLastDirectionPart_())));
            (this.direction.includes('e') && ((this.x + size.width) >= surfaceSize.width)) && (this.direction = ((this.direction === 'e') ? 'w' : (this.direction[0] + 'w')));
            (this.direction.includes('w') && (this.x <= 0)) && (this.direction = ((this.direction === 'w') ? 'e' : (this.direction[0] + 'e')));
            if (direction !== this.direction) {
                EvaluateLater({
                    componentId: this.componentId_,
                    contextElement: this,
                    expression: this.oncollision,
                    disableFunctionCall: false,
                })(undefined, [], { target: null, direction: this.direction, oldDirection: direction });
                EvaluateLater({
                    componentId: this.componentId_,
                    contextElement: this,
                    expression: this.onphase,
                    disableFunctionCall: false,
                })(undefined, [], { direction: this.direction, oldDirection: direction });
            }
        }
        dispatch && this.DispatchEvent_();
    }
    ApplySteps_(steps) {
        this.direction.includes('n') && (this.y -= steps);
        this.direction.includes('s') && (this.y += steps);
        this.direction.includes('e') && (this.x += steps);
        this.direction.includes('w') && (this.x -= steps);
        this.Refresh_();
    }
    GetLastDirectionPart_() {
        return this.direction[(this.direction.length - 1)];
    }
}
__decorate([
    Property({ type: 'string' })
], CanvasBodyElement.prototype, "group", void 0);
__decorate([
    Property({ type: 'string' })
], CanvasBodyElement.prototype, "direction", void 0);
__decorate([
    Property({ type: 'number' })
], CanvasBodyElement.prototype, "steps", void 0);
__decorate([
    Property({ type: 'boolean' })
], CanvasBodyElement.prototype, "circular", void 0);
__decorate([
    Property({ type: 'boolean' })
], CanvasBodyElement.prototype, "phase", void 0);
__decorate([
    Property({ type: 'string' })
], CanvasBodyElement.prototype, "oncollision", void 0);
__decorate([
    Property({ type: 'string' })
], CanvasBodyElement.prototype, "onphase", void 0);
export function CanvasBodyCompact() {
    RegisterCustomElement(CanvasBodyElement, 'canvas-body');
}
