// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'B    I    P',
  tagline: 'biust   insight   project',
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

  presets: [
    [

      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
          gtag: {
          trackingID: 'GTM-PHDC9B7C',
          anonymizeIP: false,
        },
         googleTagManager: {
          containerId: 'GTM-PHDC9B7C',
        },
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/do                                                                                                                                   cusaurus/tree/main/packages/create-docusaurus/templates/shared/',
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
      }),

    ],

  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
  
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: false,
  
  },
      // Replace with your project's social card
      image: 'img/logo.svg',
      navbar: {
        hideOnScroll: true,
        title: 'BIP',
        logo: {
          alt: 'site logo',
          src: 'img/logo.svg',
        },
        items: [

          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'right',
            label: 'The Archive',
          },
          {label:"About",position:'right',type:"dropdown",items:[
            {label:"Me",to:"/docs/about-me"},
     {label:"The Project",to:"/docs/why-project"},


        
          ]},
          {label:"Portals",position:'left',type:"dropdown",items:[
            {label:"Blackboard",href:"https://biust.blackboard.com/"},
     {label:"Basis",href:"https://portal.biust.ac.bw/"},
   


        
          ]},

 
 

          
          {to: '/docs/photo-gallery/daily', label: 'Photo Gallery', position: 'right'},
          {to: '/docs/challanges/main', label: 'Contritbue ', position: 'right'},


        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Info',
            items: [

   {
                label: 'Project stats',
                to: '/docs/project-stats',
              },

               {
                label: 'About the  Project',
                to: '/docs/why-project',
              },
 {
                label: 'developer ',
                to: '/docs/about-me',
              },
            ],
          },

          {
            title: 'Contribute / Join',
            items: [
              {
                label: 'Github',
                to: 'https://github.com/the-dezeray/biust-insight-project',
              },
              {
                label: 'Contributers',
                href: 'https://github.com/the-dezeray/biust-insight-project/tree/main',
              },
{
                label: 'Documentaion',
                href: 'https://github.com/the-dezeray/biust-insight-project/tree/main',
              },

            ],
          },
 {
            title: 'Legal',
            items: [
    
              {
                label: 'Terms',
                href: '/docs/terms',
              },
{
                label: 'Cookie Policy',
                href: '/docs/cookie-policy',
              },

            ],
          },
       
        ],
    
        copyright: " <br/> <br> <br>The content provided in this archive is for educational use only. While I encourage collaboration and resource sharing, I will   not  beresponsible for any instances of plagiarism, loss of marks, or other academic consequences that may arise from the use of this material. Users are advised to adhere to their institution’s academic integrity policies when utilizing these resources. Thank you for your understanding.<br/> Desiree",  
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
