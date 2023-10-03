import {join} from 'node:path';
import compileTemplates from 'vue-docgen-cli/lib/compileTemplates';
import {extractConfig} from 'vue-docgen-cli/lib/docgen';
import {computePaths, getFileName, getFileFolder} from '../utilities/file-path';
import {
  type DirectoryFile,
  type ParseReturn,
  type Parser,
  type ParserConfig,
} from '../interfaces';

/**
 * Class representing a parser for Vue files.
 * @class
 * @implements {Parser}
 */
export class VueParser implements Parser {
  /**
   * Parses the content of a Vue file and returns its documentation.
   *
   * @param {DirectoryFile} file - The file object representing the Vue file to be parsed.
   * @param {ParserConfig} config - The configuration for the parsing process.
   *
   * @returns {Promise<ParseReturn|undefined>} A promise that resolves with the parsed content of the Vue file, or undefined if the parsing fails.
   */
  async parse(
    file: DirectoryFile,
    config: ParserConfig,
  ): Promise<ParseReturn | undefined> {
    const fileName = getFileName(file);
    const relativePathSrc = getFileFolder(file);
    const vueDocGenCliConf = await extractConfig(
      join(process.cwd(), relativePathSrc),
    );
    const docgenConfig = {
      ...vueDocGenCliConf,
      components: fileName + file.ext,
    };

    const data = await compileTemplates(
      'add',
      join(docgenConfig.componentsRoot, fileName + file.ext),
      docgenConfig,
      fileName + file.ext,
    );

    const {relativePathDest, folderInDest} = computePaths(file, config);

    return {
      success: Boolean(data.content),
      file,
      empty: !data.content,
      content: data.content,
      relativePathDest,
      relativePathSrc,
      dest: folderInDest,
    };
  }
}
