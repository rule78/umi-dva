const path = require('path')
export default {
  publicPath: "http://ruler.applinzi.com/dist/",
  history: 'hash',
  hash: true,
  plugins: [
    ['umi-plugin-react', {
      antd: true,
      dva: {
        immer: true
      },
      dynamicImport: {
        loadingComponent: 'components/Loading'
      },
      dll: false,
      routes: {
        exclude: [
          /model\.(j|t)sx?$/,
          /service\.(j|t)sx?$/,
          /models\//,
          /components\//,
          /services\//,
        ]
      },
      hd: true,
      hardSource: false,
      fastClick: true,
    }],
  ],
  alias: {
    components: path.resolve(__dirname, 'src/components'),
    utils: path.resolve(__dirname, 'src/utils'),
    services: path.resolve(__dirname, 'src/services'),
    models: path.resolve(__dirname, 'src/models'),
    images: path.resolve(__dirname, 'src/assets')
  },
  targets: {
    ie: 9,
  },
  sass: {}
}

