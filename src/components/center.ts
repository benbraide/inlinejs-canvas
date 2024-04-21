import { RegisterCustomElement } from "@benbraide/inlinejs-element";
import { ICanvasAlignment } from "../types";
import { CanvasAlignElement } from "./align";

export class CanvasCenterElement extends CanvasAlignElement{
    public constructor(){
        super();
    }

    protected GetAlignment_(): ICanvasAlignment{
        return {
            horizontal: 'center',
            vertical: 'center',
        };
    }
}

export function CanvasCenterCompact(){
    RegisterCustomElement(CanvasCenterElement, 'canvas-center');
}
