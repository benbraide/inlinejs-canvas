export function RemoveScale(value, scale, keys = ['x', 'y']) {
    return keys.reduce((prev, cur, index) => (Object.assign(Object.assign({}, prev), { [cur]: (value[cur] / (Object.values(scale)[index] || 1)) })), {});
}
