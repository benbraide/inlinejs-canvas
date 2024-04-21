import { JournalTry } from "@benbraide/inlinejs";
import { FindAncestorByFunction } from "../utilities/ancestor";
import { CanvasShapeElement } from "./shape";
export class CanvasParentElement extends CanvasShapeElement {
    constructor() {
        super();
        this.options_.isTemplate = false;
    }
    GetSize(ctx) {
        return this.GetChildSize_(ctx);
    }
    FindFigureWithPoint(point, ctx) {
        for (const child of this.GetFigureChildren()) {
            const found = child.FindFigureWithPoint(point, ctx);
            if (found) {
                return found;
            }
        }
        return null;
    }
    OffsetPosition(position, source, ctx) {
        return this.OffsetPosition_(position, source, ctx);
    }
    Render_(ctx) {
        var _a;
        if ((_a = FindAncestorByFunction(this, 'IsPriorityAware')) === null || _a === void 0 ? void 0 : _a.IsPriorityAware()) {
            const inPriority = {};
            this.GetShapeChildren().forEach((child) => {
                const priority = child.GetPriority();
                inPriority[priority] = (inPriority[priority] || []);
                inPriority[priority].push(child);
            });
            Object.keys(inPriority).sort().forEach((priority) => {
                inPriority[priority].forEach(child => JournalTry(() => child.Paint(ctx), 'Canvas.Render'));
            });
        }
        else {
            this.GetShapeChildren().forEach(child => child.Paint(ctx));
        }
    }
    OffsetPosition_(position, source, ctx) {
        const myPosition = this.GetOffsetPosition_(ctx);
        return {
            x: (position.x + myPosition.x),
            y: (position.y + myPosition.y),
        };
    }
    GetChildSize_(ctx) {
        let rect = null;
        for (const child of this.GetFigureChildren()) {
            const childRect = Object.assign({}, child.GetRect(ctx));
            childRect.x = ((childRect.x < 0) ? 0 : childRect.x);
            childRect.y = ((childRect.y < 0) ? 0 : childRect.y);
            if (rect) { //Union with previous
                rect = {
                    x: ((childRect.x < rect.x) ? childRect.x : rect.x),
                    y: ((childRect.y < rect.y) ? childRect.y : rect.y),
                    width: (((rect.x + rect.width) < (childRect.x + childRect.width)) ? (rect.width + (childRect.x + childRect.width) - (rect.x + rect.width)) : rect.width),
                    height: (((rect.y + rect.height) < (childRect.y + childRect.height)) ? (rect.height + (childRect.y + childRect.height) - (rect.y + rect.height)) : rect.height),
                };
            }
            else { //First child
                rect = childRect;
            }
        }
        return (rect ? { width: rect.width, height: rect.height } : { width: 0, height: 0 });
    }
}
