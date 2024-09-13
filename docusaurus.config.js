// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'BIUST',
  tagline: 'Driving inspiration and change',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
<<<<<<< HEAD
  url: 'https://another-desiree.github.io',
=======
  url: 'https://the-dezeray.github.io',
>>>>>>> fa8d8fc (feat : welcome page redesign)
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/biust-insight-project/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
<<<<<<< HEAD
  organizationName: 'another-desiree', // Usually your GitHub org/user name.
=======
  organizationName: 'the-dezeray', // Usually your GitHub org/user name.
>>>>>>> fa8d8fc (feat : welcome page redesign)
  projectName: 'biust-insight-project', // Usually your repo name.

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
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
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
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        hideOnScroll: true,
        title: 'My Site',
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo.svg',
        },
        items: [

          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
<<<<<<< HEAD
            position: 'left',
            label: 'Tutorial',
          },
          {label:"Study",position:'left',type:"dropdown",items:[
            {label:"why study at biust",href:"https://github.com/facebook/docusaurus"}
          ]},
          {to: '/blog', label: 'Blog', position: 'left'},
          {
            href: 'https://github.com/facebook/docusaurus',
            label: 'GitHub',
            position: 'right',
          },
=======
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


>>>>>>> fa8d8fc (feat : welcome page redesign)
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
<<<<<<< HEAD
              {
                label: 'Tutorial',
                to: '/docs/intro',
=======

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
>>>>>>> fa8d8fc (feat : welcome page redesign)
              },
            ],
          },

          {
<<<<<<< HEAD
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/docusaurus',
              },
              {
                label: 'Discord',
                href: 'https://discordapp.com/invite/docusaurus',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/docusaurus',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/facebook/docusaurus',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
=======
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
>>>>>>> fa8d8fc (feat : welcome page redesign)
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
