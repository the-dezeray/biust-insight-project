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
  favicon: '/img/logo.svg',

  // Set the production url of your site here
  url: 'https://halo-saber.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/biust-insight-project/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'halo-saber', // Usually your GitHub org/user name.
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
      image: 'img/docusaurus-social-card.jpg',
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
            label: 'Drives',
          },
          {label:"Clubs",position:'right',type:"dropdown",items:[
            {label:"Join",to:"/docs/clubs/join"},
     {label:"Explore",to:"/docs/clubs/list-of-clubs"},
     {label:"Create club",to:"/docs/clubs/list-of-clubs"},


        
          ]},
          {label:"Portals",position:'left',type:"dropdown",items:[
            {label:"Blackboard",href:"https://biust.blackboard.com/"},
     {label:"Basis",href:"https://portal.biust.ac.bw/"},
   


        
          ]},

 
 
          {to: '/docs/why-biust', label: 'News', position: 'right'},
          
          {to: '/docs/photo-gallery/daily', label: 'Photo Gallery', position: 'right'},
          {to: '/docs/challanges/main', label: 'Challenges', position: 'right'},

          {label:"Biust",position:'right',type:"dropdown",items:[
            {label:"programs offered",to:"/docs/clubs/join"},
     {label:"apply",to:"/docs/clubs/list-of-clubs"},
{label:"contact directory",to:"/docs/clubs/list-of-clubs"},
{label:"biust map",to:"/docs/clubs/list-of-clubs"},
{label:"Src",to:"/docs/clubs/list-of-clubs"},




        
          ]},
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Info',
            items: [
              {
                label: 'FAQs',
                to: '/docs/why-biust',
              },
   {
                label: 'Resources',
                to: '/docs/why-biust',
              },
   {
                label: 'About Biust',
                to: '/docs/why-biust',
              },
               {
                label: 'About Project',
                to: '/docs/why-biust',
              },
 {
                label: 'About Me',
                to: '/docs/why-biust',
              },
            ],
          },
          {
            title: 'Join Us',
            items: [
              {
                label: 'Members of the team',
                href: 'https://stackoverflow.com/questions/tagged/docusaurus',
              },
              {
                label: 'Developer Credits',
                href: 'https://discordapp.com/invite/docusaurus',
              },
              {
                label: 'How to contibute',
                href: 'https://twitter.com/docusaurus',
              },
            ],
          },
          {
            title: 'Project',
            items: [
              {
                label: 'Github',
                to: '/docs/why-biust',
              },
              {
                label: 'Maintainers',
                href: 'https://github.com/facebook/docusaurus',
              },
{
                label: 'Documentaion',
                href: 'https://github.com/facebook/docusaurus',
              },

            ],
          },
 {
            title: 'Legal',
            items: [
              {
                label: 'Privacy',
                to: '/docs/why-biust',
              },
              {
                label: 'Terms',
                href: 'https://github.com/facebook/docusaurus',
              },
{
                label: 'Cookie Policy',
                href: 'https://github.com/facebook/docusaurus',
              },

            ],
          },
       
        ],
    
        copyright: `  <img src={LogoSvg} ><p style="color:#D6BD98"> </br>This project is currently in the alpha stage. I built it as a way to enhance my skills as a Computer Science major and to address the technological infrastructure gaps I noticed at BIUST. I hope to find others who share my interests to form a community. Feel free to join me! </br> </br>
Copyright © ${new Date().getFullYear()} Biust Insight Project. Built by Desiree and others </p>.
`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
