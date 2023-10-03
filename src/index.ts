/*
 * @vitepress
 * ---
 * headline: Main Index
 * ---
 */

// - import {type Plugin} from 'vite';
import {type PluginOptions} from './interfaces.js';
import {printStats} from './utilities/output.js';
import {
  ArgumentParser,
  DocsFolderManager,
  DirectoryManager,
  FileProcessor,
  ReadmeManager,
  WatcherManager,
} from './classes/index.js';

/**
 * ## Generate Markdown Files
 * Orchestrates the process of reading, filtering, and writing files.
 *
 * - **options**: The plugin options of type `PluginOptions`.
 *
 * @example
 * ```typescript
 * generate(myCliArgs);
 * ```
 */
export const generate = async (options: PluginOptions) => {
  const argParser = new ArgumentParser();
  const parsedArgs = argParser.parse(options);
  const startTime = Date.now();

  const docsManager = new DocsFolderManager();
  const deletedPaths = await docsManager.delete(
    parsedArgs.docsFolder,
    parsedArgs.rmPattern,
  );

  const dirManager = new DirectoryManager({
    srcPath: parsedArgs.srcFolder,
    include: parsedArgs.include,
    exclude: parsedArgs.exclude,
  });
  const lsFolder = await dirManager.build();

  docsManager.create(parsedArgs.docsFolder);

  const fileProc = new FileProcessor();
  const filteredResult = await fileProc.processFiles(lsFolder, options);

  printStats(lsFolder, filteredResult);

  const readme = new ReadmeManager();
  await readme.create(options, deletedPaths);

  const resultTime = (Math.abs(startTime - Date.now()) / 1000).toFixed(2);
  console.log(`\n⏰ Time: ${resultTime}s`);

  const watcher = new WatcherManager(options);
  watcher.watch();
};

/**
 * Vitepress JSDoc Plugin.
 *
 * @function
 * @param {PluginOptions} options - The options for the plugin.
 * @returns {Plugin} Returns a Vite plugin object.
 *
 * @example
 * ```typescript
 * // Example Vitepress Configuration
 * import { defineConfig } from "vitepress";
 * import VitpressJsdocPlugin from "vitepress-jsdoc";
 *
 * export default defineConfig({
 *   vite: {
 *     plugins: [
 *       VitpressJsdocPlugin({
 *         folder: "code",
 *         source: "./dist/mjs/",
 *         dist: "./docs",
 *         title: "API",
 *         partials: ["./dist/mjs/partials/*.hbs"],
 *         helpers: ["./dist/mjs/helpers/*.js"],
 *         readme: "./README.md",
 *         exclude: "**\/*.json,**\/*.hbs,**\/*.d.js,**\/*.map,**\/interfaces.*",
 *       }),
 *     ],
 *   },
 * });
 * ```
 */
const plugin = (options: PluginOptions) /* : Plugin */ => {
  return {
    name: 'vitepress-jsdoc-plugin',

    // Hook for 'serve'
    configureServer(server: any) {
      // Call your watch function here
      options.watch = true;
      const watcher = new WatcherManager(options);
      watcher.watch();
    },

    // Hook for 'build'
    async buildStart() {
      await generate(options);
    },
  };
};

export default plugin;
