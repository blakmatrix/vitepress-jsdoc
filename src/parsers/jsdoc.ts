import {join} from 'node:path';
import jsdoc2md from 'jsdoc-to-markdown';
import {
  type Parser,
  type DirectoryFile,
  type ParseReturn,
  type ParserConfig,
} from '../interfaces.js';
import {readFileContent} from '../utilities/file-reader.js';
import {
  computePaths,
  getFileName,
  getFileFolder,
} from '../utilities/file-path.js';
import {resolveHandlebarsPath} from '../utilities/handlebars.js';

/**
 * The JsDocParser class provides functionality to parse files
 * and generate markdown content based on JSDoc comments.
 *
 * @implements {Parser}
 */
export class JsDocParser implements Parser {
  /**
   * Parses the provided file and returns the generated markdown content.
   *
   * @param {DirectoryFile} file - The file to be parsed.
   * @param {ParserConfig} config - The configuration for parsing.
   * @returns {Promise<ParseReturn | undefined>} - The parsed content or undefined.
   */
  async parse(
    file: DirectoryFile,
    config: ParserConfig,
  ): Promise<ParseReturn | undefined> {
    const fileContent = await this.getFileContent(file);
    const markdownContent = await this.getMarkdownContent(file, config);
    const paths = this.getPaths(file, config);

    return {
      success: Boolean(markdownContent),
      file,
      empty: !markdownContent,
      content: fileContent + markdownContent,
      ...paths,
    };
  }

  /**
   * Retrieves the content of the provided file.
   *
   * @private
   * @param {DirectoryFile} file - The file whose content is to be retrieved.
   * @returns {Promise<string>} - The content of the file.
   */
  private async getFileContent(file: DirectoryFile): Promise<string> {
    return readFileContent(file);
  }

  /**
   * Generates markdown content based on JSDoc comments in the provided file.
   *
   * @private
   * @param {DirectoryFile} file - The file to be parsed for JSDoc comments.
   * @param {ParserConfig} config - The configuration for parsing.
   * @returns {Promise<string>} - The generated markdown content.
   */
  private async getMarkdownContent(
    file: DirectoryFile,
    config: ParserConfig,
  ): Promise<string> {
    const relativePathSrc = getFileFolder(file);
    const {partialsPath, helpersPath} = this.getHandlebarsPaths(config);

    return jsdoc2md.render({
      'no-cache': Boolean(config.jsDocConfigPath),
      files: [
        join(process.cwd(), relativePathSrc, getFileName(file) + file.ext),
      ],
      configure: config.jsDocConfigPath,
      partial: partialsPath,
      helper: helpersPath,
    });
  }

  /**
   * Resolves the paths to handlebars partials and helpers.
   *
   * @private
   * @param {ParserConfig} config - The configuration containing paths.
   * @returns {Object} - An object containing paths to partials and helpers.
   */
  private getHandlebarsPaths(config: ParserConfig): {
    partialsPath: string[];
    helpersPath: string[];
  } {
    const {partialsPath: defaultPartialsPath, helpersPath: defaultHelpersPath} =
      resolveHandlebarsPath();

    return {
      partialsPath:
        config.partials && config.partials.length > 0
          ? config.partials
          : [defaultPartialsPath],
      helpersPath:
        config.helpers && config.helpers.length > 0
          ? config.helpers
          : [defaultHelpersPath],
    };
  }

  /**
   * Computes the paths for the provided file based on the configuration.
   *
   * @private
   * @param {DirectoryFile} file - The file for which paths are to be computed.
   * @param {ParserConfig} config - The configuration for path computation.
   * @returns {Object} - An object containing the computed paths.
   */
  private getPaths(
    file: DirectoryFile,
    config: ParserConfig,
  ): {relativePathDest: string; relativePathSrc: string; dest: string} {
    const {relativePathDest, folderInDest} = computePaths(file, config);
    const relativePathSrc = getFileFolder(file);

    return {
      relativePathDest,
      relativePathSrc,
      dest: folderInDest,
    };
  }
}
