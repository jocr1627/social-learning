module.exports = {
  entry: './src/index.js',
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loader: 'babel-loader',
        test: /\.js?$/,
      }
    ]
  },
  output: {
    filename: 'dist/bundle.js',
  }
};
