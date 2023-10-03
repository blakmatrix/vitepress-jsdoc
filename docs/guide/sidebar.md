---
order: 4
---

# Sidebar Integration and Recommendations

A well-organized sidebar can greatly enhance the user experience. We'll provide recommendations and guide you through the process of integrating a dynamic sidebar into your documentation.

## Install `vitepress-sidebar`

For an enhanced documentation experience, we recommend using [`vitepress-sidebar`](https://github.com/jooy2/vitepress-sidebar). This tool automates the generation of sidebars based on your documentation structure.

To install `vitepress-sidebar`, run the following command:

```bash
npm i -D vitepress-sidebar
```

## Configure your Vitepress

After installing `vitepress-sidebar`, you'll need to configure it within your Vitepress project. Here's a step-by-step guide:

1. **Import Necessary Modules**: Start by importing the required modules in your `config.mts` file:

```typescript
import { defineConfig } from "vitepress";
import { generateSidebar } from "vitepress-sidebar";
```

2. **Generate Sidebar**: Use the `generateSidebar` function to create a dynamic sidebar based on your documentation structure:

```typescript
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
```

3. **Update Vitepress Configuration**: Integrate the generated sidebar into your Vitepress configuration:

```typescript
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

With these steps, you'll have a dynamic sidebar integrated into your Vitepress documentation, enhancing the navigation experience for your users.


