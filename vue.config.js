const path = require('path');//引入path模块
function resolve(dir){
    return path.join(__dirname,dir)//path.join(__dirname)设置绝对路径
}
const CompressionPlugin = require('compression-webpack-plugin');


module.exports={
    chainWebpack:(config)=>{
        config.resolve.alias
        .set('@',resolve('./src'))
        //set第一个参数：设置的别名，第二个参数：设置的路径
    },
    configureWebpack: config => {
        //去除console.log
        if (process.env.NODE_ENV === 'production') {
            config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
            return {
                plugins: [new CompressionPlugin({
                    test: /\.js$|\.html$|\.css/,
                    threshold: 10240,
                    deleteOriginalAssets: false
                })]
            }
        }
    },
    productionSourceMap: false
}
