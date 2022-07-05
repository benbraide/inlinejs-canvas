import { GetGlobal } from "@benbraide/inlinejs";
import { CanvasParent } from "./parent";

export class CanvasCall extends CanvasParent{
    protected Render_(ctx: CanvasRenderingContext2D | Path2D){
        Array.from(this.attributes).forEach((attr) => {
            let formattedName = attr.name.split('-').reduce((prev, cur) => (prev + (cur.at(0) || '').toUpperCase() + (cur.substring(1) || '')));
            (formattedName in ctx && typeof ctx[formattedName] === 'function') && ctx[formattedName]();
        });

        super.Render_(ctx);
    }
}

export function CanvasCallCompact(){
    customElements.define(GetGlobal().GetConfig().GetDirectiveName('canvas-call'), CanvasCall);
}
