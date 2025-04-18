// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'BIUST Insight Project - Academic Resource Archive',
  tagline: 'Access past test papers, labs, and exams for BIUST students',
  favicon: '/img/favicon.ico', // Consider using a .ico file for better compatibility

  // Set the production url of your site here
  url: 'https://the-dezeray.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/biust-insight-project/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'the-dezeray', // Usually your GitHub org/user name.
  projectName: 'biust-insight-project', // Usually your repo name.

  onBrokenLinks: 'warn', // Change to 'throw' to ensure all links are valid
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
  async function myPlugin(context, options) {
    return {
      name: "docusaurus-tailwindcss",
      configurePostCss(postcssOptions) {
        // Appends TailwindCSS and AutoPrefixer.
        postcssOptions.plugins.push(require("tailwindcss"));
        postcssOptions.plugins.push(require("autoprefixer"));
        return postcssOptions;
      },
    };
  },
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
      {
        hashed: true,
        searchBarPosition: 'right',
      },
    ],
],
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        debug: process.env.NODE_ENV === 'development',
        theme: {
          customCss: './src/css/custom.css',
        },
        docs: {
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/the-dezeray/biust-insight-project/blob/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl: 'https://github.com/the-dezeray/biust-insight-project/blob/',
        },
        pages: {
          path: 'src/pages',
          routeBasePath: '/',
          include: ['**/*.{js,jsx,ts,tsx,md,mdx}'],
        },
        gtag: {
          trackingID: 'G-DJKE85H5XJ',
          anonymizeIP: true,
        },
        googleTagManager: {
          containerId: 'GTM-WZ8LD4SX',
        },
        sitemap: {
          lastmod: 'datetime',
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
          createSitemapItems: async (params) => {
            const {defaultCreateSitemapItems, ...rest} = params;
            const items = await defaultCreateSitemapItems(rest);
            return items.filter((item) => !item.url.includes('/page/'));
          },
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
    announcementBar: {
      id: 'project_update',
      content:
        '🚀 Discount availaible for this week  40 pula for monthly and 50 pula for the semester. <a href="/biust-insight-project/docs/category/modules">Explore now</a>',
      backgroundColor: '#4051b5',
      textColor: '#ffffff',
      isCloseable: true,
    },
 metadata: [
      { name: 'keywords', content: 'BIUST, test papers, labs, exams, archive, students, university, insight, project, academic resources, study materials' },
      { name: 'description', content: 'The BIUST Insight Project is a comprehensive archive of past test papers, labs, and exams for students at BIUST. Access high-quality academic resources to enhance your study and improve your academic performance.' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'BIUST Insight Project - Comprehensive Academic Resource Archive' },
      { name: 'twitter:description', content: 'Access a wealth of past test papers, labs, and exams to boost your academic preparation at BIUST.' },
      { name: 'twitter:image', content: 'https://the-dezeray.github.io/biust-insight-project/img/social-card.png' },
      { name: 'og:title', content: 'BIUST Insight Project - Academic Resource Archive' },
      { name: 'og:description', content: 'Enhance your studies with our comprehensive collection of past academic materials for BIUST students.' },
      { name: 'og:image', content: 'https://the-dezeray.github.io/biust-insight-project/img/social-card.png' },
      { name: 'og:url', content: 'https://the-dezeray.github.io/biust-insight-project/' },
      { name: 'og:type', content: 'website' },
      { name: 'author', content: 'Desiree Chingwaru' }
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
    {
      tagName: 'meta',
      attributes: {
        name: 'viewport',
        content: 'width=device-width, initial-scale=0.9, minimum-scale=0.9'
      }
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'canonical',
        href: 'https://the-dezeray.github.io/biust-insight-project/',
      },
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
