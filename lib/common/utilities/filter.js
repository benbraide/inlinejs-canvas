"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterByFunction = void 0;
function FilterByFunction(list, name) {
    return list.filter(item => (item && typeof item === 'object' && typeof item[name] === 'function'));
}
exports.FilterByFunction = FilterByFunction;
