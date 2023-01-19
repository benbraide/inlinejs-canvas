export function Align(value, from, to) {
    if (value === 'center') {
        return ((to - from) / 2);
    }
    if (value === 'end') {
        return (to - from);
    }
    return 0;
}
