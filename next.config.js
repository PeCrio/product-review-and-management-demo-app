const path = require("path");
require("dotenv").config();

module.exports = {
	env: {
		API_URL: process.env.API_URL,
		MONGODB_URI: process.env.MONGODB_URI,
		MONGODB_DB: process.env.MONGODB_DB,
	},

	webpack: (config) => {
		config.resolve.alias["src/components"] = path.join(__dirname, "components");
		config.resolve.alias["src/utils"] = path.join(__dirname, "utils");
		config.resolve.alias["public"] = path.join(__dirname, "public");

		return config;
	},
	experimental: {
		outputStandalone: true,
	},
	webpackDevMiddleware: (config) => {
		config.watchOptions = {
			poll: 1000,
			aggregateTimeout: 300,
		};
		return config;
	},
};
