import { GetGlobal } from "@benbraide/inlinejs";
import { ICanvasSize } from "../types";
import { CanvasParent } from "./parent";

export class CanvasBox extends CanvasParent{
    public constructor(){
        super({
            size: { width: 0, height: 0 },
        });
    }

    public GetSize(ctx: CanvasRenderingContext2D | null): ICanvasSize{
        return this.state_.size;
    }
}

export function CanvasBoxCompact(){
    customElements.define(GetGlobal().GetConfig().GetDirectiveName('canvas-box'), CanvasBox);
}
