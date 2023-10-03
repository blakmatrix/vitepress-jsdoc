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
export type PluginOptions = {
  dist: string;
  exclude: string;
  folder: string;
  helpers: string[];
  include?: string;
  jsDocConfigPath?: string;
  partials: string[];
  readme: string;
  rmPattern?: string[];
  source: string;
  title: string;
  watch?: boolean;
};

/**
 * Represents a directory entity with basic information.
 * @typedef DirectoryEntity
 * @property {Function} isDirectory - Function to check if the entity is a directory.
 * @property {string} name - Name of the directory entity.
 */
export type DirectoryEntity = {
  isDirectory: () => boolean;
  name: string;
};

/**
 * Represents a file within a directory with its details.
 * @typedef DirectoryFile
 * @property {string} [ext] - File extension, if available.
 * @property {string} [folder] - Folder containing the file, if available.
 * @property {boolean} isDir - Flag to determine if the entity is a directory.
 * @property {string} name - Name of the file.
 * @property {string} path - Full path to the file.
 */
export type DirectoryFile = {
  ext?: string;
  folder?: string;
  isDir: boolean;
  name: string;
  path: string;
};

/**
 * Interface for reading directory contents.
 * @typedef DirectoryReader
 * @property {Function} isDirectory - Checks if the given entry is a directory.
 * @property {Function} readDirectory - Reads the directory at the given path and returns its entities.
 */
export type DirectoryReader = {
  isDirectory(entry: any): boolean;
  readDirectory(srcPath: string): Promise<DirectoryEntity[]>;
};

/**
 * Options for listing directory tree contents.
 * @typedef DirectoryTreeListOptions
 * @property {string[]} [exclude] - Patterns to exclude from the tree.
 * @property {string[]} [include] - Patterns to include in the tree.
 * @property {string} [mainPath] - Main path for relative calculations.
 * @property {string} srcPath - Source path of the directory to list.
 * @property {FileTree[]} [tree] - Existing tree to append to, if available.
 */
export type DirectoryTreeListOptions = {
  exclude?: string[];
  include?: string[];
  mainPath?: string;
  srcPath: string;
  tree?: FileTree[];
};

/**
 * Represents a node in a file tree structure.
 * @typedef FileTree
 * @property {FileTree[]} [children] - Child nodes of the current node.
 * @property {string} [ext] - File extension, if available.
 * @property {string} [fullPath] - Full path to the file or directory.
 * @property {string} name - Name of the file or directory.
 * @property {string} [path] - Relative path to the file or directory.
 */
export type FileTree = {
  children?: FileTree[];
  ext?: string;
  fullPath?: string;
  name: string;
  path?: string;
};

/**
 * Strategy for filtering directory contents.
 * @typedef FilterStrategy
 * @property {Function} shouldInclude - Determines if a given entry should be included based on the strategy.
 */
export type FilterStrategy = {
  shouldInclude(entry: any, srcPath: string, mainPath: string): boolean;
};

/**
 * Represents the data of a folder, including its paths, tree structure, and excluded files.
 * @typedef FolderData
 * @property {DirectoryFile[]} excluded - List of excluded files.
 * @property {DirectoryFile[]} paths - List of all paths in the folder.
 * @property {FileTree[]} tree - Tree structure of the folder.
 */
export type FolderData = {
  excluded: DirectoryFile[];
  paths: DirectoryFile[];
  tree: FileTree[];
};

/**
 * Represents the result of a parsing operation.
 * @typedef ParsePromiseResult
 * @property {ParseReturn|undefined} - The result of the parsing operation.
 */
export type ParsePromiseResult = ParseReturn | undefined;

/**
 * Represents the return value after parsing a file.
 * @typedef ParseReturn
 * @property {string} content - Content of the parsed file.
 * @property {string} dest - Destination path for the parsed file.
 * @property {boolean} empty - Flag to determine if the file is empty.
 * @property {boolean} [excluded] - Flag to determine if the file was excluded.
 * @property {DirectoryFile} file - Details of the parsed file.
 * @property {string} relativePathDest - Relative destination path for the parsed file.
 * @property {string} relativePathSrc - Relative source path of the parsed file.
 * @property {boolean} [success] - Flag to determine if the parsing was successful.
 * @property {StatisticType} [type] - Type of statistic for the parsed file.
 */
export type ParseReturn = {
  content: string;
  dest: string;
  empty: boolean;
  excluded?: boolean;
  file: DirectoryFile;
  relativePathDest: string;
  relativePathSrc: string;
  success?: boolean;
  type?: StatisticType;
};

/**
 * Represents a parser with a parse method.
 * @typedef Parser
 * @property {Function} parse - Parses a given file based on the provided configuration.
 */
export type Parser = {
  parse(
    file: DirectoryFile,
    config: ParserConfig,
  ): Promise<ParseReturn | undefined>;
};

/**
 * Configuration for the parser.
 * @typedef ParserConfig
 * @property {string} docsFolder - Path to the documentation folder.
 * @property {string[]} [helpers] - List of helper functions or modules.
 * @property {string} [jsDocConfigPath] - Path to the JSDoc configuration file.
 * @property {string[]} [partials] - List of partial templates or modules.
 * @property {string} srcFolder - Source folder for the files to be parsed.
 */
export type ParserConfig = {
  docsFolder: string;
  helpers?: string[];
  jsDocConfigPath?: string;
  partials?: string[];
  srcFolder: string;
};

/**
 * Represents the parsed plugin options.
 * @typedef ParsedPluginOptions
 * @property {string} codeFolder - Path to the code folder.
 * @property {string} docsFolder - Path to the documentation folder.
 * @property {string[]} exclude - Patterns to exclude from processing.
 * @property {string[]} helpers - List of helper functions or modules.
 * @property {string[]} include - Patterns to include for processing.
 * @property {string} jsDocConfigPath - Path to the JSDoc configuration file.
 * @property {string[]} partials - List of partial templates or modules.
 * @property {string} readme - Path to the README file.
 * @property {string[]} rmPattern - Patterns for files to be removed.
 * @property {string} srcFolder - Source path for the files to be processed.
 * @property {string} title - Title for the generated documentation.
 */
export type ParsedPluginOptions = {
  codeFolder: string;
  docsFolder: string;
  exclude: string[];
  helpers: string[];
  include: string[];
  jsDocConfigPath: string;
  partials: string[];
  readme: string;
  rmPattern: string[];
  srcFolder: string;
  title: string;
};

/**
 * Interface for removing directory contents.
 * @interface PathRemover
 * @function
 * @property {Function} delete - Deletes the specified paths and returns a boolean indicating success.
 * @property {Function} getDeletedPaths - Returns an array of paths that were deleted.
 */
export interface PathRemover {
  delete(paths: string[]): Promise<boolean>;
  getDeletedPaths(): string[];
}


/**
 * Represents the types of statistics for parsed files.
 * @enum {string}
 */
export enum StatisticType {
  EMPTY = 'EMPTY',
  ERROR = 'ERROR',
  EXCLUDE = 'EXCLUDE',
  INCLUDE = 'INCLUDE',
}
