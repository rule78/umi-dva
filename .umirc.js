const path = require('path')
export default {
  // routes: [
  //   { path: '/', component: './list' }
  // ],
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
          /mock\.(j|t)sx?$/,
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

