import { RegisterCustomElement } from "@benbraide/inlinejs-element";
import { CanvasParentElement } from "./parent";
import { TryGuardContext } from "../utilities/context";
export class CanvasGroupElement extends CanvasParentElement {
    constructor() {
        super();
    }
    Render_(ctx) {
        TryGuardContext(ctx, ctx => super.Render_(ctx));
    }
}
export function CanvasGroupCompact() {
    RegisterCustomElement(CanvasGroupElement, 'canvas-group');
}
