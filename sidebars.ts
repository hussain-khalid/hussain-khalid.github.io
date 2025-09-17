import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  writingSamplesSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Technical Documentation',
      items: [
        'tutorial-basics/create-a-document',
        'tutorial-basics/create-a-page',
        'tutorial-basics/markdown-features',
      ],
    },
    {
      type: 'category',
      label: 'API Documentation',
      items: [
        'tutorial-basics/deploy-your-site',
      ],
    },
    {
      type: 'category',
      label: 'User Guides',
      items: [
        'tutorial-basics/congratulations',
        'tutorial-basics/create-a-blog-post',
      ],
    },
  ],
};

export default sidebars;
