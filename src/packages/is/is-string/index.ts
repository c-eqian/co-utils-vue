import { getTag } from '@/packages/helper/get-tag';

export const isString = (value: any) => {
  const type = typeof value;
  return (
    type === 'string' ||
    (type === 'object' &&
      value !== null &&
      !Array.isArray(value) &&
      getTag(value) === '[object String]')
  );
};
