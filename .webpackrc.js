const pxtorem = require('postcss-pxtorem')
//配合HD方案,750设计稿
export default {
    extraPostCSSPlugins: [
        pxtorem({
            rootValue: 100 * (1080 / 750),
            propWhiteList: [],
        })
    ]
}