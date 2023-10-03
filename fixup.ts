import {
  chmodSync,
  writeFileSync,
  readdirSync,
  copyFileSync,
  statSync,
  mkdirSync,
} from 'node:fs';
import {join} from 'node:path';
import {version} from './package.json';

// Configuration for directories and their respective package.json content.
const directories = [
  {
    dir: 'dist/cjs',
    content: JSON.stringify({type: 'commonjs', version}, null, 2),
  },
  {
    dir: 'dist/mjs',
    content: JSON.stringify({type: 'module'}, null, 2),
  },
];

/**
 * Create or overwrite package.json files in specified directories.
 */
function createPackageFiles() {
  for (const {dir, content} of directories) {
    const filePath = join(dir, 'package.json');
    writeFileSync(filePath, content);
    console.log(`File successfully created at: ${filePath}`);
  }
}

/**
 * Set execute permissions for a specified file.
 *
 * @param path - Path to the file.
 */
function setExecutePermissions(path: string) {
  chmodSync(path, 0o755);
  console.log(`Execute permissions set for: ${path}`);
}

/**
 * Copy files from source directory to target directory.
 *
 * @param sourceDir - Source directory path.
 * @param targetDir - Target directory path.
 */
function copyFiles(sourceDir: string, targetDir: string) {
  const items = readdirSync(sourceDir);

  for (const item of items) {
    const sourceItemPath = join(sourceDir, item);
    const targetItemPath = join(targetDir, item);
    const itemStat = statSync(sourceItemPath);

    if (itemStat.isDirectory()) {
      mkdirSync(targetItemPath, {recursive: true});
      copyFiles(sourceItemPath, targetItemPath);
    } else {
      copyFileSync(sourceItemPath, targetItemPath);
      console.log(
        `File successfully copied from: ${sourceItemPath} to ${targetItemPath}`,
      );
    }
  }
}

// Main execution
createPackageFiles();
console.log('All package.json files have been successfully created.');

const binPath = './dist/cjs/src/bin.js';
setExecutePermissions(binPath);

// Copy handlebars files
const sourceHandlebarsPath = './src/handlebars';
const targetHandlebarsCjsPath = './dist/cjs/handlebars';
const targetHandlebarsMjsPath = './dist/mjs/handlebars';

copyFiles(sourceHandlebarsPath, targetHandlebarsCjsPath);
copyFiles(sourceHandlebarsPath, targetHandlebarsMjsPath);
