import { exec } from 'node:child_process';
import { join, resolve } from 'node:path';
import chalk from 'chalk';
import consola from 'consola';
import fs from 'fs-extra';
import { enterPath, outputPath, projectRoot } from './paths';
import { run } from './run';
export const getVersion = async () => {
  const { version } = await fs.readJSON(resolve(projectRoot, 'package.json'));
  return version;
};
export async function publish(version: string) {
  await run('git add .', projectRoot);
  await run(`git commit -m "chore: release v${version}"`, projectRoot);
  await run(`git push origin master v${version}`, projectRoot);
  const command = 'npm publish --access public';
  await run(command, outputPath);
  consola.success(`${chalk.green('published successfully')} ${chalk.cyan(`v${version}`)}`);
}
async function updateDocs() {
  await fs.copyFile(join(projectRoot, 'README.md'), join(outputPath, 'README.md'));
  consola.success('README.md');
}
export async function updatePackageVersion() {
  const version = await getVersion();
  const enterPackage = resolve(enterPath, 'release.json');
  const packageJSON = await fs.readJSON(enterPackage);
  packageJSON.version = version;
  await fs.writeJSON(enterPackage, packageJSON, { spaces: 2 });
  consola.success(`${chalk.green('successfully updated version to')} ${chalk.blue(`v${version}`)}`);
  await fs.copyFile(enterPackage, join(outputPath, 'package.json'));
  consola.success('release.json');
  exec(`git show-ref --tags v${version}`, (error, stdout) => {
    if (!error && !stdout) {
      try {
        run(`git tag -a v${version} -m "v${version}"`, projectRoot);
        consola.success(`${chalk.green('successfully created tag')} ${chalk.cyan(`v${version}`)}`);
      } catch (err) {
        consola.warn(err);
      }
    }
  });
  await updateDocs();
  await publish(version);
}
await updatePackageVersion();
