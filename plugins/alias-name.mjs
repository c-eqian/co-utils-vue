export function alias(options = {}) {
  return {
    name: 'alias',
    resolveId(importee, importer, resolveOptions) {
      if (importee.includes('node_modules')) {
        return null;
      }
      const { find, replacement } = options;
      const updatedId = importee.replace(find, replacement);
      // importee 导入模块
      // importer使用该模块的文件
      console.log(111, { importee, updatedId, importer, resolveOptions, this: this });
      return this.resolve(
        updatedId,
        importer,
        Object.assign({ skipSelf: true }, resolveOptions)
      ).then(resolved => {
        if (resolved) return resolved;

        if (!path.isAbsolute(updatedId)) {
          this.warn(
            `rewrote ${importee} to ${updatedId} but was not an abolute path and was not handled by other plugins. ` +
              `This will lead to duplicated modules for the same path. ` +
              `To avoid duplicating modules, you should resolve to an absolute path.`
          );
        }
        return { id: updatedId };
      });
    }
  };
}
