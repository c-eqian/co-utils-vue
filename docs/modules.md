[test](README.md) / Exports

# test

## Table of contents

### Functions

- [cloneDeep](modules.md#clonedeep)
- [isValidKey](modules.md#isvalidkey)

## Functions

### cloneDeep

▸ **cloneDeep**<`T`\>(`source`, `hash?`): `T`

深拷贝

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `unknown` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | `T` |
| `hash` | `WeakMap`<`object`, `any`\> |

#### Returns

`T`

#### Defined in

packages/clone-deep/index.ts:44

___

### isValidKey

▸ **isValidKey**(`key`, `object`): key is never

如果是基础数据类型，直接return
如果是引用数据类型，处理Object、Array等

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` \| `number` \| `symbol` |
| `object` | `object` |

#### Returns

key is never

#### Defined in

packages/clone-deep/index.ts:31
