import {printFiles, printStats} from '../utilities/output.js';
import {parseAndWriteFiles} from '../parsers/file.js';
import {
  type PluginOptions,
  type FolderData,
  type ParseReturn,
} from '../interfaces.js';
/**
 * Represents the plugin options provided to the application.
 * @typedef PluginOptions
 * @property {string} dist - Destination path for the generated files.
 * @property {string} exclude - Patterns to exclude from processing.
 * @property {string} folder - Main folder for processing.
 * @property {string[]} helpers - List of helper functions or modules.
 * @property {string} include - Patterns to include for processing.
 * @property {string} jsDocConfigPath - Path to the JSDoc configuration file.
 * @property {string[]} partials - List of partial templates or modules.
 * @property {string} readme - Path to the README file.
 * @property {string[]} rmPattern - Patterns for files to be removed.
 * @property {string} source - Source path for the files to be processed.
 * @property {string} title - Title for the generated documentation.
 * @property {boolean} watch - Flag to determine if the application should watch for file changes.
 */

/**
 * Represents the data of a folder, including its paths, tree structure, and excluded files.
 * @typedef FolderData
 * @property {DirectoryFile[]} excluded - List of excluded files.
 * @property {DirectoryFile[]} paths - List of all paths in the folder.
 * @property {FileTree[]} tree - Tree structure of the folder.
 */

/**
 * Represents the return value after parsing a file.
 * @typedef ParseReturn
 * @property {string} content - Content of the parsed file.
 * @property {string} dest - Destination path for the parsed file.
 * @property {boolean} empty - Flag to determine if the file is empty.
 * @property {boolean} [excluded] - Flag to determine if the file was excluded.
 * @property {DirectoryFile} file - Details of the parsed file.
 * @property {string} relativePathDest - Relative destination path for the parsed file.
 * @property {string} relativePathSrc - Relative source path of the parsed file.
 * @property {boolean} [success] - Flag to determine if the parsing was successful.
 * @property {StatisticType} [type] - Type of statistic for the parsed file.
 */

/**
 * The `FileProcessor` class provides functionalities to process files
 * within a specified folder. It offers methods to print, parse, write,
 * and filter files based on the provided arguments and configurations.
 */
export class FileProcessor {
  /**
   * Processes the files within the specified folder based on the provided arguments.
   *
   * @param {FolderData} lsFolder - Data representing the folder and its contents.
   * @param {PluginOptions} options - plugin options to guide the file processing.
   * @returns {Promise<ParseReturn[]>} A promise that resolves to an array of processed files.
   *
   * @example
   * const processor = new FileProcessor();
   * const processedFiles = await processor.processFiles(folderData, cliArgs);
   */
  async processFiles(
    lsFolder: FolderData,
    options: PluginOptions,
  ): Promise<ParseReturn[]> {
    await printFiles(lsFolder);
    const result = await parseAndWriteFiles(lsFolder, options);
    return result.filter((entry): entry is ParseReturn => entry !== undefined);
  }
}
