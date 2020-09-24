const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const AutoprefixerPlugin = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProduction = process.env.NODE_ENV === 'production';
const mode = isProduction ? 'production' : 'development';
const devtool = isProduction ? 'nosources-source-map' : 'inline-source-map';
const context = `${__dirname}/src`;
const dist = `${__dirname}/dist`;

const getFileName = (extension) => `[name].[${isProduction ? 'content' : ''}hash]${extension}`;

const getOptimization = () => {
  return isProduction
    ? {
      minimizer: [new TerserPlugin({
        terserOptions: {},
        cache: true,
        parallel: true,
      })]
    }
    : {};
};

const rules = [
  {
    test: /\.(sa|sc|c)ss$/,
    use: [
      MiniCssExtractPlugin.loader,
      'css-loader',
      'postcss-loader',
      'sass-loader',
    ],
  },
  {
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/,
  },
  {
    test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'file-loader',
    options: {
      name: '[name].[ext]',
      outputPath: './fonts',
    },
  },
];

const resolve = {
  extensions: ['.tsx', '.ts', '.js'],
  alias: {
    '@styles': `${context}/styles`,
    '@components': `${context}/components`,
  },
};

const config = {
  devtool,
  mode,
  context,
  resolve,
  entry: './public/index.tsx',
  output: {
    path: dist,
    filename: getFileName('.js'),
  },
  module: { rules },
  optimization: getOptimization(),
  plugins: [
    new HTMLWebpackPlugin({
      template: './public/index.html',
      filename: `${dist}/index.html`,
      minify: isProduction,
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({ filename: getFileName('.css') }),
    AutoprefixerPlugin,
  ],
  devServer: {
    contentBase: dist,
    index: 'index.html',
    compress: true,
    port: 9000,
  },
};

module.exports = config;
