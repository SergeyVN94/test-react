const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const AutoprefixerPlugin = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const find = require('find');

const isProduction = process.env.NODE_ENV === 'production';
const mode = isProduction ? 'production' : 'development';
const devtool = isProduction ? 'nosources-source-map' : 'inline-source-map';
const context = `${__dirname}/src`;
const dist = `${__dirname}/dist`;

const pages = find
  .fileSync(/\.(pug|ts|sass)$/, `${context}/pages`)
  .map((name) => name.slice(name.lastIndexOf('/') + 1, name.lastIndexOf('.')))
  .filter((page, index, arr) => arr.indexOf(page) === index);

const entry = {};
pages.forEach((page) => (entry[page] = `${context}/pages/${page}/${page}`));

const getFileName = (extension) => `[name].[${isProduction ? 'content' : ''}hash]${extension}`;

const getOptimization = () => {
  const config = {
    splitChunks: { chunks: 'all' },
  };

  if (isProduction) {
    config.minimizer = [new TerserPlugin({
      terserOptions: {},
      cache: true,
      parallel: true,
    })];
  }

  return config;
};

const rules = [
  {
    test: /\.pug$/,
    loader: 'pug-loader',
    options: { root: `${context}/components` },
  },
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
  entry,
  output: {
    path: dist,
    filename: getFileName('.js'),
  },
  module: { rules },
  optimization: getOptimization(),
  plugins: [
    ...pages.map((page) => (
      new HTMLWebpackPlugin({
        template: `./pages/${page}/${page}.pug`,
        filename: `${dist}/${page}.html`,
        minify: isProduction,
      })
    )),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({ filename: getFileName('.css') }),
    AutoprefixerPlugin,
  ],
  devServer: {
    contentBase: dist,
    index: 'list.html',
    compress: true,
    port: 9000,
  },
};

module.exports = config;
