import fs from 'node:fs/promises';
import {type DirectoryReader, type DirectoryEntity} from '../interfaces.js';

/**
 * Represents a directory reader that leverages Node.js's file system module.
 * This class provides methods to read directory contents and determine the type of directory entries.
 *
 * @implements {DirectoryReader}
 */
export class NodeDirectoryReader implements DirectoryReader {
  /**
   * Reads the content of a specified directory and returns its entries.
   *
   * @param {string} srcPath - The path of the directory to read.
   * @returns {Promise<DirectoryEntity[]>} A promise that resolves to an array of directory entries.
   * @throws {Error} Throws an error if there's an issue reading the directory.
   *
   * @example
   * const reader = new NodeDirectoryReader();
   * const entries = await reader.readDirectory('./src');
   */
  async readDirectory(srcPath: string) {
    return fs.readdir(srcPath, {withFileTypes: true});
  }

  /**
   * Determines whether a given directory entry represents a directory.
   *
   * @param {DirectoryEntity} entry - The directory entry to check.
   * @returns {boolean} Returns true if the entry is a directory, false otherwise.
   *
   * @example
   * const reader = new NodeDirectoryReader();
   * const isDir = reader.isDirectory(entry);
   */
  isDirectory(entry: DirectoryEntity) {
    return entry.isDirectory();
  }
}
