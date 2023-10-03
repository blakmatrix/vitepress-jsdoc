import {type DirectoryTreeListOptions} from '../interfaces';
import {DirectoryTreeBuilder} from './directory-tree-builder';

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
 * The `DirectoryManager` class provides functionalities to manage and interact
 * with directories. It leverages the `DirectoryTreeBuilder` to construct a
 * directory tree based on the provided options.
 */
export class DirectoryManager {
  /**
   * Creates an instance of the `DirectoryManager` class.
   *
   * @param {DirectoryTreeListOptions} options - Configuration options for directory management.
   */
  constructor(private readonly options: DirectoryTreeListOptions) {}

  /**
   * Constructs a directory tree based on the provided options.
   *
   * @returns {Promise<object>} A promise that resolves to the constructed directory tree.
   *
   * @example
   * const manager = new DirectoryManager({ srcPath: './src', exclude: ['node_modules'] });
   * const tree = await manager.build();
   */
  async build() {
    const directoryTree = new DirectoryTreeBuilder(this.options);
    return directoryTree.build();
  }
}
