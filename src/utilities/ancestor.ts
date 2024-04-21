import { FindAncestor } from "@benbraide/inlinejs";

export function FindAncestorByFunction<T = HTMLElement>(target: HTMLElement, name: string){
    const found = FindAncestor(target, el => (name in el));
    return (found ? (found as unknown as T) : null);
}
