import { EvaluateLater, GetGlobalScope, IElementScopeCreatedCallbackParams } from "@benbraide/inlinejs";
import { Property, RegisterCustomElement } from "@benbraide/inlinejs-element";
import { CanvasBodyDirectionType, ICanvasPosition, ICanvasCircle, ICanvasRect } from "../types";
import { CanvasParentElement } from "./parent";
import { CheckCircleCollision, CheckRectangleCircleCollision, CheckRectangleCollision, GetIntersectionDirection, GetIntersectionRectangle } from "../utilities/shape-collision";

export interface ICanvasBodyState{
    queued: boolean;
    bodies: Array<CanvasBodyElement>;
    moved: Array<CanvasBodyElement>;
}

export interface ICanvasBodyCollisionPair{
    body1: CanvasBodyElement;
    body2: CanvasBodyElement;
}

export class CanvasBodyElement extends CanvasParentElement{
    @Property({ type: 'string' })
    public group = '';

    @Property({ type: 'string' })
    public direction: CanvasBodyDirectionType = '';

    @Property({ type: 'number' })
    public steps = 1;

    @Property({ type: 'boolean' })
    public circular = false;

    @Property({ type: 'boolean' })
    public phase = false;

    @Property({ type: 'string' })
    public oncollision = '';

    @Property({ type: 'string' })
    public onphase = '';

    public constructor(){
        super();

        const group = GetGlobalScope(this.group), state: ICanvasBodyState = (group['bodies'] || (group['bodies'] = { queued: false, bodies: [], moved: [] }));
        !state.bodies.includes(this) && state.bodies.push(this);
    }

    public GetRadius(){
        return ((this.firstElementChild && 'GetRadius' in this.firstElementChild) ? (this.firstElementChild as any)['GetRadius']() : 0);
    }

    public Reset(position: ICanvasPosition, direction: CanvasBodyDirectionType){
        this.x = position.x;
        this.y = position.y;
        this.direction = direction;
    }
    
    public Step(){
        this.Step_();
    }

    protected HandleElementScopeCreated_({ scope, ...rest }: IElementScopeCreatedCallbackParams, postAttributesCallback?: () => void){
        super.HandleElementScopeCreated_({ scope, ...rest }, postAttributesCallback);
        scope.AddUninitCallback(() => {
            const state = <ICanvasBodyState>GetGlobalScope(this.group ? `${this.group}.bodies` : 'bodies');
            Array.isArray(state.bodies) && state.bodies.includes(this) && state.bodies.splice(state.bodies.indexOf(this), 1);
            Array.isArray(state.moved) && state.moved.includes(this) && state.moved.splice(state.moved.indexOf(this), 1);
        });
    }
    
    protected AttributeChanged_(name: string){
        super.AttributeChanged_(name);
        (name === 'x' || name === 'y') && this.DispatchEvent_();
    }

    protected DispatchEvent_(){
        const state = <ICanvasBodyState>GetGlobalScope(this.group ? `${this.group}.bodies` : 'bodies');
        if (!Array.isArray(state.bodies) || !state.bodies.includes(this)){
            return;
        }

        Array.isArray(state.moved) && !state.moved.includes(this) && state.moved.push(this);
        if (!state.queued){
            state.queued = true;
            queueMicrotask(() => {
                state.queued = false;
                this.CheckCollisions_(state);
            });
        }
    }

    protected CheckCollisions_(state: ICanvasBodyState){
        let checked = new Array<ICanvasBodyCollisionPair>(), isChecked = (body1: CanvasBodyElement, body2: CanvasBodyElement) => {
            return !!checked.find((pair) => {
                return ((pair.body1 === body1 && pair.body2 === body2) || (pair.body1 === body2 && pair.body2 === body1));
            });
        };

        state.moved.splice(0).forEach((body) => {
            if (!state.bodies.includes(body)){
                return;
            }

            state.bodies.forEach((source) => {
                if (body === source || isChecked(body, source)){
                    return;
                }

                checked.push({ body1: body, body2: source });
                body.CheckCollision_(source);
            });
        });
    }

    protected CheckCollision_(source: CanvasBodyElement){
        let collides = false;
        if (this.circular && source.circular){//Circles
            collides = CheckCircleCollision(this.GetCollisionCircle_(), source.GetCollisionCircle_());
        }
        else if (this.circular){//Circle, Rectangle
            collides = CheckRectangleCircleCollision(source.GetCollisionRect_(), this.GetCollisionCircle_());
        }
        else if (source.circular){//Rectangle, Circle
            collides = CheckRectangleCircleCollision(this.GetCollisionRect_(), source.GetCollisionCircle_());
        }
        else{//Rectangles
            collides = CheckRectangleCollision(this.GetCollisionRect_(), source.GetCollisionRect_());
        }

        collides && this.HandleCollision_(source);
    }

    protected GetCollisionCircle_(): ICanvasCircle{
        const pos = this.GetOffsetPosition_(), radius = this.GetRadius();
        return {
            x: (pos.x + radius),
            y: (pos.y + radius),
            radius,
        };
    };

    protected GetCollisionRect_(): ICanvasRect{
        const pos = this.GetOffsetPosition_(), size = this.GetSize(null);
        return {
            x: pos.x,
            y: pos.y,
            width: size.width,
            height: size.height,
        };
    }

    protected HandleCollision_(source: CanvasBodyElement){
        const thisCollisionRect = this.GetCollisionRect_(), sourceCollisionRect = source.GetCollisionRect_();

        const intersection = GetIntersectionRectangle(thisCollisionRect, sourceCollisionRect);
        if (intersection){
            this.InvertDirection_(GetIntersectionDirection(intersection, thisCollisionRect));
            source.InvertDirection_(GetIntersectionDirection(intersection, sourceCollisionRect));
        }
    }

    protected InvertDirection_(collisionDirection: CanvasBodyDirectionType, dispatchEvent = true){
        const direction = this.direction;
        if (collisionDirection.includes('n') && !this.direction.includes('s')){
            this.direction = <CanvasBodyDirectionType>((this.direction === 'n') ? 's' : ('s' + this.GetLastDirectionPart_()));
        }
        else if (collisionDirection.includes('s') && !this.direction.includes('n')){
            this.direction = <CanvasBodyDirectionType>((this.direction === 's') ? 'n' : ('n' + this.GetLastDirectionPart_()));
        }
        
        if (collisionDirection.includes('w') && !this.direction.includes('e')){
            this.direction = <CanvasBodyDirectionType>((this.direction === 'w') ? 'e' : (this.direction[0] + 'e'));
        }
        else if (collisionDirection.includes('e') && !this.direction.includes('w')){
            this.direction = <CanvasBodyDirectionType>((this.direction === 'e') ? 'w' : (this.direction[0] + 'w'));
        }

        dispatchEvent && EvaluateLater({
            componentId: this.componentId_,
            contextElement: this,
            expression: this.oncollision,
            disableFunctionCall: false,
        })(undefined, [], { target: null, direction: this.direction, oldDirection: direction });
    }

    protected Step_(dispatch = true){
        if (!this.direction){
            return;
        }

        this.ApplySteps_(this.steps);
        if (!this.phase){
            const surfaceSize = this.GetSurfaceSize(), size = this.GetSize(null), direction = this.direction;

            (this.direction.includes('n') && (this.y <= 0)) && (this.direction = <CanvasBodyDirectionType>((this.direction === 'n') ? 's' : ('s' + this.GetLastDirectionPart_())));
            (this.direction.includes('s') && ((this.y + size.height) >= surfaceSize.height)) && (this.direction = <CanvasBodyDirectionType>((this.direction === 's') ? 'n' : ('n' + this.GetLastDirectionPart_())));

            (this.direction.includes('e') && ((this.x + size.width) >= surfaceSize.width)) && (this.direction = <CanvasBodyDirectionType>((this.direction === 'e') ? 'w' : (this.direction[0] + 'w')));
            (this.direction.includes('w') && (this.x <= 0)) && (this.direction = <CanvasBodyDirectionType>((this.direction === 'w') ? 'e' : (this.direction[0] + 'e')));

            if (direction !== this.direction){
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

    protected ApplySteps_(steps: number){
        this.direction.includes('n') && (this.y -= steps);
        this.direction.includes('s') && (this.y += steps);

        this.direction.includes('e') && (this.x += steps);
        this.direction.includes('w') && (this.x -= steps);

        this.Refresh_();
    }

    protected GetLastDirectionPart_(){
        return this.direction[(this.direction.length - 1)];
    }
}

export function CanvasBodyCompact(){
    RegisterCustomElement(CanvasBodyElement, 'canvas-body');
}
