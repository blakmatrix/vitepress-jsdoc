import path from 'node:path';
import {
  type DirectoryEntity,
  type DirectoryFile,
  type DirectoryReader,
  type DirectoryTreeListOptions,
  type FileTree,
  type FilterStrategy,
} from '../interfaces';
import {NodeDirectoryReader} from './node-directory-reader';
import {PatternFilter} from './pattern-filter';

/**
 * Represents a directory entity with basic information.
 * @typedef DirectoryEntity
 * @property {Function} isDirectory - Function to check if the entity is a directory.
 * @property {string} name - Name of the directory entity.
 */

/**
 * Represents a file within a directory with its details.
 * @typedef DirectoryFile
 * @property {string} [ext] - File extension, if available.
 * @property {string} [folder] - Folder containing the file, if available.
 * @property {boolean} isDir - Flag to determine if the entity is a directory.
 * @property {string} name - Name of the file.
 * @property {string} path - Full path to the file.
 */

/**
 * Interface for reading directory contents.
 * @typedef DirectoryReader
 * @property {Function} isDirectory - Checks if the given entry is a directory.
 * @property {Function} readDirectory - Reads the directory at the given path and returns its entities.
 */

/**
 * Options for listing directory tree contents.
 * @typedef DirectoryTreeListOptions
 * @property {string[]} [exclude] - Patterns to exclude from the tree.
 * @property {string[]} [include] - Patterns to include in the tree.
 * @property {string} [mainPath] - Main path for relative calculations.
 * @property {string} srcPath - Source path of the directory to list.
 * @property {FileTree[]} [tree] - Existing tree to append to, if available.
 */

/**
 * Represents a node in a file tree structure.
 * @typedef FileTree
 * @property {FileTree[]} [children] - Child nodes of the current node.
 * @property {string} [ext] - File extension, if available.
 * @property {string} [fullPath] - Full path to the file or directory.
 * @property {string} name - Name of the file or directory.
 * @property {string} [path] - Relative path to the file or directory.
 */

/**
 * Strategy for filtering directory contents.
 * @typedef FilterStrategy
 * @property {Function} shouldInclude - Determines if a given entry should be included based on the strategy.
 */

/**
 * @typedef DirectoryTreeResult
 * @property {DirectoryFile[]} paths - The paths in the directory.
 * @property {FileTree[]} tree - The hierarchical tree structure of the directory.
 * @property {DirectoryFile[]} excluded - The files that were excluded based on the provided options.
 */

/**
 * The `DirectoryTreeBuilder` class provides functionalities to construct a hierarchical
 * representation of a directory and its contents based on the provided options.
 * It leverages filtering strategies and directory readers to achieve this.
 */
export class DirectoryTreeBuilder {
  private readonly filter: FilterStrategy;
  private readonly reader: DirectoryReader;
  private readonly options: DirectoryTreeListOptions;

  /**
   * Initializes a new instance of the DirectoryTreeBuilder class.
   *
   * @param {DirectoryTreeListOptions} options - Configuration options for building the directory tree.
   */
  constructor(options: DirectoryTreeListOptions) {
    const {include = [], exclude = []} = options;
    this.filter = new PatternFilter(include, exclude);
    this.reader = new NodeDirectoryReader();
    this.options = options;
  }

  /**
   * Constructs a hierarchical representation of the directory based on the provided options.
   *
   * @returns {Promise<DirectoryTreeResult>}
   *          A promise that resolves to the directory tree, including paths, tree structure, and excluded files.
   */
  public async build() {
    const {srcPath, mainPath = '', tree = []} = this.options;

    const paths: DirectoryFile[] = [];
    const excluded: DirectoryFile[] = [];

    const dirs: DirectoryEntity[] = await this.reader.readDirectory(srcPath);

    for (const dirent of dirs) {
      const fileDetails = this.getFileDetails(srcPath, dirent);

      if (this.shouldSkipFile(fileDetails.name)) continue;

      if (this.filter.shouldInclude(dirent, srcPath, mainPath)) {
        if (fileDetails.isDir) {
          const subTree: FileTree[] = [];
          this.options.srcPath = fileDetails.path;
          this.options.tree = subTree;
          // eslint-disable-next-line no-await-in-loop
          const result = await this.build();
          tree.push({
            name: fileDetails.name,
            children: subTree,
          });
          paths.push(...result.paths);
          excluded.push(...result.excluded);
        } else {
          const treeEntry = this.createTreeEntry(fileDetails);
          tree.push(treeEntry);
          paths.push(fileDetails);
        }
      } else {
        excluded.push(fileDetails);
      }
    }

    return {paths, tree, excluded};
  }

  /**
   * Retrieves detailed information about a directory entry.
   *
   * @param {string} srcPath - The source directory path.
   * @param {DirectoryEntity} dirent - The directory entry to retrieve details for.
   * @returns {DirectoryFile} Detailed information about the directory entry.
   */
  private getFileDetails(
    srcPath: string,
    dirent: DirectoryEntity,
  ): DirectoryFile {
    const filePath = path.join(srcPath, dirent.name);
    const isDir = dirent.isDirectory();
    const ext = path.extname(filePath);
    let name = path.basename(filePath).replace(ext, '');
    const folder = filePath.replace(name, '').replace(ext, '');

    if (name === 'index') {
      name = '__index__';
    }

    return {
      isDir,
      name,
      path: filePath,
      ...(isDir ? {} : {ext, folder}),
    };
  }

  /**
   * Checks whether a specific file should be omitted from the directory tree.
   *
   * @param {string} fileName - The name of the file to check.
   * @returns {boolean} True if the file should be skipped, otherwise false.
   */
  private shouldSkipFile(fileName: string): boolean {
    return fileName.toLowerCase() === 'readme';
  }

  /**
   * Creates a tree entry based on the provided file details.
   *
   * @param {DirectoryFile} file - Details of the file for which to create a tree entry.
   * @returns {FileTree} A tree entry representing the file.
   */
  private createTreeEntry(file: DirectoryFile): FileTree {
    if (file.isDir) {
      return {
        name: file.name,
        children: [],
      };
    }

    return {
      name: file.name,
      path: `/${file.name}`,
      fullPath: file.path,
      ext: file.ext,
    };
  }
}
