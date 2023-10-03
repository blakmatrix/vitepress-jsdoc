import {deleteDocsFolder, createDocsFolder} from '../utilities/file-operations';

/**
 * The `DocsFolderManager` class provides functionalities to manage the documentation
 * folder. It offers methods to delete and create the docs folder, abstracting the
 * underlying operations.
 */
export class DocsFolderManager {
  /**
   * Deletes the specified documentation folder based on the provided pattern.
   *
   * @param {string} docsFolder - The path to the documentation folder to delete.
   * @param {string[]} rmPattern - An array of patterns specifying which files or directories to exclude from deletion.
   * @returns {Promise<void>} A promise that resolves once the deletion is complete.
   *
   * @example
   * const manager = new DocsFolderManager();
   * await manager.delete('./docs', ['exclude-pattern']);
   */
  async delete(docsFolder: string, rmPattern: string[]) {
    return deleteDocsFolder(docsFolder, rmPattern);
  }

  /**
   * Creates the specified documentation folder.
   *
   * @param {string} docsFolder - The path to the documentation folder to create.
   *
   * @example
   * const manager = new DocsFolderManager();
   * manager.create('./docs');
   */
  create(docsFolder: string) {
    createDocsFolder(docsFolder);
  }
}
