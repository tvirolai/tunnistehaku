module.exports = {
  entry: './src/app.js',
  output: {
    filename: './build/query.js'
  },
  watch: true,
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: { presets: [ 'es2015', 'react' ] }
      }
    ]
  }
};
