export function FilterByFunction<T = any>(list: Array<any>, name: string){
    return (list.filter(item => (item && typeof item === 'object' && typeof item[name] === 'function')) as Array<T>);
}
