/*
 * @vitepress
 * ---
 * headline: Parse Vitepress Comment
 * ---
 */
import fm from 'front-matter';
import {type DirectoryFile} from '../interfaces';

/**
 * Parses the content of a file to search for a @vitepress comment block and extracts the frontmatter data.
 *
 * @function
 * @param {string} fileContent - The content of the file to be parsed.
 * @returns {object} - An object containing the extracted frontmatter data and attributes.
 * @throws {Error} - Returns an object with null values if parsing fails.
 */
export const parseComment = (fileContent: string) => {
  try {
    const allCommentBlocks = fileContent.match(
      /\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/g,
    );
    const vitepressBlock = allCommentBlocks?.filter((block: string) => {
      return block.split('\n').filter((line) => line.includes('@vitepress'))
        .length;
    })[0];

    if (!vitepressBlock) {
      return {
        frontmatter: null,
        attributes: null,
      };
    }

    return fm<Record<string, string>>(
      vitepressBlock
        .replaceAll('\n ', '\n')
        .replace('/*', '')
        .replace('*/', '')
        .replaceAll('@vitepress', '')
        .replaceAll(/\*\s?/g, '')
        .trim(),
    );
  } catch {
    return {
      frontmatter: null,
      attributes: null,
    };
  }
};

/**
 * Parses the content of a file and constructs a structured markdown header based on the @vitepress comment block.
 *
 * @function
 * @param {string} content - The content of the file.
 * @param {DirectoryFile} file - The file object containing details like name and extension.
 * @returns {string} - A structured markdown header.
 */
export const parseVitepressFileHeader = (
  content: string,
  file: DirectoryFile,
) => {
  const {frontmatter, attributes} = parseComment(content);

  let fileContent = '---\n';

  fileContent += attributes?.title ? '' : `title: ${file.name}`;

  if (frontmatter) {
    fileContent += attributes?.title ? '' : '\n';
    fileContent += `${frontmatter}`;
  }

  fileContent += '\n---\n';
  if (attributes?.title ?? file.ext !== '.vue') {
    let headline = file.name;

    if (attributes?.headline) {
      headline = attributes.headline;
    } else if (attributes?.title) {
      headline = attributes.title;
    }

    fileContent += `\n# ${headline}\n\n`;
  }

  return fileContent;
};
