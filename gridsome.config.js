// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteUrl: 'https://photoblog.hildemorin.com',
  siteName: "Hilde's Photoblog",
  siteDescription: "Hilde's Photoblog",
  metadata: {
    twitterId: '@HildeVMorin',
    keywords: 'photos,photoblog,pictures,photography'
  },
  plugins: [
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'content/posts/**/post.md',
        typeName: 'Post',
        remark:{
          autolinkHeadings: false
        }
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'content/about/about.md',
        typeName: 'About',
        remark:{
          autolinkHeadings: false
        }
      }
    },
    {
      use: 'gridsome-plugin-rss',
      options: {
        contentTypeName: 'Post',
        feedOptions: {
          title: "Hilde's photoblog",
          feed_url: 'https://photoblog.hildemorin.com/rss.xml',
          site_url: 'https://photoblog.hildemorin.com'
        },
        feedItemOptions: node => ({
          title: node.title,
          date: node.date,
          url: 'https://photoblog.hildemorin.com' + node.path
        }),
        output: {
          dir: './static',
          name: 'rss.xml'
        }
      }
    },
    {
      use: '@gridsome/plugin-google-analytics',
      options: {
        id: 'UA-73407918-2'
      }
    },
    {
      use: '@gridsome/plugin-sitemap'
    }
  ],
  templates: {
    Post: '/post/:year-:month-:day-:title'
  }
}
