const path = require('path')

module.exports = {
	// components: 'src/baseComponents/**/[A-Z]*.js',
	components: 'src/components/**/index.js',
	defaultExample: true,
	webpackConfig: {
		// Hot reloading does not work by default. Probably caused by some caching bug.
		// disable caching -> enables hot reloading
		// https://github.com/styleguidist/react-styleguidist/issues/1188
		cache: false,
		module: {
			rules: [
				{
					test: /\.jsx?$/,
					exclude: /node_modules/,
					loader: 'babel-loader',
				},
				{
					test: /\.css$/,
					loader: 'style-loader!css-loader',
				},
				{
					test: /\.(ttf|eot|woff|svg|jpg|png|gif)$/,
					loader: 'file-loader',
				},
			],
		}
  },
  require: [
    path.join(__dirname, 'public/css/styleguidist/reset.css'),
    path.join(__dirname, 'public/fonts/fonts.css'),
  ]
};
