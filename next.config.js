const path = require('path');

module.exports = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'dummyimage.com',
			},
			{
				protocol: 'https',
				hostname: 'image.tmdb.org',
			},
			{
				protocol: 'https',
				hostname: 'gravatar.com',
			},
		],
	},

	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')],
	},
};
