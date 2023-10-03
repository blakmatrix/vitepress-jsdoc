import fs from 'node:fs/promises';
import {parsePluginOptions} from '../parsers/plugin-options.js';
import {type PluginOptions} from '../interfaces.js';

/**
 * Creates or updates the README file for the documentation. If a custom README file is provided,
 * its content will be used; otherwise, a default welcome message will be written.
 *
 * @function
 * @async
 *
 * @param {PluginOptions} options - The plugin options providing configuration for the README creation.
 * @param {string[]} [deletedPaths] - An optional list of paths that were deleted. Used to check if the README was among them.
 *
 * @returns {Promise<void>} A promise that resolves when the README file has been successfully created or updated.
 *
 * @throws Will throw an error if there's an issue reading from or writing to the file system.
 *
 * @example
 *
 * const options = {
 *   srcFolder: './src',
 *   codeFolder: 'code',
 *   docsFolder: './docs',
 *   title: 'My Documentation',
 *   readme: './src/README.md'
 * };
 *
 * createReadmeFile(options);
 */
export const createReadmeFile = async (
  options: PluginOptions,
  deletedPaths?: string[],
) => {
  const {srcFolder, codeFolder, docsFolder, title, readme} =
    parsePluginOptions(options);

  let readMeContent = `
    # Welcome to ${title}
    
    Thank you for checking out this project! This is a default README message, as a custom README was not provided. Feel free to contribute or reach out with any questions or suggestions.
    `;

  const readmePath = readme || `${srcFolder}/README.md`;

  try {
    readMeContent = await fs.readFile(readmePath, 'utf8');
    if (deletedPaths?.some((p) => p.includes(`${codeFolder}/README.md`))) {
      console.log(
        `\n README  ${readmePath.replace(
          'README.md',
          '',
        )}README.md →  ${docsFolder}/README.md`,
      );
    }
  } catch {
    console.log(`\n README  Add default README.md`);
  }

  try {
    await fs.writeFile(`${docsFolder}/README.md`, readMeContent);
  } catch (error) {
    console.error(`Error writing to ${docsFolder}/README.md:`, error);
    throw error;
  }
};
