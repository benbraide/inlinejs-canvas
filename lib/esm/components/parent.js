import { CanvasShape } from "./shape";
export class CanvasParent extends CanvasShape {
    constructor(state) {
        super(state);
    }
    GetSize(ctx) {
        return this.GetChildSize_(ctx);
    }
    FindChildWithPoint(point, ctx) {
        for (let child of this.GetFigureChildren()) {
            let found = child.FindChildWithPoint(point, ctx);
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
        this.GetShapeChildren().forEach(child => child.Paint(ctx));
    }
    OffsetPosition_(position, source, ctx) {
        let myPosition = this.GetOffsetPosition_(ctx);
        return {
            x: (position.x + myPosition.x),
            y: (position.y + myPosition.y),
        };
    }
    GetChildSize_(ctx) {
        let rect = null;
        for (let child of this.GetFigureChildren()) {
            let childRect = child.GetRect(ctx);
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
