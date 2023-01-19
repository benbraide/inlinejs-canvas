import { GetGlobal } from "@benbraide/inlinejs";
import { SetValue } from "@benbraide/inlinejs-element";
import { CanvasParent } from "./parent";

export class CanvasSet extends CanvasParent{
    protected Render_(ctx: CanvasRenderingContext2D | Path2D){
        Array.from(this.attributes).forEach((attr) => {
            let formattedName = attr.name.split('-').reduce((prev, cur) => (prev + (cur.at(0) || '').toUpperCase() + (cur.substring(1) || '')));
            (formattedName in ctx && typeof ctx[formattedName] !== 'function') && SetValue(<any>ctx, formattedName, attr.value, true);
        });

        super.Render_(ctx);
    }
}

export function CanvasSetCompact(){
    customElements.define(GetGlobal().GetConfig().GetElementName('canvas-set'), CanvasSet);
}
