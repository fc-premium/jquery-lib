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
		library: 'module.exports',
		// libraryExport: '',
		// module: true
		// library: '__module__'
	},

	mode: 'production',

	optimization: {
		minimize: false,
		minimizer: [
			new TerserPlugin({
				terserOptions: {
					compress: {
						// module: true,
						ecma: 2017,
						negate_iife: false,
						unsafe: true,
						unsafe_arrows: true,
						arrows: true,

						//
						// top_retain: true,

						// temp
						// sequences: false
					},

					output: {
						ecma: 2017,
						// beautify: true,
						// wrap_iife: true,
						// indent_level: 8
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
