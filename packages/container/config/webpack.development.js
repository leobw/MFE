const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const PORT = 8080;

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
			name: 'container',
			remotes: {
				marketing: 'marketing@http://localhost:8081/remoteEntry.js',
				auth: 'auth@http://localhost:8082/remoteEntry.js',
				dashboard: 'dashboard@http://localhost:8083/remoteEntry.js',
			},
			shared: packageJson.dependencies
		})
	]
};

module.exports = merge(commonConfig, devConfig);