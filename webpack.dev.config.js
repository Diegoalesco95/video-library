const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: [
    path.resolve(__dirname, 'src/frontend/index.js'),
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000&reload=true',
  ],
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'Platzi-video/js/app.js',
    publicPath: 'http://localhost:3001/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /\.(s*)css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|gif|jpg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'Platzi-video/assets/[hash].[ext]',
            },
          },
        ],
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, 'dist'),
    open: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: 'Platzi-video/css/app.css',
    }),
  ],
};
