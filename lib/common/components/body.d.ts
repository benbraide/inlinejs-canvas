import { IElementScopeCreatedCallbackParams } from "@benbraide/inlinejs";
import { ICanvasPosition, ICanvasCircle, ICanvasRect } from "../types";
import { CanvasParentElement } from "./parent";
/**
 * Interface for the global state of canvas bodies, managing all bodies within a group.
 */
export interface ICanvasBodyState {
    queued: boolean;
    bodies: Array<CanvasBodyElement>;
    moved: Array<CanvasBodyElement>;
}
/**
 * Interface representing a pair of colliding bodies.
 */
export interface ICanvasBodyCollisionPair {
    body1: CanvasBodyElement;
    body2: CanvasBodyElement;
}
/**
 * A canvas component that represents a physical body with movement and collision detection.
 * This component can contain other shape components (like circle or rect) to define its form.
 */
export declare class CanvasBodyElement extends CanvasParentElement {
    /**
     * A string to group bodies. Only bodies in the same group will check for collisions against each other.
     */
    group: string;
    /**
     * The direction of the body's movement, represented as an angle in radians.
     */
    direction: number;
    /**
     * The number of steps (pixels) the body moves in each frame.
     */
    steps: number;
    /**
     * If true, the body is treated as a circle for collision detection. Otherwise, it's treated as a rectangle.
     */
    circular: boolean;
    /**
     * If true, the body will not be moved by the physics engine or during collision corrections.
     */
    fixed: boolean;
    /**
     * If true, the body will not check for collisions with other bodies or canvas boundaries.
     */
    phase: boolean;
    /**
     * An expression to execute when a collision occurs.
     */
    oncollision: string;
    /**
     * An expression to execute when the 'phase' property changes, typically used for boundary collisions.
     */
    onphase: string;
    constructor();
    /**
     * Gets the radius of the body, assuming its child is a circular shape.
     * @returns The radius of the child shape, or 0 if not applicable.
     */
    GetRadius(): any;
    /**
     * Resets the body's position and direction.
     * @param position - The new x and y coordinates.
     * @param direction - The new direction angle in radians.
     */
    Reset(position: ICanvasPosition, direction: number): void;
    /**
     * Manually triggers a single movement step for the body.
     */
    Step(): void;
    protected HandleElementScopeCreated_({ scope, ...rest }: IElementScopeCreatedCallbackParams, postAttributesCallback?: () => void): void;
    protected AttributeChanged_(name: string): void;
    /**
     * Dispatches a collision check event. This is queued to the next microtask to
     * batch multiple position changes in a single frame and avoid redundant checks.
     */
    protected DispatchEvent_(): void;
    /**
     * Iterates through all moved bodies and checks for collisions against all other bodies in the same group.
     * @param state - The global state for the body's group.
     */
    protected CheckCollisions_(state: ICanvasBodyState): void;
    /**
     * Checks for a collision with another body and handles it if one occurs.
     * @param source - The other body to check against.
     */
    protected CheckCollision_(source: CanvasBodyElement): void;
    /**
     * Gets the bounding circle for collision detection.
     * @returns An object representing the body's bounding circle.
     */
    protected GetCollisionCircle_(): ICanvasCircle;
    /**
     * Gets the bounding rectangle for collision detection.
     * @returns An object representing the body's bounding rectangle.
     */
    protected GetCollisionRect_(): ICanvasRect;
    /**
     * Handles the physics of a collision between this body and another.
     * This includes reflecting directions and applying positional correction to prevent sticking.
     * @param source - The other body involved in the collision.
     */
    protected HandleCollision_(source: CanvasBodyElement): void;
    /**
     * Performs a single step of movement and checks for boundary collisions.
     * @param dispatch - If true, dispatches a collision check event after moving.
     */
    protected Step_(dispatch?: boolean): void;
    /**
     * Applies movement to the body based on its direction and step size.
     * @param steps - The distance to move.
     */
    protected ApplySteps_(steps: number): void;
}
/**
 * A helper function to register the canvas-body custom element.
 */
export declare function CanvasBodyCompact(): void;
