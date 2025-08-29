export function RemoveScale(value, scale, keys = ['x', 'y']) {
    const scaleMap = {
        x: scale.horizontal,
        y: scale.vertical,
        width: scale.horizontal,
        height: scale.vertical,
    };
    return keys.reduce((prev, cur) => {
        return Object.assign(Object.assign({}, prev), { [cur]: (value[cur] / (scaleMap[cur] || 1)) });
    }, {});
}
