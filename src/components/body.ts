import { EvaluateLater, GetGlobalScope, IElementScope, IElementScopeCreatedCallbackParams } from "@benbraide/inlinejs";
import { Property, RegisterCustomElement } from "@benbraide/inlinejs-element";
import { ICanvasPosition, ICanvasCircle, ICanvasRect } from "../types";
import { CanvasParentElement } from "./parent";
import { CheckCircleCollision, CheckRectangleCircleCollision, CheckRectangleCollision, GetIntersectionDirection, GetIntersectionRectangle } from "../utilities/shape-collision";

/**
 * Interface for the global state of canvas bodies, managing all bodies within a group.
 */
export interface ICanvasBodyState{
    queued: boolean;
    bodies: Array<CanvasBodyElement>;
    moved: Array<CanvasBodyElement>;
}

/**
 * Interface representing a pair of colliding bodies.
 */
export interface ICanvasBodyCollisionPair{
    body1: CanvasBodyElement;
    body2: CanvasBodyElement;
}

/**
 * A canvas component that represents a physical body with movement and collision detection.
 * This component can contain other shape components (like circle or rect) to define its form.
 */
export class CanvasBodyElement extends CanvasParentElement{
    /**
     * A string to group bodies. Only bodies in the same group will check for collisions against each other.
     */
    @Property({ type: 'string' })
    public group = '';

    /**
     * The direction of the body's movement, represented as an angle in radians.
     */
    @Property({ type: 'number' })
    public direction: number = NaN;

    /**
     * The number of steps (pixels) the body moves in each frame.
     */
    @Property({ type: 'number' })
    public steps = 1;

    /**
     * If true, the body is treated as a circle for collision detection. Otherwise, it's treated as a rectangle.
     */
    @Property({ type: 'boolean' })
    public circular = false;

    /**
     * If true, the body will not be moved by the physics engine or during collision corrections.
     */
    @Property({ type: 'boolean' })
    public fixed = false;

    /**
     * If true, the body will not check for collisions with other bodies or canvas boundaries.
     */
    @Property({ type: 'boolean' })
    public phase = false;

    /**
     * An expression to execute when a collision occurs.
     */
    @Property({ type: 'string' })
    public oncollision = '';

    /**
     * An expression to execute when the 'phase' property changes, typically used for boundary collisions.
     */
    @Property({ type: 'string' })
    public onphase = '';

    public constructor(){
        super();

        // Register this body with its group for collision detection
        const group = GetGlobalScope(this.group), state: ICanvasBodyState = (group['bodies'] || (group['bodies'] = { queued: false, bodies: [], moved: [] }));
        !state.bodies.includes(this) && state.bodies.push(this);
    }

    /**
     * Gets the radius of the body, assuming its child is a circular shape.
     * @returns The radius of the child shape, or 0 if not applicable.
     */
    public GetRadius(){
        return ((this.firstElementChild && 'GetRadius' in this.firstElementChild) ? (this.firstElementChild as any)['GetRadius']() : 0);
    }

    /**
     * Resets the body's position and direction.
     * @param position - The new x and y coordinates.
     * @param direction - The new direction angle in radians.
     */
    public Reset(position: ICanvasPosition, direction: number){
        this.x = position.x;
        this.y = position.y;
        this.direction = direction;
    }
    
    /**
     * Manually triggers a single movement step for the body.
     */
    public Step(){
        this.Step_();
    }

    protected HandleElementScopeCreatedPostfix_(params: IElementScopeCreatedCallbackParams): void {
        super.HandleElementScopeCreatedPostfix_(params);
        this.DispatchEvent_();
    }

    protected HandleElementScopeDestroyed_(scope: IElementScope): void {
        super.HandleElementScopeDestroyed_(scope);
        const state = <ICanvasBodyState>GetGlobalScope(this.group ? `${this.group}.bodies` : 'bodies');
        Array.isArray(state.bodies) && state.bodies.includes(this) && state.bodies.splice(state.bodies.indexOf(this), 1);
        Array.isArray(state.moved) && state.moved.includes(this) && state.moved.splice(state.moved.indexOf(this), 1);
    }
    
    protected AttributeChanged_(name: string){
        super.AttributeChanged_(name);
        // Trigger a collision check if the body's position changes
        (name === 'x' || name === 'y') && this.DispatchEvent_();
    }

    /**
     * Dispatches a collision check event. This is queued to the next microtask to
     * batch multiple position changes in a single frame and avoid redundant checks.
     */
    protected DispatchEvent_(){
        const state = <ICanvasBodyState>GetGlobalScope(this.group ? `${this.group}.bodies` : 'bodies');
        if (!Array.isArray(state.bodies) || !state.bodies.includes(this)){
            return;
        }

        // Add this body to the list of moved bodies to be checked
        Array.isArray(state.moved) && !state.moved.includes(this) && state.moved.push(this);
        if (!state.queued){
            state.queued = true;
            queueMicrotask(() => {
                state.queued = false;
                this.CheckCollisions_(state);
            });
        }
    }

    /**
     * Iterates through all moved bodies and checks for collisions against all other bodies in the same group.
     * @param state - The global state for the body's group.
     */
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

    /**
     * Checks for a collision with another body and handles it if one occurs.
     * @param source - The other body to check against.
     */
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

    /**
     * Gets the bounding circle for collision detection.
     * @returns An object representing the body's bounding circle.
     */
    protected GetCollisionCircle_(): ICanvasCircle{
        const pos = this.GetOffsetPosition_(), radius = this.GetRadius();
        return {
            x: (pos.x + radius),
            y: (pos.y + radius),
            radius,
        };
    };

    /**
     * Gets the bounding rectangle for collision detection.
     * @returns An object representing the body's bounding rectangle.
     */
    protected GetCollisionRect_(): ICanvasRect{
        const pos = this.GetOffsetPosition_(), size = this.GetSize(null);
        return {
            x: pos.x,
            y: pos.y,
            width: size.width,
            height: size.height,
        };
    }

    /**
     * Handles the physics of a collision between this body and another.
     * This includes reflecting directions and applying positional correction to prevent sticking.
     * @param source - The other body involved in the collision.
     */
    protected HandleCollision_(source: CanvasBodyElement){
        const originalDirection = this.direction;
        const sourceOldDirection = source.direction;

        if (this.circular && source.circular){
            const thisPos = this.GetCollisionCircle_(), sourcePos = source.GetCollisionCircle_();
            // Calculate the angle of collision
            const collisionAngle = Math.atan2(sourcePos.y - thisPos.y, sourcePos.x - thisPos.x);

            // Reflect the directions of both circles
            !isNaN(this.direction) && (this.direction = (2 * collisionAngle) - this.direction + Math.PI);
            !isNaN(source.direction) && (source.direction = (2 * collisionAngle) - source.direction + Math.PI);

            // Positional correction to prevent sticking
            const dist = Math.sqrt(Math.pow(sourcePos.x - thisPos.x, 2) + Math.pow(sourcePos.y - thisPos.y, 2));
            const overlap = (thisPos.radius + sourcePos.radius) - dist;
            if (overlap > 0){
                const dx = (sourcePos.x - thisPos.x) / dist, dy = (sourcePos.y - thisPos.y) / dist;
                if (!this.fixed && !source.fixed){
                    this.x -= (dx * (overlap / 2));
                    this.y -= (dy * (overlap / 2));
                    source.x += (dx * (overlap / 2));
                    source.y += (dy * (overlap / 2));
                }
                else if (!this.fixed){
                    this.x -= (dx * overlap);
                    this.y -= (dy * overlap);
                }
                else if (!source.fixed){
                    source.x += (dx * overlap);
                    source.y += (dy * overlap);
                }
            }
        }
        else if (!this.circular && !source.circular){
            const thisRect = this.GetCollisionRect_(), sourceRect = source.GetCollisionRect_();
            const intersection = GetIntersectionRectangle(thisRect, sourceRect);
            if (intersection){
                if (intersection.width < intersection.height){ // Horizontal collision
                    // Reflect horizontally
                    !isNaN(this.direction) && (this.direction = Math.PI - this.direction);
                    !isNaN(source.direction) && (source.direction = Math.PI - source.direction);
                    
                    // Positional correction
                    const overlap = intersection.width;
                    if (thisRect.x < sourceRect.x){
                        if (!this.fixed && !source.fixed){
                            this.x -= (overlap / 2);
                            source.x += (overlap / 2);
                        }
                        else if (!this.fixed){
                            this.x -= overlap;
                        }
                        else if (!source.fixed){
                            source.x += overlap;
                        }
                    }
                    else{
                        if (!this.fixed && !source.fixed){
                            this.x += (overlap / 2);
                            source.x -= (overlap / 2);
                        }
                        else if (!this.fixed){
                            this.x += overlap;
                        }
                        else if (!source.fixed){
                            source.x -= overlap;
                        }
                    }
                }
                else{ // Vertical collision
                    // Reflect vertically
                    !isNaN(this.direction) && (this.direction *= -1);
                    !isNaN(source.direction) && (source.direction *= -1);

                    // Positional correction
                    const overlap = intersection.height;
                    if (thisRect.y < sourceRect.y){
                        if (!this.fixed && !source.fixed){
                            this.y -= (overlap / 2);
                            source.y += (overlap / 2);
                        }
                        else if (!this.fixed){
                            this.y -= overlap;
                        }
                        else if (!source.fixed){
                            source.y += overlap;
                        }
                    }
                    else{
                        if (!this.fixed && !source.fixed){
                            this.y += (overlap / 2);
                            source.y -= (overlap / 2);
                        }
                        else if (!this.fixed){
                            this.y += overlap;
                        }
                        else if (!source.fixed){
                            source.y -= overlap;
                        }
                    }
                }
            }
        }
        else{ //Mixed
            const rectBody = this.circular ? source : this, circleBody = this.circular ? this : source;
            const rect = rectBody.GetCollisionRect_(), circle = circleBody.GetCollisionCircle_();
            const closest = {
                x: Math.max(rect.x, Math.min(circle.x, rect.x + rect.width)),
                y: Math.max(rect.y, Math.min(circle.y, rect.y + rect.height)),
            };
            
            // Reflect both bodies' directions based on the collision normal
            const collisionAngle = Math.atan2(circle.y - closest.y, circle.x - closest.x);
            !isNaN(this.direction) && (this.direction = (2 * collisionAngle) - this.direction + Math.PI);
            !isNaN(source.direction) && (source.direction = (2 * collisionAngle) - source.direction + Math.PI);

            // Positional correction
            const dist = Math.sqrt(Math.pow(circle.x - closest.x, 2) + Math.pow(circle.y - closest.y, 2));
            const overlap = circle.radius - dist;
            if (overlap > 0){
                const dx = (dist == 0) ? 1 : ((circle.x - closest.x) / dist), dy = (dist == 0) ? 0 : ((circle.y - closest.y) / dist);
                if (!rectBody.fixed && !circleBody.fixed){
                    circleBody.x += (dx * (overlap / 2));
                    circleBody.y += (dy * (overlap / 2));
                    rectBody.x -= (dx * (overlap / 2));
                    rectBody.y -= (dy * (overlap / 2));
                }
                else if (!rectBody.fixed){
                    rectBody.x -= (dx * overlap);
                    rectBody.y -= (dy * overlap);
                }
                else if (!circleBody.fixed){
                    circleBody.x += (dx * overlap);
                    circleBody.y += (dy * overlap);
                }
            }
        }

        // Normalize angles to be within 0 and 2*PI
        !isNaN(this.direction) && (this.direction = (this.direction % (2 * Math.PI) + (2 * Math.PI)) % (2 * Math.PI));
        !isNaN(source.direction) && (source.direction = (source.direction % (2 * Math.PI) + (2 * Math.PI)) % (2 * Math.PI));

        // Dispatch collision events if directions changed
        if (this.direction !== originalDirection){
            EvaluateLater({
                componentId: this.componentId_,
                contextElement: this,
                expression: this.oncollision,
                disableFunctionCall: false,
            })(undefined, [], { target: source, direction: this.direction, oldDirection: originalDirection });
        }

        if (source.direction !== sourceOldDirection){
            EvaluateLater({
                componentId: source.componentId_,
                contextElement: source,
                expression: source.oncollision,
                disableFunctionCall: false,
            })(undefined, [], { target: this, direction: source.direction, oldDirection: sourceOldDirection });
        }
    }

    /**
     * Performs a single step of movement and checks for boundary collisions.
     * @param dispatch - If true, dispatches a collision check event after moving.
     */
    protected Step_(dispatch = true){
        if (isNaN(this.direction)){
            return;
        }

        this.ApplySteps_(this.steps);
        if (!this.phase){
            const surfaceSize = this.GetSurfaceSize(), size = this.GetSize(null), originalDirection = this.direction;
            
            // Check for vertical boundary collision and reflect angle
            if ((this.y < 0 && Math.sin(this.direction) < 0) || ((this.y + size.height) > surfaceSize.height && Math.sin(this.direction) > 0)){
                this.direction *= -1;
            }

            // Check for horizontal boundary collision and reflect angle
            if ((this.x < 0 && Math.cos(this.direction) < 0) || ((this.x + size.width) > surfaceSize.width && Math.cos(this.direction) > 0)){
                this.direction = Math.PI - this.direction;
            }

            // Normalize angle
            this.direction = (this.direction % (2 * Math.PI) + (2 * Math.PI)) % (2 * Math.PI);

            if (originalDirection !== this.direction){
                EvaluateLater({
                    componentId: this.componentId_,
                    contextElement: this,
                    expression: this.oncollision,
                    disableFunctionCall: false,
                })(undefined, [], { target: null, direction: this.direction, oldDirection: originalDirection });

                EvaluateLater({
                    componentId: this.componentId_,
                    contextElement: this,
                    expression: this.onphase,
                    disableFunctionCall: false,
                })(undefined, [], { direction: this.direction, oldDirection: originalDirection });
            }
        }

        dispatch && this.DispatchEvent_();
    }

    /**
     * Applies movement to the body based on its direction and step size.
     * @param steps - The distance to move.
     */
    protected ApplySteps_(steps: number){
        if (this.fixed || isNaN(this.direction)){
            return;
        }
        
        this.x += (steps * Math.cos(this.direction));
        this.y += (steps * Math.sin(this.direction));

        this.Refresh_();
    }
}

/**
 * A helper function to register the canvas-body custom element.
 */
export function CanvasBodyCompact(){
    RegisterCustomElement(CanvasBodyElement, 'canvas-body');
}
