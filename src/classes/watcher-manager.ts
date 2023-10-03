import {type PluginOptions} from '../interfaces.js';
import FileWatcher from './file-watcher.js';

/**
 * The `WatcherManager` class provides functionalities to watch files or directories
 * for changes. It leverages the `FileWatcher` to set up and manage the watching process
 * based on the provided plugin options.
 */
export class WatcherManager {
  /**
   * Creates an instance of the `WatcherManager` class.
   *
   * @param {PluginOptions} options - plugin options to guide the file watching process.
   */
  constructor(private readonly options: PluginOptions) {}

  /**
   * Initializes and starts the file watching process based on the provided arguments.
   *
   * @example
   * const watcherManager = new WatcherManager(cliArgs);
   * watcherManager.watch();
   */
  watch() {
    const watcher = new FileWatcher(this.options);
    watcher.watch();
  }
}
