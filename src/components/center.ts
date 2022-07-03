import { GetGlobal } from "@benbraide/inlinejs";
import { CanvasAlign } from "./align";

export class CanvasCenter extends CanvasAlign{
    public constructor(){
        super();
        this.state_.value.horizontal = this.state_.value.vertical = 'center';
    }
}

export function CanvasCenterCompact(){
    customElements.define(GetGlobal().GetConfig().GetDirectiveName('canvas-center'), CanvasCenter);
}
