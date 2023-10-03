import {type PluginOptions} from '../interfaces';
import {parsePluginOptions} from '../parsers/plugin-options';

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
 * The `ArgumentParser` class provides a mechanism to parse plugin options
 * for the application. It acts as a wrapper around the `parsePluginOptions` function,
 * ensuring a consistent interface for argument parsing throughout the application.
 */
export class ArgumentParser {
  /**
   * Parses the provided plugin options into a structured format.
   *
   * @param {PluginOptions} options - The plugin options to parse.
   * @returns {object} An object containing the parsed arguments.
   *
   * @example
   * const parser = new ArgumentParser();
   * const parsedArgs = parser.parse(process.argv);
   */
  parse(options: PluginOptions) {
    return parsePluginOptions(options);
  }
}
