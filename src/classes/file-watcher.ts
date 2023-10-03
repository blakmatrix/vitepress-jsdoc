import readline from 'node:readline';
import chokidar from 'chokidar';
import {parseDirectoryFile} from '../parsers/file.js';
import {
  type DirectoryFile,
  type PluginOptions,
  type ParsedPluginOptions,
} from '../interfaces.js';
import {parsePluginOptions} from '../parsers/plugin-options.js';
import {writeContentToFile} from '../utilities/file-operations.js';
import {createReadmeFile} from '../utilities/create-readme.js';
import {DirectoryTreeBuilder} from './directory-tree-builder.js';

/**
 * The `FileWatcher` class provides functionalities to monitor files and directories
 * for changes. It leverages the `chokidar` library to efficiently watch files and
 * react to changes by updating the documentation accordingly.
 */
class FileWatcher {
  private readonly parsedArgs: ParsedPluginOptions;

  /**
   * Initializes a new instance of the FileWatcher class.
   *
   * @param {PluginOptions} options - Configuration options and plugin options.
   */
  constructor(private readonly options: PluginOptions) {
    this.options = options;
    this.parsedArgs = parsePluginOptions(options);
  }

  /**
   * Starts the file watching process if the "watch" argument is provided.
   * Outputs a message to the console indicating the start of the watching process.
   */
  public watch() {
    if (!this.options.watch) return;

    console.log('\n---\n\n👀 watching files...');
    const watcher = this.setupFileWatcher();

    watcher.on('change', async (path) => {
      await this.handleFileChange(path);
    });
  }

  /**
   * Configures and returns a file watcher instance targeting the source folder
   * and README files.
   *
   * @returns {chokidar.FSWatcher} An instance of the file watcher.
   */
  private setupFileWatcher() {
    const {srcFolder} = this.parsedArgs;
    return chokidar.watch(
      [srcFolder, this.options.readme, `${srcFolder}/README.md`].filter(
        Boolean,
      ),
      {
        ignored: /(^|[/\\])\../,
        persistent: true,
      },
    );
  }

  /**
   * Handles events when a file changes. It updates the documentation and
   * outputs relevant messages to the console.
   *
   * @param {string} path - The path of the file that changed.
   */
  private async handleFileChange(path: string) {
    const {srcFolder, include, exclude} = this.parsedArgs;
    const directoryTree = new DirectoryTreeBuilder({
      srcPath: srcFolder,
      include,
      exclude,
    });
    const lsFolder = await directoryTree.build();
    const file = lsFolder.paths.find((p) => p.path === path);

    await this.clearConsole();

    if (this.isReadmeFile(path, srcFolder)) {
      await createReadmeFile(this.options);
    }

    if (file) {
      console.log(`update ${file.name + file.ext}`);
      await this.updateDocumentationFile(file);
    }
  }

  /**
   * Clears the console to provide a clean output for subsequent messages.
   */
  private async clearConsole() {
    readline.clearLine(process.stdout, 0);
    readline.cursorTo(process.stdout, 0);
  }

  /**
   * Determines if the specified file is a README file.
   *
   * @param {string} path - The path of the file to check.
   * @param {string} srcFolder - The source directory path.
   * @returns {boolean} True if the file is a README file, otherwise false.
   */
  private isReadmeFile(path: string, srcFolder: string) {
    return path === 'README.md' || path === `${srcFolder}/README.md`;
  }

  /**
   * Processes and updates the documentation for the specified file.
   *
   * @param {DirectoryFile} file - Details of the file to update.
   */
  private async updateDocumentationFile(file: DirectoryFile) {
    const data = await parseDirectoryFile(file, this.options);
    if (data) {
      await writeContentToFile(data, data.relativePathDest);
    }
  }
}

export default FileWatcher;
