import { FindAncestor } from "@benbraide/inlinejs";
export function FindAncestorByFunction(target, name) {
    const found = FindAncestor(target, el => (name in el));
    return (found ? found : null);
}
