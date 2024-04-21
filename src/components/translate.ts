import { RegisterCustomElement } from "@benbraide/inlinejs-element";
import { CanvasTransformElement } from "./transform";

export class CanvasTranslateElement extends CanvasTransformElement{
    public constructor(){
        super();
    }
}

export function CanvasTranslateCompact(){
    RegisterCustomElement(CanvasTranslateElement, 'canvas-translate');
}
