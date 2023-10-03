import fs from 'node:fs/promises';
import {join} from 'node:path';
import {mkdirp} from 'mkdirp';
import {deleteAsync} from 'del';
import {type ParseReturn, StatisticType} from '../interfaces';

export const deleteDocsFolder = async (
  docsFolder: string,
  rmPattern: string[],
) => {
  return deleteAsync([`${docsFolder}/**/*`, ...rmPattern]);
};

export const createDocsFolder = (docsFolder: string) => {
  mkdirp.sync(docsFolder);
};

/**
 * Writes the parsed content to a file on disk.
 *
 * @function
 * @async
 *
 * @param {ParseReturn | undefined} parseData - The parsed data to be written to the file.
 * @param {string} dest - The destination path where the file should be written.
 *
 * @returns {Promise<object | null>} A promise that resolves with an object containing details of the saved file, or null if the operation fails.
 * The returned object includes the original parsed data and a type indicating the status of the operation (e.g., included, excluded, error).
 *
 * @throws Will throw an error if there's an issue creating directories or writing to the file system.
 *
 * @example
 *
 * const parseData = {
 *   content: '# My Documentation',
 *   file: {name: 'example', ext: '.md'},
 *   empty: false,
 *   excluded: false
 * };
 * const dest = './docs';
 *
 * const result = await writeContentToFile(parseData, dest);
 */
export const writeContentToFile = async (
  parseData: ParseReturn | undefined,
  dest: string,
): Promise<ParseReturn | undefined> => {
  const root = process.cwd();
  dest = join(root, dest);

  let type = StatisticType.ERROR;

  if (parseData?.excluded) {
    type = StatisticType.EXCLUDE;
  }

  try {
    if (parseData?.content) {
      const path = `${join(dest, parseData.file.name)}.md`;

      mkdirp.sync(dest);
      await fs.writeFile(path, parseData.content, 'utf8');

      type = parseData?.empty ? StatisticType.EMPTY : StatisticType.INCLUDE;
    }

    if (!parseData) {
      throw new Error('Data is undefined');
    }

    if (!parseData.dest) {
      throw new Error('Destination is undefined');
    }

    return {
      ...parseData,
      type,
    };
  } catch {}

  return undefined;
};
