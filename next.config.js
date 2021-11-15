module.exports = {
  rules: [{
    test: /\.css$/,
    use: ['style-loader', 'css-loader'],
  },
  {
    test: /\.jsx?$/,
    use: ['babel-loader', 'astroturf/loader'],
  }],
  trailingSlash: true,
  reactStrictMode: true,
};
