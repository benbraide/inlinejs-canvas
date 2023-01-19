import { GetGlobal } from "@benbraide/inlinejs";
import { CanvasAlign } from "./align";
export class CanvasCenter extends CanvasAlign {
    constructor() {
        super();
        this.state_.value.horizontal = this.state_.value.vertical = 'center';
    }
}
export function CanvasCenterCompact() {
    customElements.define(GetGlobal().GetConfig().GetElementName('canvas-center'), CanvasCenter);
}
