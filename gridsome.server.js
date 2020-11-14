// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = function (api) {
  api.loadSource(({ addCollection }) => {
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
  })

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
  })
}

/*
  This plugin inspired from gridsome-plugin-netlify-cms-paths which did not meet my needs
  Consider making it a public plugin
*/
const fs = require('fs')
const path = require('path')
const RemarkTransformer = require('@gridsome/transformer-remark')
const traverse = require('traverse')

class NetlifyPaths {
  constructor(api, options = {}) {
    this.options = options

    const {_app, config, context, store} = api

    for (const {use, options: opts} of config.plugins) {
      if (use === '@gridsome/source-filesystem' && opts.typeName) {
        const {typeName, route} = opts,
          ContentType = store.addContentType({
            typeName: typeName,
            route: route,
          })

        // Patch remark transformer to fix image paths in markdown bodies
        for (const mimeType of RemarkTransformer.mimeTypes()) {
          const transformer = ContentType._transformers[mimeType]
          if (transformer instanceof RemarkTransformer) {
            console.info(
              `Patching RemarkTransformer for ${typeName} (${mimeType})`,
            )
            const _resolve = transformer.resolveNodeFilePath.bind(transformer)
            transformer.resolveNodeFilePath = (node, toPath) =>
              _resolve(node, this.fixPath(toPath))
          }
        }

        // Fix cover images
        let self = this
        console.info(`Fixing image paths for ${typeName}`)
        ContentType.on('add', node => {
          traverse(node).forEach(function(item) {
            if (typeof(item) === 'string' && item.match(/.(jpg|jpeg|png|svg|gif)$/i)) {
              this.update(self.fixPath(item, context + '/' + node.fileInfo.directory + '/'))
            }
          })
        })
      }
    }
  }

  fixPath(imagePath, nodePath) {
    let out = imagePath
    if (imagePath !== undefined) {
      if (!imagePath.includes('/')) {
        if (nodePath) {
          out = nodePath + imagePath
        } else {
          out = './' + imagePath
        }
      }
    }
    return out
  }
}

module.exports = NetlifyPaths
