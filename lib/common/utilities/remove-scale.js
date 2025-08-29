"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveScale = void 0;
function RemoveScale(value, scale, keys = ['x', 'y']) {
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
exports.RemoveScale = RemoveScale;
