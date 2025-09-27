import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Hussain Khalid',
  tagline: 'Technical documentation specialist',
  favicon: 'img/favicon.svg',

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
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  stylesheets: [
    'https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700&family=Source+Sans+Pro:wght@300;400;500;600;700&display=swap',
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/portfolio-social-card.svg',
    metadata: [
      {name: 'keywords', content: 'technical writer, API documentation, SDK documentation, video calling APIs, developer documentation, JavaScript documentation, React Native, Java documentation, C++ documentation, C# documentation, Docusaurus, docs-as-code, Computer Science, Hussain Khalid'},
      {name: 'author', content: 'Hussain Khalid'},
      {property: 'og:type', content: 'website'},
      {property: 'og:title', content: 'Hussain Khalid | Technical Writer - Video Calling APIs & SDKs'},
      {property: 'og:description', content: 'Technical writer with Computer Science background and 4+ years creating developer documentation for Video Calling APIs and SDKs across JavaScript, React Native, Java, C++, and C#.'},
      {property: 'og:image', content: 'https://hussain-khalid.github.io/img/portfolio-social-card.svg'},
      {name: 'twitter:card', content: 'summary_large_image'},
      {name: 'twitter:title', content: 'Hussain Khalid | Technical Writer - Video Calling APIs & SDKs'},
      {name: 'twitter:description', content: 'Technical writer specializing in developer documentation for Video Calling APIs and SDKs across multiple programming languages.'},
    ],
    navbar: {
      title: 'Hussain Khalid',
      logo: {
        alt: 'Hussain Khalid Logo',
        src: 'img/logo.svg',
        srcDark: 'img/logo-dark.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'writingSamplesSidebar',
          position: 'left',
          label: 'Writing samples',
        },
        {
          to: '/about',
          position: 'left',
          label: 'About',
        },
        {
          to: '/projects',
          position: 'left',
          label: 'Projects',
        },
        {
          to: '/contact',
          position: 'left',
          label: 'Contact',
        },
        {
          href: 'https://github.com/hussain-khalid',
          label: 'GitHub',
          position: 'right',
        },
        {
          href: 'https://www.linkedin.com/in/b825b712a/',
          label: 'LinkedIn',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Writing samples',
          items: [
            {
              label: 'Technical documentation',
              to: '/docs/intro',
            },
            {
              label: 'API documentation',
              to: '/docs/sdk-documentation/video-calling-sdk-guide',
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
              href: 'https://www.linkedin.com/in/b825b712a/',
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
              label: 'Writing samples',
              to: '/docs/intro',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/hussain-khalid',
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
