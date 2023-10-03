import {type Parser} from '../../interfaces';
import {JsDocParser} from '../jsdoc';
import {VueParser} from '../vue';

/**
 * Factory object for creating parser instances based on file types.
 *
 * @namespace parserFactory
 */
export const parserFactory = {
  /**
   * Creates and returns a parser instance based on the provided file type.
   *
   * @param {string} fileType - The type of the file (e.g., '.js', '.ts', '.vue').
   * @returns {Parser} - An instance of a parser corresponding to the file type.
   * @throws {Error} - Throws an error if the provided file type is unsupported.
   */
  createParser(fileType: string): Parser {
    switch (fileType) {
      case '.js':
      case '.ts': {
        return new JsDocParser();
      }

      case '.vue': {
        return new VueParser();
      }

      default: {
        throw new Error(`Unsupported file type: "${fileType}"`);
      }
    }
  },
};
