"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveScale = void 0;
function RemoveScale(value, scale, keys = ['x', 'y']) {
    return keys.reduce((prev, cur, index) => (Object.assign(Object.assign({}, prev), { [cur]: (value[cur] / (Object.values(scale)[index] || 1)) })), {});
}
exports.RemoveScale = RemoveScale;
