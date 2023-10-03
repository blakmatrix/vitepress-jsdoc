import {join} from 'node:path';
import {type DirectoryFile, type ParserConfig} from '../interfaces.js';

/**
 * @file This module provides utility functions for handling file paths.
 */

/**
 * Retrieves the file name. If the file name is '\_\_index\_\_', it returns 'index'.
 *
 * @function
 *
 * @param {DirectoryFile} file - The file object to retrieve the name from.
 *
 * @returns {string} The name of the file.
 *
 * @example
 *
 * const file = {name: '__index__'};
 * const name = getFileName(file); // 'index'
 */
export const getFileName = (file: DirectoryFile): string => {
  return file.name === '__index__' ? 'index' : file.name;
};

/**
 * Retrieves the folder of the file.
 *
 * @function
 *
 * @param {DirectoryFile} file - The file object to retrieve the folder from.
 *
 * @returns {string} The folder of the file.
 *
 * @example
 *
 * const file = {folder: '/src/components'};
 * const folder = getFileFolder(file); // '/src/components'
 */
export const getFileFolder = (file: DirectoryFile): string => {
  return file.folder ?? '';
};

/**
 * Computes the relative destination path and the absolute folder path in the destination directory.
 *
 * @function
 *
 * @param {DirectoryFile} file - The file object to compute paths for.
 * @param {ParserConfig} config - The configuration object containing source and documentation folders.
 *
 * @returns {object} An object containing:
 *  - relativePathDest: The relative path in the destination directory.
 *  - folderInDest: The absolute path of the folder in the destination directory.
 *
 * @example
 *
 * const file = {folder: '/src/components'};
 * const config = {srcFolder: '/src', docsFolder: '/docs'};
 * const paths = computePaths(file, config);
 */
export const computePaths = (file: DirectoryFile, config: ParserConfig) => {
  const {srcFolder, docsFolder} = config;
  const relativePathDest = join(
    docsFolder,
    getFileFolder(file).replace(srcFolder, ''),
  );
  const folderInDest = join(process.cwd(), relativePathDest);
  return {relativePathDest, folderInDest};
};
