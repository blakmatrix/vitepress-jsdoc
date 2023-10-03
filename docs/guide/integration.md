---
order: 3
---
# Integrating the `vitepress-jsdoc` Plugin

Once Vitepress is set up, we'll delve into integrating the `vitepress-jsdoc` plugin, enhancing your documentation generation capabilities.

## Plugin Mode Integration

For a seamless integration into Vitepress, it's recommended to use the plugin mode. This mode allows you to harness the full power of `vitepress-jsdoc` within your Vitepress project.

Here's an example configuration to integrate `vitepress-jsdoc`:

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

This configuration imports the `vitepress-jsdoc` plugin and adds it to the Vitepress configuration. The options provided in the `VitpressJsdocPlugin` function allow you to customize the behavior of the plugin, such as specifying the source directory, destination directory, title, and more.

By integrating the `vitepress-jsdoc` plugin in this manner, you can swiftly generate comprehensive documentation from your JSDoc-style annotations and seamlessly integrate your code insights into beautifully rendered Vitepress pages.
