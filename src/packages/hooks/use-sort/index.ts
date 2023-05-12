import { ref, Ref, watchEffect } from 'vue';

export interface SortOption<T> {
  key?: keyof T;
  sortOrder?: 'desc' | 'asc';
  compareFn?: (a: T, b: T) => number;
}

/**
 * 它接收两个参数：data和options。
 * 在useSort函数中，我们使用了watchEffect函数来监听data的变化。
 * 当data发生变化时，我们会根据options中的配置对数据进行排序，并将排序后的结果保存在sortedData中。
 * @param data data是一个Ref类型的数组，表示需要排序的数据；
 * @param options options是一个对象，用于配置排序选项。options对象中可以包含三个属性：
 * key、sortOrder和compareFn。key表示需要根据哪个键值进行排序，sortOrder表示升序还是降序，默认降序，
 * compareFn表示自定义的比较函数。
 */
export const useSort = <T>(data: Ref<T[]>, options: SortOption<T> = {}) => {
  const sortedData = ref<T[]>([] as T[]);

  watchEffect(() => {
    const { key, compareFn } = options;
    const newData = [...data.value];

    if (key) {
      newData.sort((a, b) => {
        const aValue = a[key];
        const bValue = b[key];
        if (compareFn) {
          return compareFn(a, b);
        } else if (typeof aValue === 'number' && typeof bValue === 'number') {
          return options.sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
        } else {
          return options.sortOrder === 'asc'
            ? String(aValue).localeCompare(String(bValue))
            : String(bValue).localeCompare(String(aValue));
        }
      });
    } else if (compareFn) {
      newData.sort(compareFn);
    }

    sortedData.value = newData as any;
  });

  return sortedData;
};
