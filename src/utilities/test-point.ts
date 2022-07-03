import { ICanvasPosition, ICanvasScaleValue, ICanvasSize } from "../types";

export function TestPoint(point: ICanvasPosition, position: ICanvasPosition, size: ICanvasSize, scale: ICanvasScaleValue){
    return (point.x >= position.x && point.y >= position.y && point.x < (position.x + (size.width * scale.horizontal)) && point.y < (position.y + (size.height * scale.vertical)));
}
