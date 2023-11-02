## 描述

在开发过程中，经常会用到搜索栏，实现大致效果如下，基于`tsx`进行实现

![image-20231008155940247](https://c-typora.oss-cn-guangzhou.aliyuncs.com/c-typora/image-20231008155940247.png)

## 参数类型定义

新建`type.ts`文件

```typescript
export interface ISearchConfig {
    /**
     * 输入框类型
     */
    type: 'input' | 'select' | 'daterange' | 'datetimerange' | 'datetime' | 'date';
    /**
     * 名称
     */
    label: string;
    /**
     * 字典键 应用于选择框,如果配置该属性，optionList配置无效
     */
    dictKey?: string;
    /**
     * 占位符
     */
    placeholder?: string | string[];
    /**
     * 绑定的键
     */
    prop: string;
    /**
     * 是否折叠
     */
    collapse?: boolean;
    /**
     * 占比，默认6
     */
    span?: number;
    /**
     * 应用于选择框
     */
    optionList?: {
        /**
         * 选择框显示的标签
         */
        label: string;
        /**
         * 标签对应的值
         */
        value: string |number;
        /**
         * 是否禁用
         */
        disabled?: boolean;
    }[];
}
```

## `props`参数定义

```typescript
  props: {
    /**
     * 生成搜索配置
     */
    searchConfig: {
      type: Array as PropType<ISearchConfig[]>,
      default: () => {}
    },
    /**
     * 搜索折叠
     */
    collapse: {
      type: Boolean,
      default: false
    },
    /**
     * 表单宽度
     */
    labelWidth: {
      type: String,
      default: '80px'
    }
  },
```

## `emits`事件定义

```typescript
  /**
   * on-search 点击搜索按钮触发
   * on-reset 重置按钮触发
   */
  emits: ['on-search', 'on-reset'],
```

## 生成表单数据

根据`searchConfig`的`prop`生成对应的对象

```tsx
    const formData = ref({});// 开始未知需要生成哪些，所以先设置空对象
    props.searchConfig.forEach(item => {
        // 遍历prop,因为时间范围绑定的是数组，所以需要判断是否是时间范围类型，否则设置空字符串
      formData.value[item.prop] = ['daterange', 'datetimerange'].includes(item.type) ? [] : '';
    });
```

## 处理渲染DOM

### 输入框

```tsx
    /**
       * 渲染输入框
       * @param item
       */
    const renderInput = (item: ISearchConfig) => {
      return <ElInput placeholder={Array.isArray(item.placeholder) ? '请输入' : item.placeholder || '请输入'}
                      v-model={this.formData[item.prop]}>
      </ElInput>;
    };
```

### 选择框（待完善）

```tsx
      /**
       * 渲染选择框
       * ZkSelect组件为自定义组件
       * @param item
       */
    const renderSelect = (item: ISearchConfig) => {
      if (item.dictKey) {
        return <ZkSelect dictKey={'sys_yes_no'}
                         placeholder={Array.isArray(item.placeholder)
                           ? '请选择'
                           : item.placeholder || '请选择'}
                         v-model:value={this.formData[item.prop]}>
        </ZkSelect>;
      }
      return <ZkSelect
                       placeholder={Array.isArray(item.placeholder)
                         ? '请选择'
                         : item.placeholder || '请选择'}
                       options={item.optionList}
                       v-model:value={this.formData[item.prop]}>
          </ZkSelect>;
    };
```

### 渲染时间组件

```tsx
      /**
       * 渲染时间
       * @param item
       */
    const renderDatePicker = (item: ISearchConfig) => {
      if (['daterange', 'datetimerange'].includes(item.type)) {
        return <ElDatePicker startPlaceholder={Array.isArray(item.placeholder) ? item.placeholder[0] : '开始时间'}
                             endPlaceholder={Array.isArray(item.placeholder) ? item.placeholder[1] : '结束时间'}
                             type={item.type as any} v-model={this.formData[item.prop]}>

        </ElDatePicker>;
      }
      return <ElDatePicker placeholder={Array.isArray(item.placeholder) ? '请选择时间' : item.placeholder || '请选择时间'}
                           type={item.type as any} v-model={this.formData[item.prop]}>

          </ElDatePicker>;
    };
```

## 渲染函数

根据`type`类型进行处理需要渲染哪些组件

```tsx
    const handleRender = () => {
      const VNode = searchConfigCompute.value.map(item => {
        let _VNode: any = null;
        if (item.type === 'input') {
          _VNode = renderInput(item);
        } if (item.type === 'select') {
          _VNode = renderSelect(item);
        } else if (['daterange', 'datetimerange', 'datetime', 'date'].includes(item.type)) {
          _VNode = renderDatePicker(item);
        }
        return <ElCol span={item.span} v-show={!(item.collapse && collapseComputed.value)}>
          <ElFormItem label={item.label} prop={item.prop}>
            {_VNode}
          </ElFormItem>
        </ElCol>;
      });
      VNode.push(
        <ElCol span={6}>
          <el-form-item>
            <ElButton type={'primary'} onClick={handleOnClick} icon={'Search'}>查询</ElButton>
            <ElButton icon={'RefreshLeft'} onClick={handleOnReset}>重置</ElButton>
          </el-form-item>
        </ElCol>
      );
      return VNode;
    };
```

## 事件

```tsx
    const handleOnClick = () => {
      this.$emit('on-search', this.formData);
    };
    /**
     * 重置
     */
    const handleOnReset = () => {
      formRef.value?.resetFields();
      this.$emit('on-reset', this.formData);
    };
```

## 渲染组件

```tsx
      <div>
          <ElForm ref={formRef} model={this.formData} labelWidth={this.labelWidth}>
            <ElRow>
              {handleRender()
              }
            </ElRow>
          </ElForm>
      </div>
```

## 测试验证

测试代码如下

```vue
<script setup lang="ts">

import AppPage from '@/components/app-page/packages/index.vue';
import ZkCustomSearch from '@/components/ZkCustomSearch/index';
import { ISearchConfig } from '@/components/ZkCustomSearch/type';

const config: ISearchConfig[] = [{
  type: 'input',
  label: '测试',
  prop: 'name',
  span: 6
},
{
  type: 'datetimerange',
  label: '测试',
  prop: 'time',
  span: 6
},
{
  type: 'select',
  label: '测试',
  prop: 'select1',
  dictKey: 'sys_yes_no',
  span: 6
},
{
  type: 'datetimerange',
  label: '测试',
  prop: 'time',
  span: 6
},
{
  type: 'select',
  label: '测试',
  prop: 'name',
  optionList: [
    {
      label: '选择1',
      value: 1
    },
    {
      label: '选择2',
      value: 2
    }
  ],
  span: 6
},
{
  type: 'datetimerange',
  label: '测试',
  prop: 'time',
  span: 6
},
{
  type: 'input',
  label: '测试',
  prop: 'name',
  span: 6
},
{
  type: 'datetimerange',
  label: '测试',
  prop: 'time',
  span: 6
},
{
  type: 'datetimerange',
  label: '测试',
  prop: 'time',
  span: 6,
  collapse: true
}
];
const handleSearch = (p:any) => {
  console.log(p);
};
</script>

<template>
  <app-page>
    <template #search="{collapse}">
      <zk-custom-search
        :collapse="collapse"
        :search-config="config"
        @on-search="handleSearch"
        @on-reset="handleSearch"
      />
    </template>
  </app-page>
</template>

<style scoped lang="scss">

</style>
```

![ev](https://c-typora.oss-cn-guangzhou.aliyuncs.com/c-typora/ev.gif)

## 完整代码

```tsx
import type { FormInstance } from 'element-plus';
import { ElButton, ElCol, ElDatePicker, ElForm, ElFormItem, ElInput, ElRow, ElSelect } from 'element-plus';
import { computed, defineComponent, PropType, ref } from 'vue';

import { ISearchConfig } from './type';

export default defineComponent({
  name: 'ZkCustomSearch',
  props: {
    /**
     * 生成搜索配置
     */
    searchConfig: {
      type: Array as PropType<ISearchConfig[]>,
      default: () => {}
    },
    /**
     * 搜索折叠
     */
    collapse: {
      type: Boolean,
      default: false
    },
    /**
     * 表单宽度
     */
    labelWidth: {
      type: String,
      default: '80px'
    }
  },
  /**
   * on-search 点击搜索按钮触发
   * on-reset 重置按钮触发
   */
  emits: ['on-search', 'on-reset'],
  setup(props, { slots }) {
    const formData = ref({});
    props.searchConfig.forEach(item => {
      formData.value[item.prop] = ['daterange', 'datetimerange'].includes(item.type) ? [] : '';
    });
    return {
      formData
    };
  },
  render() {
    const formRef = ref<FormInstance>();
    const collapseComputed = computed(() => this.collapse);
    const handleOnClick = () => {
      this.$emit('on-search', this.formData);
    };
    /**
     * 重置
     */
    const handleOnReset = () => {
      formRef.value?.resetFields();
      this.$emit('on-reset', this.formData);
    };
    const searchConfigCompute = computed(() => this.$props.searchConfig);

    /**
       * 渲染输入框
       * @param item
       */
    const renderInput = (item: ISearchConfig) => {
      return <ElInput placeholder={Array.isArray(item.placeholder) ? '请输入' : item.placeholder || '请输入'}
                      v-model={this.formData[item.prop]}>
      </ElInput>;
    };
      /**
       * 渲染选择框
       * @param item
       */
    const renderSelect = (item: ISearchConfig) => {
      return <ElSelect placeholder={Array.isArray(item.placeholder) ? '请选择' : item.placeholder || '请选择'}
                       v-model={this.formData[item.prop]}>
          </ElSelect>;
    };
      /**
       * 渲染时间
       * @param item
       */
    const renderDatePicker = (item: ISearchConfig) => {
      if (['daterange', 'datetimerange'].includes(item.type)) {
        return <ElDatePicker startPlaceholder={Array.isArray(item.placeholder) ? item.placeholder[0] : '开始时间'}
                             endPlaceholder={Array.isArray(item.placeholder) ? item.placeholder[1] : '结束时间'}
                             type={item.type as any} v-model={this.formData[item.prop]}>

        </ElDatePicker>;
      }
      return <ElDatePicker placeholder={Array.isArray(item.placeholder) ? '请选择时间' : item.placeholder || '请选择时间'}
                           type={item.type as any} v-model={this.formData[item.prop]}>

          </ElDatePicker>;
    };
    const handleRender = () => {
      const VNode = searchConfigCompute.value.map(item => {
        let _VNode: any = null;
        if (item.type === 'input') {
          _VNode = renderInput(item);
        } if (item.type === 'select') {
          _VNode = renderSelect(item);
        } else if (['daterange', 'datetimerange', 'datetime', 'date'].includes(item.type)) {
          _VNode = renderDatePicker(item);
        }
        return <ElCol span={item.span} v-show={!(item.collapse && collapseComputed.value)}>
          <ElFormItem label={item.label} prop={item.prop}>
            {_VNode}
          </ElFormItem>
        </ElCol>;
      });
      VNode.push(
        <ElCol span={6}>
          <el-form-item>
            <ElButton type={'primary'} onClick={handleOnClick} icon={'Search'}>查询</ElButton>
            <ElButton icon={'RefreshLeft'} onClick={handleOnReset}>重置</ElButton>
          </el-form-item>
        </ElCol>
      );
      return VNode;
    };
    return (
      <div>
          <ElForm ref={formRef} model={this.formData} labelWidth={this.labelWidth}>
            <ElRow>
              {handleRender()
              }
            </ElRow>
          </ElForm>
      </div>
    );
  }
});
```

