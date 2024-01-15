import { consola } from 'consola';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync as exec } from 'node:child_process';
import fs from 'fs-extra';
const __dirname = fileURLToPath(new URL('.', import.meta.url));
export const DIR_ROOT = resolve(__dirname, '..');
async function build(v: 'rc' | 'alpha' | '' = '') {
  consola.info('Clean up ...');
  exec('npm run clean:dist', { stdio: 'inherit' });
  consola.info('Build ...');
  exec('npm run build', { stdio: 'inherit' });
  consola.info('Rollup ...');
  if (v === 'rc') {
    exec('npm run release:rc', { stdio: 'inherit' });
  } else if (v === 'alpha') {
    exec('npm run release:alpha', { stdio: 'inherit' });
  } else {
    exec('npm run release', { stdio: 'inherit' });
  }
}

async function updatePackage() {
  const ROOT_PKG = join(DIR_ROOT, 'package.json');
  const UPDATE_PKG = join(DIR_ROOT, 'src/package.json');
  const { version } = await fs.readJSON(ROOT_PKG);
  const packageJSON = await fs.readJSON(UPDATE_PKG);
  packageJSON.version = version;
  await fs.writeJSON(UPDATE_PKG, packageJSON, { spaces: 2 });
  await fs.copy(UPDATE_PKG, join(DIR_ROOT, 'dist/package.json'));
}
async function updateDocs() {
  await fs.copyFile(
    join(DIR_ROOT, 'CHANGELOG.md'),
    join(DIR_ROOT, '/docs/examples/version/CHANGELOG.md')
  );
}
async function gitPush() {
  /**
   * 如果由于无法提交推送，手动操作即可
   */
  const ROOT_PKG = join(DIR_ROOT, 'package.json');
  const { version } = await fs.readJSON(ROOT_PKG);
  exec('git add .', { stdio: 'inherit' });
  exec(`git commit -m "chore: release v${version}"`, { stdio: 'inherit' });
  exec('git push origin master', { stdio: 'inherit' });
  let command = 'npm publish --access public';
  exec(command, { stdio: 'inherit', cwd: join(DIR_ROOT, 'dist') });
  consola.success('Published');
}
async function run() {
  await build();
  await updatePackage();
  await updateDocs();
  await gitPush();
}

run();
