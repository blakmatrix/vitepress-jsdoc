import {type Parser} from '../../interfaces.js';
import {JsDocParser} from '../jsdoc.js';

/**
 * Factory object for creating parser instances based on file types.
 *
 * @namespace parserFactory
 */
export const parserFactory = {
  /**
   * Creates and returns a parser instance based on the provided file type.
   *
   * @param {string} fileType - The type of the file (e.g., '.js', '.js', '.vue').
   * @returns {Parser} - An instance of a parser corresponding to the file type.
   * @throws {Error} - Throws an error if the provided file type is unsupported.
   */
  createParser(fileType: string): Parser {
    switch (fileType) {
      case '.js':
      case '.ts': {
        return new JsDocParser();
      }

      default: {
        throw new Error(`Unsupported file type: "${fileType}"`);
      }
    }
  },
};
