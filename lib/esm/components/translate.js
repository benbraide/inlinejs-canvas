import { GetGlobal } from "@benbraide/inlinejs";
import { CanvasTransform } from "./transform";
export class CanvasTranslate extends CanvasTransform {
    Apply_(ctx) {
        this.Translate_(ctx);
    }
}
export function CanvasTranslateCompact() {
    customElements.define(GetGlobal().GetConfig().GetElementName('canvas-translate'), CanvasTranslate);
}
