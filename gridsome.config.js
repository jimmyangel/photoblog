// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteUrl: 'https://photoblog-hildemorin.netlify.app',
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
        coverField: 'thumbnail',
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
      use: 'gridsome-plugin-netlify-cms',
      options: {
        publicPath: '/admin'
      }
    },
    {
      use: 'gridsome-plugin-rss',
      options: {
        contentTypeName: 'Post',
        feedOptions: {
          title: "Hilde's photoblog",
          feed_url: 'https://photoblog-hildemorin.netlify.app/rss.xml',
          site_url: 'https://photoblog-hildemorin.netlify.app'
        },
        feedItemOptions: node => ({
          title: node.title,
          date: node.date,
          url: 'https://photoblog-hildemorin.netlify.app/post/' + node.path
        }),
        output: {
          dir: './static',
          name: 'rss.xml'
        }
      }
    }
  ],
  templates: {
    Post: '/post/:year-:month-:day-:title'
  }
}
