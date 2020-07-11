const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');

module.exports = {
	watch: true,
	entry: './lib/index.js',
	target: 'web',
	output: {
		path: __dirname,
		filename: './index.js',
		libraryTarget: 'assign',
		library: 'module.exports'
	},

	mode: 'production',

	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				extractComments: false,
				terserOptions: {
					compress: {
						ecma: 2017,
						negate_iife: false,
						unsafe: true,
						unsafe_arrows: true,
						arrows: true,
					},

					output: {
						ecma: 2017,
						comments: false
					}
				}
			})
		]
	},

	externals: [{
			'fc-premium-core': 'fcpremium',
		},

		function (context, request, callback) {
			const exp = /^@fc-lib\/(.*)$/.exec(request);

			if (exp !== null && exp[1].length !== 0)
				return callback(null, `fcpremium.Core.libraries.import('${exp[1]}')`);

			callback();
		}
	],

	module: {
		rules: [{
			test: /\.(txt|css)$/,
			use: [{
				loader: 'raw-loader',
			}]
		}]
	},

	resolve: {
		alias: {
			'@assets': path.resolve(__dirname, 'assets/')
		}
	}

};
