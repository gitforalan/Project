const path = require('path')
const glob = require('glob')
//const webpack = require('webpack')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
module.exports = {
    webpack: (config, { dev }) => {
        console.log(dev)
        config.module.rules.push(
            {
                test: /\.(css|scss)/,
                loader: 'emit-file-loader',
                options: {
                    name: 'dist/[path][name].[ext]'
                }
            }, {
                test: /\.css$/,
                use: ['babel-loader', 'raw-loader', 'postcss-loader']
            }, {
                test: /\.s(a|c)ss$/,
                use: ['babel-loader', 'raw-loader', 'postcss-loader',
                    { loader: 'sass-loader',
                        options: {
                            includePaths: ['styles', 'node_modules']
                            .map((d) => path.join(__dirname, d))
                            .map((g) => glob.sync(g))
                            .reduce((a, c) => a.concat(c), [])
                        }
                    }
                ]
            }
        )
        // config.plugins.push(new FriendlyErrorsWebpackPlugin({ clearConsole: true }))
        //config.plugins = config.plugins.filter((plugin) => plugin.constructor.name !== 'FriendlyErrorsWebpackPlugin')
        // if (dev) {
        //   config.plugins.push(new FriendlyErrorsWebpackPlugin({ clearConsole: false }))
        // }else{
        //   config.plugins.push(new FriendlyErrorsWebpackPlugin({ clearConsole: true }))
        // }
        // config.plugins.push(
        //     new webpack.DefinePlugin({
        //         'SERVICE_URL': JSON.stringify('http://kongstagingrb88.rb88.biz/')
        //     })
        // )
        return config
    },
    exportPathMap: function(defaultPathMap) {
        return {
          '/': {page: '/' },
          '/IMsports': {page: '/IMsports' },
          '/index':{page:'/index'},
          '/Live':{page:'/Live'},
          '/Promotions':{page:'/Promotions'},
          '/Slot':{page:'/Slot'},
          '/Sports':{page:'/Sports'},
          '/Team':{page:'/Team'},
          '/Download':{page:'/Download'},
          '/Help':{page:'/Help'},
          '/About':{page:'/About'},
          '/_error':{page:'/_error'},
          '/emailverification':{page:'/emailverification'}
        }
    },
    distDir: 'build'
}