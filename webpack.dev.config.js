const path = require("path");

module.exports = {
    entry: {
      dev: ["./app.js"]
    },
    output: {
      filename: "test.bundle.js",
      path: path.resolve(__dirname, "tests"),
      // publicPath: "/tests/",      
    },
    module: {
      rules: [
        {
          test: /\.js?$/,
          use: 'babel-loader',
          exclude: /node_modules/
        }
      ]
    },
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
      proxy: {
        '/api': {
          target: 'http://localhost:3400',
          pathRewrite: {'^/api' : ''}
        }
      },
      publicPath: "/assets/",
      historyApiFallback: true
    }
}