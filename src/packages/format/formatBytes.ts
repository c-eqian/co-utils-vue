export const formatBytes = (value: number, decimal = 2) => {
  if (value === 0) {
    return '0 Bytes';
  }

  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const k = 1024;
  const dm = decimal < 0 ? 0 : decimal;
  const i = Math.floor(Math.log(value) / Math.log(k));
  if (i >= sizes.length) {
    return 'Number too large';
  }
  return parseFloat((value / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};
