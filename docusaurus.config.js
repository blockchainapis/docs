// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Blockchain APIs',
  tagline: 'Fast and easy DeFi data access across many blockchains. Take a look at tokens, liquidity pools, and exchange rates with our API.',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://docs.blockchainapis.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Blockchain APIs', // Usually your GitHub org/user name.
  projectName: 'docs', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
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
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/blockchainapis/docs',
        },
        theme: {
          customCss: require.resolve('./src/css/tranquil-blue.css'),
        },
        gtag: {
          trackingID: 'GTM-N8RJVWP9',
          anonymizeIP: false
        },
        googleTagManager: {
          containerId: 'GTM-N8RJVWP9'
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: [],
          filename: 'sitemap.xml'
        }
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: "Blockchain APIs",
        logo: {
          alt: 'Blockchain APIs logo',
          src: 'img/logo-small.png',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Tutorial',
          },
          {
            href: "https://api.blockchainapis.io/docs",
            label: 'API Playground',
            position: 'left'
          },
          {
            href: "https://discord.gg/GphRMJXmS5",
            label: 'Discord',
            position: 'left'
          },
          {
            type: "dropdown",
            label: "SDK references",
            position: "right",
            items: [
              {
                label: "Python SDK",
                type: "docSidebar",
                sidebarId: "pythonSDKSidebar"
              }
            ]
          },
          {
            href: 'https://github.com/blockchainapis',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Getting started',
                to: '/docs/tutorial/getting-started/',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Discord',
                href: 'https://discord.gg/GphRMJXmS5',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/blockchain_apis',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/blockchainapis',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} <a href="https://www.blockchainapis.io/" target="_blank">Blockchain APIs</a>`,
      },
      prism: {
        additionalLanguages: ['powershell'],
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
