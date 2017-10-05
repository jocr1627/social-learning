module.exports = {
  entry: './src/index.js',
  module: {
    loaders: [
      {
        test: /\.css?$/,
        use: [
          'style-loader',          
          'css-loader',
        ],                 
      },
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
