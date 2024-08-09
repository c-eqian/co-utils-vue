/**
 * @Author: eqian
 * @Date: 2024/5/13
 * @email: 2429120006@qq.com
 * @Description: 数据请求列表
 */
import { type Ref, ref, watch } from 'vue-demi';
import { useCloneDeep } from '../useCloneDeep';
import { isFunction } from '../../is/isFunction';
import { deepObjectValue } from '../../helper/deepValue';
import { isArray } from '../../is/isArray';
import { isEmpty } from '../../is/isEmpty';

export interface UseTableList<T = any, P = any, D = any> {
  request: {
    /**
     * 请求方法
     */
    api: (params: P) => Promise<T>;
    /**
     * 请求参数
     */
    params?: P;
    /**
     * 分页键
     * @default pageNum
     */
    pageNumKey?: string;
    /**
     * 分页键
     * @default pageSize
     */
    pageSizeKey?: string;
    /**
     * 接口请求前处理
     */
    handleParams?: (params: P) => P;
    /**
     * 观察
     * 默认监听pageNumKey，pageSizeKe变化触发请求
     * 如果传入空数组，不监听
     */
    watcher?: (keyof P)[];
  };
  /**
   * 响应数据处理
   */
  response?: {
    /**
     * 返回结果的数据列表键
     * @default list
     * @example
     * ```ts
     * // 响应数据为 { data: { list: [] } } 则传递 data.list;
     * ````
     */
    listKey?: string;
    /**
     * 返回结果的数据列表键
     * @default total
     * ```ts
     * // 响应数据为 { data: { list: [], total: 0 } } 则传递 data.total;
     * ```
     */
    totalKey?: string;
    /**
     * 自定义响应时处理，返回值必须包含listKey，totalKey，如果为空，应返回对应的默认值，即list、total
     * @param res
     */
    responseHandler?: (res: D) => any;
  };
}

/**
 * 表格分页数据请求
 * @param config
 */
export const useTableList = <T = any, P extends object = any, D = any>(
  config: UseTableList<T, P, D>
) => {
  const { params: requestParams = {} as P, watcher } = config.request;
  const cloneConfig = useCloneDeep(config);
  const {
    pageNumKey = 'pageNum',
    pageSizeKey = 'pageSize',
    api,
    handleParams
  } = cloneConfig.request;
  const { listKey = 'list', totalKey = 'total', responseHandler } = cloneConfig.response || {};
  const tableData = ref<T[]>([]);
  const tableTotal = ref(0);
  const isExplicitly = ref(false);
  const tableLoading = ref(false);
  const params = ref(useCloneDeep(requestParams) as P) as Ref<P>;
  const handleSearch = async (pageNum?: number) => {
    if (isFunction(handleParams)) {
      params.value = handleParams(useCloneDeep(params.value) as P);
    }
    if (pageNum && pageNumKey in params.value) {
      params.value[pageNumKey] = pageNum;
    }
    try {
      tableLoading.value = true;
      const res = (await api.call(null, params.value)) as D;
      if (isFunction(responseHandler)) {
        const _res = responseHandler.call(null, res);
        if (_res) {
          tableData.value = deepObjectValue(_res, listKey) ?? [];
          tableTotal.value = deepObjectValue(_res, totalKey) ?? 0;
        }
      } else {
        tableData.value = deepObjectValue(res, listKey) ?? [];
        tableTotal.value = deepObjectValue(res, totalKey) ?? 0;
      }
    } catch (e) {
      return Promise.reject(e);
    } finally {
      tableLoading.value = false;
      isExplicitly.value = false;
    }
    return Promise.resolve();
  };
  /**
   * 重置查询参数
   */
  const handleReset = () => {
    params.value = useCloneDeep(requestParams);
    isExplicitly.value = true;
    return handleSearch();
  };
  /**
   * 切换分页大小 刷新列表
   */
  const handleSizeChange = (pageSize: number) => {
    if (pageSizeKey in (params.value as any)) {
      (params.value as P)[pageSizeKey] = pageSize;
    }
    isExplicitly.value = true;
    return handleSearch(1);
  };
  /**
   * 切换页码 刷新列表
   */
  const handleCurrentChange = (pageNum: number) => {
    isExplicitly.value = true;
    return handleSearch(pageNum);
  };
  if ((isArray(watcher) && !isEmpty(watcher)) || watcher === undefined) {
    watch(
      () =>
        watcher === undefined
          ? [params.value[pageNumKey], params.value[pageSizeKey]]
          : watcher.map(key => params.value[key]),
      () => {
        if (!isExplicitly.value) {
          handleSearch().then();
        }
      },
      {
        deep: true
      }
    );
  }
  return {
    params,
    tableData,
    tableTotal,
    tableLoading,
    handleSearch,
    handleReset,
    handleSizeChange,
    handleCurrentChange
  };
};
