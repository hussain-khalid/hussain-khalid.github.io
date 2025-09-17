import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Hussain Khalid | Writing Portfolio',
  tagline: 'Technical Writing & Documentation Samples',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://hussain-khalid.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'hussain-khalid', // Usually your GitHub org/user name.
  projectName: 'hussain-khalid.github.io', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Hussain Khalid',
      logo: {
        alt: 'Hussain Khalid Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'writingSamplesSidebar',
          position: 'left',
          label: 'Writing Samples',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/hussain-khalid',
          label: 'GitHub',
          position: 'right',
        },
        {
          href: 'https://linkedin.com/in/b825b712a',
          label: 'LinkedIn',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Writing Samples',
          items: [
            {
              label: 'Technical Documentation',
              to: '/docs/intro',
            },
            {
              label: 'API Documentation',
              to: '/docs/tutorial-basics/create-a-document',
            },
          ],
        },
        {
          title: 'Contact',
          items: [
            {
              label: 'Email',
              href: 'mailto:hk9804211@gmail.com',
            },
            {
              label: 'LinkedIn',
              href: 'https://linkedin.com/in/b825b712a',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/hussain-khalid',
            },
          ],
        },
        {
          title: 'Portfolio',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'Writing Samples',
              to: '/docs/intro',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Hussain Khalid. All rights reserved.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
