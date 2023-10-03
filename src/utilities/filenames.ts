/**
 * Extracts the filename from a given path without its extension.
 *
 * @param {string} path - The file path or URL from which the filename should be extracted.
 * @returns {string} The filename without its extension. If the path is not a string, an empty string is returned.
 * @example
 * getFilename("/path/to/image.jpg"); // Returns "image"
 */
export const getFilename = (path: string): string => {
  const [filename] = path?.split('/').reverse() ?? [];
  const lastDotIndex = filename?.lastIndexOf('.');
  return lastDotIndex === -1
    ? filename ?? ''
    : filename?.slice(0, lastDotIndex) ?? '';
};
