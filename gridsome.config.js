// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Photoblog',
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
    }
  ],
  templates: {
    Post: '/post/:year-:month-:day-:title'
  }
}
