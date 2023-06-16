const path = require('path');

module.exports = {
	images: {
		domains: ['gravatar.com', 'dummyimage.com'],
	},
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')],
	},
};
