import {join} from 'node:path';

/**
 * @file This module provides functionality to resolve paths related to Handlebars templates.
 */

/**
 * Resolves the paths for Handlebars partials and helpers based on the current working directory.
 *
 * @function
 *
 * @returns {object} An object containing:
 *  - partialsPath: The resolved path for Handlebars partials.
 *  - helpersPath: The resolved path for Handlebars helpers.
 *
 * @example
 *
 * const paths = resolveHandlebarsPath();
 * console.log(paths.partialsPath); // e.g., '/current/directory/handlebars/partials/*.hbs'
 * console.log(paths.helpersPath);  // e.g., '/current/directory/handlebars/helpers/*.js'
 */
export function resolveHandlebarsPath() {
  const cwd = process.cwd();

  const handlebarsBasePath = join(cwd, 'dist', 'cjs', 'handlebars');

  return {
    partialsPath: join(handlebarsBasePath, 'partials', '*.hbs'),
    helpersPath: join(handlebarsBasePath, 'helpers', '*.js'),
  };
}
