/*
 * @vitepress
 * ---
 * headline: Parse Vitepress Comment
 * ---
 */
import fm, {type FrontMatterResult} from 'front-matter';
import {type DirectoryFile} from '../interfaces.js';

type VitepressAttributes = {
  title?: string;
  headline?: string;
};

/**
 * Parses the content of a file to search for a @vitepress comment block and extracts the frontmatter data.
 *
 * @function
 * @param {string} fileContent - The content of the file to be parsed.
 * @returns {object} - An object containing the extracted frontmatter data and attributes.
 * @throws {Error} - Returns an object with null values if parsing fails.
 */
export const parseComment = (
  fileContent: string,
): FrontMatterResult<VitepressAttributes> => {
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
        body: '',
        bodyBegin: 0,
        attributes: {},
      };
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const parsed = (fm as any)(
      vitepressBlock
        .replaceAll('\n ', '\n')
        .replace('/*', '')
        .replace('*/', '')
        .replaceAll('@vitepress', '')
        .replaceAll(/\*\s?/g, '')
        .trim(),
    );

    return parsed as FrontMatterResult<VitepressAttributes>;

    /* The code `return fm<VitepressAttributes>(...)` is calling the `fm` function from the `front-matter`
library to parse the frontmatter data from the `vitepressBlock`. */
    // return fm<VitepressAttributes>(
    //   vitepressBlock
    //     .replaceAll('\n ', '\n')
    //     .replace('/*', '')
    //     .replace('*/', '')
    //     .replaceAll('@vitepress', '')
    //     .replaceAll(/\*\s?/g, '')
    //     .trim(),
    // );
  } catch {
    return {
      body: '',
      bodyBegin: 0,
      attributes: {},
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
  const {frontmatter, attributes}: FrontMatterResult<VitepressAttributes> =
    parseComment(content);

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
