import { IElementScopeCreatedCallbackParams } from "@benbraide/inlinejs";
import { CanvasBodyDirectionType, ICanvasPosition, ICanvasCircle, ICanvasRect } from "../types";
import { CanvasParentElement } from "./parent";
export interface ICanvasBodyState {
    queued: boolean;
    bodies: Array<CanvasBodyElement>;
    moved: Array<CanvasBodyElement>;
}
export interface ICanvasBodyCollisionPair {
    body1: CanvasBodyElement;
    body2: CanvasBodyElement;
}
export declare class CanvasBodyElement extends CanvasParentElement {
    group: string;
    direction: CanvasBodyDirectionType;
    steps: number;
    circular: boolean;
    phase: boolean;
    oncollision: string;
    onphase: string;
    constructor();
    GetRadius(): any;
    Reset(position: ICanvasPosition, direction: CanvasBodyDirectionType): void;
    Step(): void;
    protected HandleElementScopeCreated_({ scope, ...rest }: IElementScopeCreatedCallbackParams, postAttributesCallback?: () => void): void;
    protected AttributeChanged_(name: string): void;
    protected DispatchEvent_(): void;
    protected CheckCollisions_(state: ICanvasBodyState): void;
    protected CheckCollision_(source: CanvasBodyElement): void;
    protected GetCollisionCircle_(): ICanvasCircle;
    protected GetCollisionRect_(): ICanvasRect;
    protected HandleCollision_(source: CanvasBodyElement): void;
    protected InvertDirection_(collisionDirection: CanvasBodyDirectionType, dispatchEvent?: boolean): void;
    protected Step_(dispatch?: boolean): void;
    protected ApplySteps_(steps: number): void;
    protected GetLastDirectionPart_(): string;
}
export declare function CanvasBodyCompact(): void;
