import readline from 'node:readline';
import {type ParseReturn, type FolderData} from '../interfaces.js';

/**
 * Asynchronously prints the paths of files from the provided `FolderData` to the console.
 * For each file:
 * - If it's a directory, it's skipped.
 * - If it's a file, its path is printed to the console.
 *
 * @function
 * @async
 * @param {FolderData} lsFolder - The data structure containing paths and other folder-related information.
 * @returns {Promise<void>} A promise that resolves once all file paths have been printed.
 * @example
 *
 * const folderData = {
 *   paths: [...],
 *   tree: [...],
 *   excluded: [...]
 * };
 * await printFiles(folderData);
 */
export const printFiles = async (lsFolder: FolderData) => {
  const printPromises: Array<Promise<void>> = lsFolder.paths.map(
    async (file) => {
      return new Promise((resolve) => {
        if (file.isDir) {
          resolve();
        } else {
          readline.clearLine(process.stdout, 0);
          readline.cursorTo(process.stdout, 0);
          process.stdout.write(` ${file.path} `);
          setTimeout(resolve, 20);
        }
      });
    },
  );

  await Promise.all(printPromises);

  readline.clearLine(process.stdout, 0);
  readline.cursorTo(process.stdout, 0);
};

/**
 * Prints statistics about the processed files to the console.
 * - First, it prints all excluded files with the label 'EXCLUDE'.
 * - Then, for each entry in the `result`:
 *   - If there's no file associated with the entry, it's skipped.
 *   - Otherwise, it logs the type of the entry and the source to destination mapping.
 *
 * @function
 * @param {FolderData} lsFolder - The data structure containing paths and other folder-related information.
 * @param {ParseReturn[]} result - An array of results from the parsing process.
 * @example
 *
 * const folderData = {
 *   paths: [...],
 *   tree: [...],
 *   excluded: [...]
 * };
 * const results = [...];
 * printStats(folderData, results);
 */
export const printStats = (lsFolder: FolderData, result: ParseReturn[]) => {
  for (const file of lsFolder.excluded) {
    console.log(' EXCLUDE', `${file.folder}${file.name + file.ext}`);
  }

  console.log();

  for (const entry of result) {
    if (!entry.file) continue;

    const sourceFilePath = `${entry.relativePathSrc}${entry.file.name}${entry.file.ext}`;
    const destinationFilePath = `${entry.relativePathDest}${entry.file.name}.md`;

    console.log(
      ` ${entry.type}`,
      `${sourceFilePath} -> ${destinationFilePath}`,
    );
  }
};
