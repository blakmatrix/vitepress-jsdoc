import path from 'node:path';
import mm from 'micromatch';
import {type FilterStrategy, type DirectoryEntity} from '../interfaces';

/**
 * Represents a filter strategy that determines the inclusion of directory entries
 * based on specified include and exclude patterns. This class leverages the `micromatch`
 * library to perform pattern matching.
 *
 * @implements {FilterStrategy}
 */
export class PatternFilter implements FilterStrategy {
  /**
   * Initializes a new instance of the PatternFilter class.
   *
   * @param {string[]} include - Patterns that specify which entries to include.
   * @param {string[]} exclude - Patterns that specify which entries to exclude.
   */
  constructor(
    private readonly include: string[],
    private readonly exclude: string[],
  ) {}

  /**
   * Determines whether a given directory entry should be included based on the
   * provided include and exclude patterns.
   *
   * @param {DirectoryEntity} entry - The directory entry to evaluate.
   * @param {string} srcPath - The source directory path.
   * @param {string} mainPath - The main directory path for relative path calculations.
   * @returns {boolean} Returns true if the entry matches the inclusion criteria, false otherwise.
   *
   * @example
   * const filter = new PatternFilter(['*.js'], ['test.js']);
   * const shouldInclude = filter.shouldInclude(entry, './src', './main');
   */
  shouldInclude(
    entry: DirectoryEntity,
    srcPath: string,
    mainPath: string,
  ): boolean {
    const baseSrc = mainPath || srcPath;
    return (
      mm.every(path.join(srcPath.replace(baseSrc, ''), entry.name), [
        ...this.include,
        ...this.exclude.map((ex) => '!' + ex),
      ]) || entry.isDirectory()
    );
  }
}
