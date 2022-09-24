/**
 * 如果是基础数据类型，直接return
 * 如果是引用数据类型，处理Object、Array等
 * @param target
 */
const deepClone = <T extends unknown>(target: T) : T =>{
    if (typeof target === 'object') {
        // 处理数组
        if (Array.isArray(target)) {
            return target.map(item=> deepClone(item)) as T;
        }
        // 非 数组，创建新拷贝对象
        const cloneTarget : T = {} as T;
        for (let _key in target) {
            cloneTarget[_key] = deepClone(target[_key])
        }
        return cloneTarget;
    }
    return target

}
export { deepClone }