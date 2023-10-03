import {join} from 'node:path';
import fs from 'node:fs/promises';
import {type DirectoryFile} from '../interfaces.js';
import {parseVitepressFileHeader} from '../parsers/comment.js';
import {getFileName, getFileFolder} from './file-path.js';

/**
 * @file This module provides functionality to read the content of a file and parse its Vitepress header.
 */

/**
 * Reads the content of a file and parses its Vitepress header.
 *
 * @function
 * @async
 *
 * @param {DirectoryFile} file - The file object representing the file to be read.
 *
 * @returns {Promise<string>} A promise that resolves with the parsed content of the file.
 *
 * @throws Will throw an error if there's an issue reading the file or parsing its content.
 *
 * @example
 *
 * const file = {name: 'example', ext: '.md', folder: '/src/docs'};
 * const content = await readFileContent(file);
 */
export const readFileContent = async (file: DirectoryFile): Promise<string> => {
  try {
    const fileName = getFileName(file);
    const filePath = `${join(getFileFolder(file), fileName + file.ext)}`;

    const content = await fs.readFile(filePath, 'utf8');

    return parseVitepressFileHeader(content, file);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error reading or parsing file: ${error.message}`);
    } else {
      console.error('An unknown error occurred:', error);
    }

    throw error;
  }
};
