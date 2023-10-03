---
order: 5
---
# Using `vitepress-jsdoc` as a Command Line Tool

For those who prefer the command line, this section will cover how to use `vitepress-jsdoc` as a standalone CLI tool, offering flexibility in your documentation generation process.

## Basic Command

To use `vitepress-jsdoc` from the command line, you can utilize the following basic command:

```bash
npx vitepress-jsdoc
```

This will run `vitepress-jsdoc` with default settings.

## Specifying Options

You can also specify various options to customize the documentation generation process. Here's an example:

```bash
npx vitepress-jsdoc --source ./src --dist ./docs --folder code --title API
```

In this example:
- `--source ./src`: Specifies the source directory containing your code.
- `--dist ./docs`: Specifies the destination directory where the generated documentation will be saved.
- `--folder code`: Sets the folder name for the documentation.
- `--title API`: Sets the title of your documentation.

## Additional Options

There are several other options available to further customize the documentation generation process, such as specifying partial templates, helper scripts, custom README, and excluding specific files or folders. Refer to the official `vitepress-jsdoc` documentation for a comprehensive list of available options.

By using `vitepress-jsdoc` as a CLI tool, you have the flexibility to generate documentation as needed, without the need for a full Vitepress setup.
