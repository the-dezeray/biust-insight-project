// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Biust Insight Project',
  tagline: 'biust insight project',
  favicon: '/img/social-card.png',

  // Set the production url of your site here
  url: 'https://the-dezeray.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/biust-insight-project/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'the-dezeray', // Usually your GitHub org/user name.
  projectName: 'biust-insight-project', // Usually your repo name.

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
plugins: 
[
    // Other plugins
    [
      'docusaurus-plugin-dotenv',
      {
          path: "./.env", 
          systemvars: true, 
      }
    ],
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),

      ({
        // ... Your options.
        // `hashed` is recommended as long-term-cache of index file is possible.
        hashed: true,
        // For Docs using Chinese, The `language` is recommended to set to:
        // ```
        // language: ["en", "zh"],
        // ```
      }),
    ],
    // ... Your other themes.

  
],
  presets: [
    [

      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        pages :{showLastUpdateAuthor:true,showLastUpdateTime:true},
          gtag: {
          trackingID: 'G-DJKE85H5XJ',
          anonymizeIP: false,
        },
         googleTagManager: {
          containerId: 'GTM-WZ8LD4SX',
        },
   
        docs: {
        sidebarPath: './sidebars.js',
    
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/the-dezeray/biust-insight-project/blob/',
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
            'https://github.com/the-dezeray/biust-insight-project/blob/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),

    ],

  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
       docs: {
      sidebar: {
        hideable: true,
      },
    },
 metadata: [
      { name: 'keywords', content: 'BIUST, test papers, labs, exams, archive, students, university,insight,project' },
      { name: 'description', content: 'The BIUST Insight Project is an archive of past test papers, labs, and exams for students at BIUST, providing resources to aid study and academic performance.' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'BIUST Insight Project - An Archive of Past Test , Lab & Exam Documents' },
      { name: 'twitter:description', content: 'Access past test papers, labs, and exams to help you prepare for assessments at BIUST.' },
      { name: 'twitter:image', content: 'img/logo.png' },
      {name: 'author',content:'Desiree Chingwaru'}
    ],
  
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: false,
     // Declare some <meta> tags
 },

   
      // Replace with your project's social card
      image: 'img/logo.svg',
      navbar: {
        hideOnScroll: true,
        
        logo: {
          alt: 'site logo',
          src: 'img/logo.svg',
        },
        items: [
        
             {
          to: '/docs/category/modules',
          // Only one of "to" or "href" should be used
          // href: 'https://www.facebook.com',
          label: 'Files',
          // Only one of "label" or "html" should be used
          // html: '<b>Introduction</b>'
          position: 'left',
          activeBaseRegex: 'docs/(next|v8)',
           // Open link in a new tab
          rel: 'noopener noreferrer', // Recommended for security when using target="_blank"
          className: 'custom-navbar-item', // Custom class for styling
        },

],
      },
footer: {
  style: 'dark',
  links: [
    {
      title: 'Info',
      items: [
        {
          label: 'Project Stats',
          to: '/blog/project-stats',
        },
        {
          label: 'About the Project',
          to: '/blog/why-project',
        },
        {
          label: 'Developer',
          to: '/blog/about-me',
        },
      ],
    },
    {
      title: 'Contribute / Join',
      items: [
        {
          label: 'GitHub',
          to: 'https://github.com/the-dezeray/biust-insight-project',
        },
        {
          label: 'Contributors',
          href: 'https://github.com/the-dezeray/biust-insight-project/tree/main',
        },
        {
          label: 'Documentation',
          href: 'https://github.com/the-dezeray/biust-insight-project/tree/main',
        },
      ],
    },
    {
      title: 'Legal',
      items: [
        {
          label: 'Terms',
          href: '/blog/terms',
        },
        {
          label: 'Cookie Policy',
          href: '/blog/cookie-policy',
        },
      ],
    },
  ],
  copyright: `
    <div style="text-align: center; margin-top: 20px;">
      <p>The content provided in this archive is for educational use only. 
      While I encourage collaboration and resource sharing, I will not be responsible for 
      any instances of plagiarism, loss of marks, or other academic consequences that may arise 
      from the use of this material. Users are advised to adhere to their institution’s academic 
      integrity policies when utilizing these resources. Thank you for your understanding.</p>
      <p>Copyright © ${new Date().getFullYear()} Desiree</p>
    </div>
  `,
},

      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
 headTags: [
    // Declare a <link> preconnect tag
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://the-dezeray.github.io/biust-insight-project',
      },
    },
    // Declare some json-ld structured data
    {
      tagName: 'script',
      attributes: {
        type: 'application/ld+json',
      },
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org/',
        '@type': 'CreativeWork',
        name: 'Biust Insight Project',
        url: 'https://the-dezeray.github.io./biust-insight-project/',
        logo: 'img/logo.png',
      }),
    },
  ],
  stylesheets: [
    {
      href: '/css/custom.css',
      type: 'text/css',
    },
  ],
};

export default config;
