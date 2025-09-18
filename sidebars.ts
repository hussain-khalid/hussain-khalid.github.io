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
      label: 'SDK Documentation',
      items: [
        'tutorial-basics/video-calling-sdk-guide',
        'tutorial-basics/api-getting-started',
      ],
    },
    {
      type: 'category',
      label: 'Developer Guides',
      items: [
        'tutorial-basics/create-a-document',
        'tutorial-basics/deploy-your-site',
      ],
    },
    {
      type: 'category',
      label: 'User Onboarding',
      items: [
        'tutorial-basics/user-guide-onboarding',
        'tutorial-basics/congratulations',
      ],
    },
    {
      type: 'category',
      label: 'Technical Documentation',
      items: [
        'tutorial-basics/create-a-page',
      ],
    },
    {
      type: 'category',
      label: 'Documentation Management',
      items: [
        'tutorial-extras/manage-docs-versions',
        'tutorial-extras/translate-your-site',
      ],
    },
  ],
};

export default sidebars;
