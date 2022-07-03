import { ICanvasScaleValue } from "../types";

export function RemoveScale<T>(value: T, scale: ICanvasScaleValue, keys = ['x', 'y']){
    return <T>keys.reduce((prev, cur, index) => ({ ...prev, [cur]: (value[cur] / (Object.values(scale)[index] || 1)) }), {});
}
