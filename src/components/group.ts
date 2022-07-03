import { GetGlobal } from "@benbraide/inlinejs";
import { CanvasParent } from "./parent";

export class CanvasGroup extends CanvasParent{}

export function CanvasGroupCompact(){
    customElements.define(GetGlobal().GetConfig().GetDirectiveName('canvas-group'), CanvasGroup);
}
