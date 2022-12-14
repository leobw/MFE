const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const PORT = 8082;

const devConfig = {
	mode: 'development',
	devtool: 'inline-source-map',
	output: {
		publicPath: `http://localhost:${PORT}/`
	},
	devServer: {
		port: PORT,
		historyApiFallback: {
			index: '/index.html'
		}
	},
	plugins: [
		new ModuleFederationPlugin({
			name: 'auth',
			filename: 'remoteEntry.js',
			exposes: {
				'./AuthApp': './src/bootstrap'
			},
			shared: packageJson.dependencies
		})
	]
};

module.exports = merge(commonConfig, devConfig);