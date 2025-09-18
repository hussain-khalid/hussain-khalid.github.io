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
      label: 'SDK Integration',
      items: [
        'sdk-integration/video-calling-sdk-guide',
        'sdk-integration/api-getting-started',
      ],
    },
    {
      type: 'category',
      label: 'User Guides',
      items: [
        'user-guides/user-guide-onboarding',
        'user-guides/congratulations',
      ],
    },
    {
      type: 'category',
      label: 'Developer Tools',
      items: [
        'developer-tools/create-a-document',
        'developer-tools/create-a-page',
        'developer-tools/deploy-your-site',
      ],
    },
    {
      type: 'category',
      label: 'Docusaurus Admin',
      items: [
        'docusaurus-admin/manage-docs-versions',
        'docusaurus-admin/translate-your-site',
      ],
    },
  ],
};

export default sidebars;
