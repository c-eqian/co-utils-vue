/**
 * @Author: eqian
 * @Date: 2024/5/13
 * @email: 2429120006@qq.com
 * @Description: 数据请求列表
 */
import { type Ref, ref } from 'vue-demi';
import { useCloneDeep } from '../useCloneDeep';
import { isFunction } from '../../is/isFunction';
import { deepObjectValue } from '../../helper/deepValue';
export interface UseTableList<T = any, P = any> {
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
    // handleResponseData?: (list: T[], res?: IResponse) => T[];
  };
}

/**
 * 表格分页数据请求
 * @param config
 */
export const useTableList = <T = any, P = any>(config: UseTableList<T, P>) => {
  const { params: requestParams = {} as P } = config.request;
  const cloneConfig = useCloneDeep(config);
  const {
    pageNumKey = 'pageNum',
    pageSizeKey = 'pageSize',
    api,
    handleParams
  } = cloneConfig.request;
  const { listKey = 'list', totalKey = 'total' } = cloneConfig.response || {};
  const tableData = ref<T[]>([]);
  const tableTotal = ref(0);
  const tableLoading = ref(false);
  const params = ref(useCloneDeep(requestParams) as P) as Ref<P>;
  const handleSearch = async (pageNum = 1) => {
    if (isFunction(handleParams)) {
      params.value = handleParams(useCloneDeep(params.value) as P);
    }
    if (pageNumKey in params) {
      params.value[pageNumKey] = pageNum;
    }
    try {
      tableLoading.value = true;
      const res = (await api(params.value)) as T;
      tableData.value = deepObjectValue(res, listKey);
      tableTotal.value = deepObjectValue(res, totalKey);
    } catch (e) {
      return Promise.reject(e);
    } finally {
      tableLoading.value = false;
    }
    return Promise.resolve();
  };
  /**
   * 重置查询参数
   */
  const handleReset = () => {
    params.value = useCloneDeep(requestParams);
    return handleSearch();
  };
  /**
   * 切换分页大小 刷新列表
   */
  const handleSizeChange = (pageSize: number) => {
    if (pageSizeKey in (params.value as any)) {
      (params.value as P)[pageSizeKey] = pageSize;
    }
    return handleSearch(1);
  };
  /**
   * 切换页码 刷新列表
   */
  const handleCurrentChange = (pageNum: number) => {
    return handleSearch(pageNum);
  };
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
