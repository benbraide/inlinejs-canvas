import { CanvasAlignmentType } from "../types";

export function Align(value: CanvasAlignmentType, from: number, to: number){
    if (value === 'center'){
        return ((to - from) / 2);
    }

    if (value === 'end'){
        return (to - from);
    }

    return 0;
}
