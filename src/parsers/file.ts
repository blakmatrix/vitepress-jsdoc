import {
  type PluginOptions,
  type DirectoryFile,
  type ParseReturn,
  type FolderData,
  type ParsePromiseResult,
} from '../interfaces.js';
import {writeContentToFile} from '../utilities/file-operations.js';
import {parserFactory} from './factories/parser-factory.js';
import {parsePluginOptions} from './plugin-options.js';

export const parseAndWriteFiles = async (
  lsFolder: FolderData,
  opti: PluginOptions,
): Promise<ParsePromiseResult[]> => {
  const folderData = lsFolder;

  const parsePromises = folderData.paths.map(async (file) => {
    const data = await parseDirectoryFile(file, opti);
    if (data?.relativePathDest) {
      return writeContentToFile(data, data.relativePathDest);
    }

    return undefined;
  });

  return Promise.all(parsePromises);
};

/**
 * Parses the content of a directory file based on its extension and configuration.
 *
 * @param {DirectoryFile} file - The file object representing the directory file to be parsed.
 * @param {PluginOptions} opti - The plugin options providing configuration for the parsing.
 *
 * @returns {Promise<object|undefined>} A promise that resolves with the parsed content of the file, or undefined if the file is a directory or has no associated parser.
 */
export const parseDirectoryFile = async (
  file: DirectoryFile,
  opti: PluginOptions,
): Promise<ParseReturn | undefined> => {
  const {srcFolder, docsFolder, jsDocConfigPath, partials, helpers} =
    parsePluginOptions(opti);

  if (!file.isDir && file.folder) {
    const parser = parserFactory.createParser(file.ext ?? '');

    const config = {
      srcFolder,
      docsFolder,
      jsDocConfigPath,
      partials,
      helpers,
    };

    return parser.parse(file, config);
  }
};
