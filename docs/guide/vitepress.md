---
order: 2
---

# Setting Up Vitepress

If you're new to Vitepress or need a refresher, this section will cover the basics of getting Vitepress up and running, serving as a foundation for the `vitepress-jsdoc` integration.

## Initializing Vitepress

To start with Vitepress, you'll first need to initialize it in your project. This can be done using the following command:

```bash
npx vitepress init
```

This command sets up the necessary Vitepress directories and configuration files in your project.

## Vitepress Configuration

Once initialized, you'll have a `config.mts` file in your project. This file is where you'll define various Vitepress configurations. For a basic setup, you can leave the default configurations as they are. However, as you progress, you might want to customize it to suit your project's needs.

## Running Vitepress in Development Mode

To see your Vitepress site in action, you can run the development server:

```bash
npm run docs:dev
```

This command starts a local server, and you can view your Vitepress site by navigating to the provided URL in your browser. Any changes you make to your documentation will be reflected in real-time.

## Building Vitepress for Production

Once you're satisfied with your documentation, you can build it for production using:

```bash
npm run docs:build
```

This command generates static files for your Vitepress site, which can be deployed to any static file hosting service.
