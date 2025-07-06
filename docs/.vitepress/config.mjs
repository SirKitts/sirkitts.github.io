import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'SirKitts Docs',
  description: 'Tutorials and guides for useful frontend utilities',
  base: '/docs/',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guides', link: '/guides/show-feature' },
      { text: 'GitHub', link: 'https://github.com/SirKitts' }
    ],
    sidebar: {
      '/docs/guides/': [
        {
          text: 'Guides',
          items: [
            { text: 'show-feature', link: '/docs/guides/show-feature' },
            { text: 'another-lib', link: '/docs/guides/another-lib' }
          ]
        }
      ]
    }
  }
});
