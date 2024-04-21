import { RegisterCustomElement } from "@benbraide/inlinejs-element";
import { CanvasParentElement } from "./parent";
import { TryGuardContext } from "../utilities/context";

export class CanvasGroupElement extends CanvasParentElement{
    public constructor(){
        super();
    }
    
    protected Render_(ctx: CanvasRenderingContext2D | Path2D){
        TryGuardContext(ctx, ctx => super.Render_(ctx));
    }
}

export function CanvasGroupCompact(){
    RegisterCustomElement(CanvasGroupElement, 'canvas-group');
}
