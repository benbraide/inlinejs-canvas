export function FilterByFunction(list, name) {
    return list.filter(item => (item && typeof item === 'object' && typeof item[name] === 'function'));
}
