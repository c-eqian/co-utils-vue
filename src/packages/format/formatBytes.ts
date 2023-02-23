export const formatBytes = (bytes: number, decimal: number) => {
  if (0 === bytes) return '0B';
  let e = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    f = Math.floor(Math.log(bytes) / Math.log(1024));
  return parseFloat((bytes / Math.pow(1024, f)).toFixed(decimal || 2)) + e[f];
};
