import {createReadmeFile} from '../utilities/create-readme.js';
import {type PluginOptions} from '../interfaces.js';

/**
 * The `ReadmeManager` class provides functionalities to manage the README file
 * of the project. It offers methods to create or update the README based on
 * the provided arguments and configurations.
 */
export class ReadmeManager {
  /**
   * Creates or updates the README file based on the provided arguments.
   *
   * @param {PluginOptions} options - Plugin options to guide the creation of the README.
   * @param {string[]} deletedPaths - An array of paths that were deleted, to be documented in the README.
   * @returns {Promise<void>} A promise that resolves once the README is created or updated.
   *
   * @example
   * const readmeManager = new ReadmeManager();
   * await readmeManager.create(cliArgs, deletedPathsArray);
   */
  async create(options: PluginOptions, deletedPaths: string[]): Promise<void> {
    await createReadmeFile(options, deletedPaths);
  }
}
