import { GetGlobal } from "@benbraide/inlinejs";
import { CanvasTransform } from "./transform";

export class CanvasTranslate extends CanvasTransform{
    protected Apply_(ctx: CanvasRenderingContext2D | Path2D){
        this.Translate_(ctx);
    }
}

export function CanvasTranslateCompact(){
    customElements.define(GetGlobal().GetConfig().GetDirectiveName('canvas-translate'), CanvasTranslate);
}
