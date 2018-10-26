const path = require('path')
export default {
  plugins: [
    ['umi-plugin-react', {
      antd: true,
      dva: {
        immer: true
      },
      dynamicImport: true,
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
}

