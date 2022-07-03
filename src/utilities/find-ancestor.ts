export function FindAncestor(target: Element, prop: string){
    let ancestor = target.parentNode;
    while (ancestor && !(prop in ancestor)){
        ancestor = ancestor.parentNode;
    }

    return ancestor;
}
