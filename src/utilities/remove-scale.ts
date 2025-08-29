import { ICanvasScaleValue } from "../types";

export function RemoveScale<T extends Record<string, number>>(value: T, scale: ICanvasScaleValue, keys = ['x', 'y']){
    const scaleMap: Record<string, number> = {
        x: scale.horizontal,
        y: scale.vertical,
        width: scale.horizontal,
        height: scale.vertical,
    };
    
    return <T>keys.reduce((prev, cur) => {
        return { ...prev, [cur]: (value[cur] / (scaleMap[cur] || 1)) };
    }, {});
}
