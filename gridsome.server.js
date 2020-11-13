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

const fs = require('fs')
const path = require('path')
const RemarkTransformer = require('@gridsome/transformer-remark')

class NetlifyPaths {
  // defaultOptions merged with this.options in App.vue
  static defaultOptions() {
    return {
      contentTypes: ['Post', 'About'],
      coverField: undefined,
    }
  }

  constructor(api, options = {}) {
    this.options = options

    const {_app, config, context, store} = api

    for (const {use, options: opts} of config.plugins) {
      if (use === '@gridsome/source-filesystem' && opts.typeName) {
        console.log('Type:', opts)
        const {typeName, route} = opts,
          coverField = opts.coverField || options.coverField,
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
        if (coverField !== undefined) {
          console.info(`Fixing cover images for ${typeName}.${coverField}`)
          ContentType.on('add', node => {
            node[coverField] = this.fixPath(node[coverField], context + '/' + node.fileInfo.directory + '/')
            console.log(node)
          })
        }
      }
    }
  }

  fixPath(imagePath, nodePath) {
    console.log(imagePath, nodePath)
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
    console.log(out)
    return out
  }
}

module.exports = NetlifyPaths
