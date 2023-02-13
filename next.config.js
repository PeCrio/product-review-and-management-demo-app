const path = require("path");
require("dotenv").config();

module.exports = {
	env: {
		API_URL: process.env.API_URL,
		MONGODB_URI: process.env.MONGODB_URI,
		MONGODB_DB: process.env.MONGODB_DB,
		AZURE_OPENAI_API_KEY : process.env.AZURE_OPENAI_API_KEY,
		AZURE_OPENAI_API_URL : process.env.AZURE_OPENAI_API_URL,
		AZURE_OPENAI_DEPLOYMENT_NAME : process.env.AZURE_OPENAI_DEPLOYMENT_NAME,
	},

	webpack: (config) => {
		config.resolve.alias["src/components"] = path.join(__dirname, "components");
		config.resolve.alias["src/utils"] = path.join(__dirname, "utils");
		config.resolve.alias["public"] = path.join(__dirname, "public");

		return config;
	},
};
