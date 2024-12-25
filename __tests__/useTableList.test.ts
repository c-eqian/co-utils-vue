import { nextTick } from 'vue';
import { useTableList, type IUseTableList } from '../src';
describe('useTableList', () => {
  const mockApi = jest.fn();
  // 默认配置
  const config = {
    request: {
      api: mockApi,
      params: { pageNum: 1, pageSize: 10 },
      pageNumKey: 'pageNum',
      pageSizeKey: 'pageSize'
    },
    response: {
      listKey: 'data.list',
      totalKey: 'data.total'
    }
  };
  test('初始化时应正确设置默认值', async () => {
    const {
      params,
      tableData,
      tableTotal,
      tableLoading,
      isLastPage } = useTableList(config);

    expect(params.value).toEqual({ pageNum: 1, pageSize: 10 });
    expect(tableData.value).toEqual([]);
    expect(tableTotal.value).toBe(0);
    expect(tableLoading.value).toBe(false);
    expect(isLastPage.value).toBe(false);
  });
  test('handleSearch 应正确处理请求并更新状态', async () => {
    mockApi.mockResolvedValueOnce({
      data: {
        list: [{ id: 1 }, { id: 2 }],
        total: 2
      }
    });

    const {
      handleSearch,
      tableData,
      tableTotal,
      tableLoading,
      isLastPage
    } = useTableList(config);

    await handleSearch();
    expect(mockApi).toHaveBeenCalledWith({ pageNum: 1, pageSize: 10 });
    expect(tableData.value).toEqual([{ id: 1 }, { id: 2 }]);
    expect(tableTotal.value).toBe(2);
    expect(tableLoading.value).toBe(false);
    expect(isLastPage.value).toBe(true); // 因为总条数等于页大小
  });
  test('handleReset 应重置参数并刷新列表', async () => {
    mockApi.mockResolvedValueOnce({
      data: {
        list: [{ id: 1 }],
        total: 1
      }
    });

    const { handleReset, params, tableData, tableTotal } = useTableList(config);

    params.value.pageNum = 2;
    params.value.pageSize = 20;

    await handleReset();

    expect(params.value).toEqual({ pageNum: 1, pageSize: 10 });
    expect(tableData.value).toEqual([{ id: 1 }]);
    expect(tableTotal.value).toBe(1);
  });

  test('handleSizeChange 应更改分页大小并刷新列表', async () => {
    mockApi.mockResolvedValueOnce({
      data: {
        list: [{ id: 1 }],
        total: 1
      }
    });

    const { handleSizeChange, params, tableData, tableTotal } = useTableList(config);

    await handleSizeChange(20);

    expect(params.value).toEqual({ pageNum: 1, pageSize: 20 });
    expect(tableData.value).toEqual([{ id: 1 }]);
    expect(tableTotal.value).toBe(1);
  });

  test('handleCurrentChange 应更改当前页码并刷新列表', async () => {
    mockApi.mockResolvedValueOnce({
      data: {
        list: [{ id: 1 }],
        total: 1
      }
    });

    const { handleCurrentChange, params, tableData, tableTotal } = useTableList(config);

    await handleCurrentChange(2);

    expect(params.value).toEqual({ pageNum: 2, pageSize: 10 });
    expect(tableData.value).toEqual([{ id: 1 }]);
    expect(tableTotal.value).toBe(1);
  });

  test('watcher 应监听指定的键并在变化时触发搜索', async () => {
    const watcherConfig:IUseTableList = {
      request: {
        ...config.request,
        watcher: {
          keys: ['pageNum', 'pageSize'],
          immediate: false,
          deep: true
        }
      },
      response: {
        ...config.response
      }
    };
    mockApi.mockResolvedValueOnce({
      data: {
        list: [{ id: 2 }],
        total: 1
      }
    });
    const { params, tableData } = useTableList(watcherConfig);
    params.value.pageSize = 2
    await nextTick();
    expect(tableData.value).toEqual([{ id: 2 }]);
  });
})
