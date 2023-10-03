import {rimraf} from 'rimraf';
import {type PathRemover} from '../interfaces.js';

/**
 * Implementation of the `PathRemover` interface using the `rimraf` module.
 * This class provides methods to delete specified paths and retrieve the list of deleted paths.
 *
 * @class
 * @implements {PathRemover}
 *
 * @example
 *
 * const remover = new RimrafPathRemover();
 * const pathsToDelete = ['./docs', '**\/*.tmp']; // remove backslash
 * const success = await remover.delete(pathsToDelete);
 * if (success) {
 *     const deletedPaths = remover.getDeletedPaths();
 * }
 */
export class RimrafPathRemover implements PathRemover {
  private readonly deletedPaths: string[] = [];

  /**
   * Deletes the specified paths.
   *
   * @param {string[]} paths - An array of paths or glob patterns to be deleted.
   * @returns {Promise<boolean>} A promise that resolves with a boolean indicating whether all paths were successfully deleted.
   */
  async delete(paths: string[]): Promise<boolean> {
    const allDeleted = await rimraf(paths, {
      glob: true,
      filter: this.captureDeletedPaths.bind(this),
    });
    return allDeleted;
  }

  /**
   * Retrieves the list of paths that were deleted.
   *
   * @returns {string[]} An array of paths that were deleted.
   */
  getDeletedPaths(): string[] {
    return this.deletedPaths;
  }

  /**
   * Captures the path of a deleted entry.
   *
   * @private
   * @param {string} path - The path of the deleted entry.
   * @returns {boolean} Always returns true to proceed with the deletion.
   */
  private captureDeletedPaths(path: string): boolean {
    this.deletedPaths.push(path);
    return true; // Always return true to proceed with the deletion
  }
}
