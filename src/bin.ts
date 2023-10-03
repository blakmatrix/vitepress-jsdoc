#!/usr/bin/env node

/**
 * @file This is the entry point for the command-line interface (CLI) tool.
 */

import {version} from '../package.json';
import cmds from './vitepress-jsdoc-cli';

/**
 * Executes the CLI commands.
 * @param {string} version - The version of the tool, sourced from package.json.
 */
cmds(version);
