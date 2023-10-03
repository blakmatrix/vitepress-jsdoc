import {type PluginOptions, type ParsedPluginOptions} from '../interfaces.js';

/**
 * Parses the provided plugin options
 *
 * @param {PluginOptions} options - The plugin options to be parsed.
 * @returns {ParsedPluginOptions} An object containing:
 *  - include: Array of patterns to include.
 *  - exclude: Array of patterns to exclude.
 *  - srcFolder: The source folder path, with './' prefix removed.
 *  - jsDocConfigPath: The path to the JSDoc configuration file.
 *  - codeFolder: The folder where the code resides.
 *  - docsFolder: The destination folder for the generated documentation.
 *  - title: The title for the documentation.
 *  - readme: The path to the README file.
 *  - rmPattern: Array of patterns to remove.
 *  - partials: Array of partial templates.
 *  - helpers: Array of helper functions.
 */
export const parsePluginOptions = (
  options: PluginOptions,
): ParsedPluginOptions => {
  return {
    include: (options.include ?? '').split(',').filter(Boolean),
    exclude: (options.exclude || '').split(',').filter(Boolean),
    srcFolder: options.source.replace('./', ''),
    jsDocConfigPath: options.jsDocConfigPath ?? '',
    codeFolder: options.folder,
    docsFolder: `${options.dist}/${options.folder}`,
    title: options.title,
    readme: options.readme,
    rmPattern: options.rmPattern ?? [],
    partials: options.partials || [],
    helpers: options.helpers || [],
  };
};
