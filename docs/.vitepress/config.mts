import { defineConfig } from "vitepress";

import { generateSidebar } from "vitepress-sidebar";
import VitpressJsdocPlugin from "../../dist/esm/index";


const getSideBar = (): any => {
  const generatedSidebar = generateSidebar([
    {
      documentRootPath: "docs",
      scanStartPath: "guide",
      resolvePath: "/guide/",
      useTitleFromFileHeading: true,
      hyphenToSpace: true,
      keepMarkdownSyntaxFromTitle: true,
      sortMenusByFrontmatterOrder: true,
    },
    {
      documentRootPath: "docs",
      //scanStartPath: 'code',
      useTitleFromFileHeading: true,
      hyphenToSpace: true,
      excludeFolders: ["vitepress-how-to"],
      keepMarkdownSyntaxFromTitle: true,
    },
  ]);
  return generatedSidebar ?? [];
};
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "vitepress-jsdoc",
  base: "/vitepress-jsdoc/",
  description: "vitepress-jsdoc description",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Guide", link: "/guide/" },
      { text: "Live Example & API", link: "/code/README" },
    ],

    logo: "/vitepress_jsdoc_logo.svg",

    sidebar: getSideBar(),
    outline: { level: [2, 6] },

    socialLinks: [
      { icon: "github", link: "https://github.com/blakmatrix/vitepress-jsdoc" },
    ],
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2023-present | Made by Farrin A. Reid with ❤️",
    },
  },
  vite: {
    plugins: [
      
        VitpressJsdocPlugin({
          folder: "code",
          source: "./dist/esm/",
          dist: "./docs",
          title: "API",
          partials: ["./dist/esm/partials/*.hbs"],
          helpers: ["./dist/esm/helpers/*.js"],
          readme: "./README.md",
          exclude: "**/*.json,**/*.hbs,**/*.d.ts,**/*.map,**/interfaces.*",
        }),
      
    ],
  },
});
