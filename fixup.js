import {
  chmodSync,
  readdirSync,
  copyFileSync,
  statSync,
  mkdirSync,
} from 'node:fs';
import {join} from 'node:path';

/**
 * Set execute permissions for a specified file.
 *
 * @param path - Path to the file.
 */
function setExecutePermissions(path) {
  chmodSync(path, 0o755);
  console.log(`Execute permissions set for: ${path}`);
}

/**
 * Copy files from source directory to target directory.
 *
 * @param sourceDir - Source directory path.
 * @param targetDir - Target directory path.
 */
function copyFiles(sourceDir, targetDir) {
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
      // Console.log(
      //   `File successfully copied from: ${sourceItemPath} to ${targetItemPath}`,
      // );
    }
  }

  console.log('Files succesfully coppied.');
}

// Main execution

const binPath = './dist/esm/bin.js';
setExecutePermissions(binPath);

// Copy handlebars files
const sourceHandlebarsPath = './src/handlebars';
const targetHandlebarsCjsPath = './dist/commonjs/handlebars';
const targetHandlebarsMjsPath = './dist/esm/handlebars';

copyFiles(sourceHandlebarsPath, targetHandlebarsCjsPath);
copyFiles(sourceHandlebarsPath, targetHandlebarsMjsPath);
