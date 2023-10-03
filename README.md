<div align="center">

[![vitepress-jsdoc logo](https://blakmatrix.github.io/vitepress-jsdoc/vitepress_jsdoc_logo.svg "A tree as great as a man's embrace springs from a small shoot
A terrace nine stories high begins with a pile of earth
A journey of a thousand miles starts under one's feet. -Lao Tzu")](https://blakmatrix.github.io/vitepress-jsdoc/)

[![npm][npm]][npm-url]

[![node][node]][node-url]
[![licenses][licenses]][licenses-url]
[![PR's welcome][prs]][prs-url]
[![XO code style][xo]][xo-url]


  <a href="https://docs.github.com/en/code-security/dependabot/dependabot-security-updates/about-dependabot-security-updates#about-compatibility-scores">
    <img src="https://api.dependabot.com/badges/compatibility_score?dependency-name=vitepress-jsdoc&package-manager=npm_and_yarn&previous-version=2.20&new-version=3.0.1">
  </a>
	<a href="https://npmcharts.com/compare/vitepress-jsdoc?minimal=true">
		<img src="https://img.shields.io/npm/dm/vitepress-jsdoc.svg">
	</a>
	<a href="https://packagephobia.com/result?p=vitepress-jsdoc">
		<img src="https://packagephobia.com/badge?p=vitepress-jsdoc" alt="install size">
	</a>
	<a href="https://opencollective.com/vitepress-jsdoc#backer">
		<img src="https://opencollective.com/vitepress-jsdoc/backers/badge.svg">
	</a>
	<a href="https://opencollective.com/vitepress-jsdoc#sponsors">
		<img src="https://opencollective.com/vitepress-jsdoc/sponsors/badge.svg">
	</a>
	<a href="https://github.com/blakmatrix/vitepress-jsdoc/graphs/contributors">
		<img src="https://img.shields.io/github/contributors/blakmatrix/vitepress-jsdoc.svg">
	</a>
	<a href="https://github.com/blakmatrix/vitepress-jsdoc/discussions">
		<img src="https://img.shields.io/github/discussions/blakmatrix/vitepress-jsdoc">
	</a>
  <h1>vitepress-jsdoc</h1>
  <p><i>Code More, Document Faster: The Ultimate Vitepress Integration.</i></p>
  <p>
    <code>vitepress-jsdoc</code> is the definitive bridge between Vitepress and JSDoc-style commented codebases. Crafted for developers seeking a hassle-free documentation experience, it excels in swiftly generating comprehensive docs from your annotations. Beyond just documentation, it's your key to unlocking the full potential of Vitepress, seamlessly integrating your code insights into beautifully rendered pages.
  </p>
</div>

**Read the full documentation at [blakmatrix.github.io/vitepress-jsdoc/](https://blakmatrix.github.io/vitepress-jsdoc/)**

## Install

```bash
npm install -D vitepress-jsdoc
```


## Plugin Mode

For integration into Vitepress, the plugin mode is recommended:

```typescript
// Example Vitepress Configuration
import { defineConfig } from "vitepress";
import VitpressJsdocPlugin from "vitepress-jsdoc";

export default defineConfig({
  vite: {
    plugins: [
      VitpressJsdocPlugin({
        folder: "code",
        source: "./src",
        dist: "./docs",
        title: "API",
        partials: ["./partials/*.hbs"],
        helpers: ["./helpers/*.js"],
        readme: "./README.md",
        exclude: "**/*.json,**/*.d.ts,**/*.map",
      }),
    ],
  },
});

```

## Live Example

This entire project serves as a live example. You can view it [here](https://blakmatrix.github.io/vitepress-jsdoc/) or browse the files directly on [GitHub](https://github.com/blakmatrix/vitepress-jsdoc).

## Command Line Example

```bash
npx vitepress-jsdoc --source ./src --dist ./docs --folder code --title API
```

## Vitepress Configuration

For a quick start with Vitepress:

1. Initialize Vitepress in your project with `npx vitepress init`.
2. Update your `config.mts` file as shown below.
3. Run the development server with `npm run docs:dev`.
4. Build for production with `npm run docs:build` (Note: the watch plugin will not run in this mode).

## Sidebar Configuration

While `vitepress-jsdoc` is agnostic to sidebars, it's recommended to use `vitepress-sidebar` for a more enhanced experience. Configure your `vitepress` `config.mts` file as follows:

```ts
import { defineConfig } from "vitepress";
import { generateSidebar } from "vitepress-sidebar";

const getSideBar = (): any => {
  const generatedSidebar = generateSidebar([
    {
      documentRootPath: "docs",
      useTitleFromFileHeading: true,
      hyphenToSpace: true,
      keepMarkdownSyntaxFromTitle: true,
    },
  ]);
  return generatedSidebar ?? [];
};

export default defineConfig({
  title: "<your package title>",
  description: "<your package description>",
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "API", link: "/code/README" },
    ],
    sidebar: getSideBar(),
    outline: { level: [2, 6] },
  },
});
```

## Plugin/Command Options

These are plugin/command options:

| Option            | Description |
|-------------------|-------------|
| `folder`          | Folder name |
| `source`          | Source directory |
| `dist`            | Destination directory |
| `title`           | Title of your documentation |
| `partials`        | Path to partial templates for JSDoc config|
| `helpers`         | Path to helper scripts for JSDoc config |
| `readme`          | Path to custom README |
| `exclude`         | Pattern to exclude files/folders |

## Contributions

We welcome and appreciate contributions from the community. If you have improvements, bug fixes, or other suggestions, please submit a pull request.

If you find value in this project and wish to show your support in other ways, consider sponsoring us. Your sponsorship will help ensure the continued development and improvement of this project.

[Sponsor this project](https://github.com/blakmatrix/vitepress-jsdoc?sponsor=1)


## License

MIT.


[npm]: https://img.shields.io/npm/v/vitepress-jsdoc.svg
[npm-url]: https://npmjs.com/package/vitepress-jsdoc
[node]: https://img.shields.io/node/v/vitepress-jsdoc.svg
[node-url]: https://nodejs.org
[prs]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg
[prs-url]: https://github.com/blakmatrix/vitepress-jsdoc/blob/master/CONTRIBUTING.md
[licenses-url]: https://app.fossa.io/projects/git%2Bhttps%3A%2F%2Fgithub.com%2Fblakmatrix%2Fvitepress-jsdoc?ref=badge_shield
[licenses]: https://app.fossa.io/api/projects/git%2Bhttps%3A%2F%2Fgithub.com%2Fblakmatrix%2Fvitepress-jsdoc.svg?type=shield
[xo]: https://shields.io/badge/code_style-5ed9c7?logo=xo&labelColor=gray
[xo-url]: https://github.com/xojs/xo