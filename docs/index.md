---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "vitepress-jsdoc"
  text: "JSDocs at Vite Speed."
  tagline: <strong>JSDoc Meets VitePress:</strong> Rapid Doc Generation.
  actions:
    - theme: brand
      text: Guide
      link: /guide/
    - theme: alt
      text: Live Example & API
      link: /code/README
  image:
    src: /vitepress_jsdoc_logo.svg
    alt: vitepress-jsdoc logo

features:
  - icon: <img src="/vitepress.svg">
    title: Seamless Integration with vitepress
    details: Seamlessly integrate JSDoc comments into your VitePress site. Our tool is purpose-built to harness the power of VitePress, ensuring rapid documentation generation without a hitch. Experience a unified development and documentation workflow like never before.
    link: "https://vitepress.dev/"
    linkText: "Vitepress site"
  - icon: 📖
    title: JSDoc Enhanced
    details: Dive deeper with <code>vitepress-jsdoc</code>. Harness the power of JSDoc annotations to generate comprehensive documentation. From detailed function descriptions to intricate class hierarchies, make your VitePress site a rich source of knowledge for your codebase.
    link: "https://jsdoc.app/"
    linkText: "Learn More about JSDoc"
  - icon: 🛠️
    title: Built for Developers
    details: <code>vitepress-jsdoc</code> is crafted with developers in mind. From easy setup to intuitive commands, every aspect is designed to streamline your documentation process. Dive deep into the code, and let us handle the docs.
    link: "https://github.com/blakmatrix/vitepress-jsdoc"
    linkText: "GitHub Repository"
  - icon: 🤝
    title: "Active Community and Transparent Development"
    details: "With <code>vitepress-jsdoc</code>, you're never coding alone. Join an active community of developers, get swift answers to queries, and enjoy the benefits of open and transparent development. We value every contributor, and our maintenance is a labor of love."
    link: https://github.com/blakmatrix/vitepress-jsdoc/blob/master/CONTRIBUTING.md
    linkText: "Contribute to vitepress-jsdoc"


---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe 30%, #41d1ff);

  --vp-home-hero-image-background-image: linear-gradient(-45deg, #bd34fe 50%, #47caff 50%);
  --vp-home-hero-image-filter: blur(40px);
}

@media (min-width: 640px) {
  :root {
    --vp-home-hero-image-filter: blur(56px);
  }
}

@media (min-width: 960px) {
  :root {
    --vp-home-hero-image-filter: blur(72px);
  }
}
</style>
