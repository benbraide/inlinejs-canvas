import { IsObject } from "@benbraide/inlinejs";
import { ValueCast } from "./value-cast";

export function SpreadValue(target: Record<string, any>, items: Array<any>, cast = true, itemIndex = 0, index = 0){
    let keys = Object.keys(target), key = keys[index];
    if (!key || !target.hasOwnProperty(key)){
        return;
    }

    if (IsObject(target[key])){
        return SpreadValue(target[key], items, cast, itemIndex);
    }

    if (itemIndex < items.length){
        return ((!!(target[key] = (cast ? ValueCast(target[key], items[itemIndex]) : items[itemIndex])) && false) || SpreadValue(target, items, cast, (itemIndex + 1), (index + 1)));
    }

    let value = ((itemIndex < items.length) ? items[itemIndex] : (((itemIndex - (keys.length / 2)) < items.length) ? items[itemIndex - (keys.length / 2)] : items[0]));
    target[key] = (cast ? ValueCast(target[key], value) : value);
}
