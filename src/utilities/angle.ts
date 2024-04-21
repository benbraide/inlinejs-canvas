export function ResolveAngle(angle: string){
    return (/^.+deg$/.test(angle) ? ((Math.PI / 180) * (parseFloat(angle) || 0)) : (parseFloat(angle) || 0));
}
