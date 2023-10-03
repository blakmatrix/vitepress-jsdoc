/*
 * @vitepress
 * ---
 * headline: CLI interface
 * ---
 */
import {program} from 'commander';
import {generate} from '.';

/**
 * @file This module provides the main CLI interface for generating markdown files for VitePress.
 */

/**
 * Configures the main details of the CLI program.
 *
 * @function
 *
 * @param {string} version - The version of the CLI tool.
 */
function configureProgram(version: string) {
  program
    .version(version)
    .description('a CLI Tool to generate markdown files for vitepress');
}

/**
 * Configures the available options for the CLI tool.
 *
 * @function
 */
function configureOptions() {
  program
    .description(
      'CLI Tool to generate markdown files for VitePress from source files.',
    )

    // Source and Destination
    .option(
      '-s, --source <path>',
      'Specify the source folder containing .js or .ts files. Default: ./src',
    )
    .option(
      '-d, --dist <path>',
      'Specify the destination folder for generated markdown files. Default: ./docs',
    )

    // Documentation Structure
    .option(
      '-f, --folder <name>',
      'Name of the folder inside the destination. This folder gets overwritten every time. Default: code',
    )
    .option(
      '-t, --title <text>',
      'Set the title for your documentation. Default: API',
    )

    // Customization
    .option('-r, --readme <path>', 'Provide a path to your custom README file.')
    .option(
      '-i, --include <patterns>',
      'Specify patterns to include specific files/folders. Separate multiple patterns with commas (e.g., *.test.js,include.js).',
    )
    .option(
      '-e, --exclude <patterns>',
      'Specify patterns to exclude specific files/folders. Separate multiple patterns with commas (e.g., *.test.js,exclude.js).',
    )

    // Advanced Options
    .option(
      '-w, --watch',
      'Enable watch mode to monitor changes in source files.',
    )
    .option(
      '-rm, --rmPattern [patterns...]',
      'Specify patterns for removing files. You can exclude or include files using glob patterns.',
    )
    .option(
      '-p, --partials [files...]',
      'Provide jsdoc2markdown partial templates. This will overwrite the default templates.',
    )
    .option(
      '-h, --helpers [files...]',
      'Provide jsdoc2markdown helpers. This will overwrite the default helpers.',
    )
    .option(
      '-c, --jsDocConfigPath <path>',
      'Specify the path to the JSDoc configuration file.',
    )

    // Action to Execute
    .action(generate);
}

/**
 * Initializes and runs the CLI tool.
 *
 * @function
 *
 * @param {string} version - The version of the CLI tool.
 */
const initializeCli = (version: string) => {
  const args = process.argv;
  configureProgram(version);
  configureOptions();
  program.parse(args);
};

export default initializeCli;
