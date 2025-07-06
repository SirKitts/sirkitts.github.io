import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'SirKitts Docs',
  description: 'Tutorials and guides for useful frontend utilities',
  base: '/',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guides', link: '/guides/show-feature' },
      { text: 'GitHub', link: 'https://github.com/SirKitts' }
    ],
    sidebar: {
      '/guides/': [
        {
          text: 'Guides',
          items: [
            { text: 'show-feature', link: '/guides/show-feature' },
            { text: 'another-lib', link: '/guides/another-lib' }
          ]
        }
      ]
    }
  }
});
