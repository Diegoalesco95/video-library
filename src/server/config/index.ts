import { config } from 'dotenv';
config();

console.log('test');

const config = {
	dev: process.env.ENV !== 'production',
	port: process.env.PORT || 8000,
	// apiUrl: process.env.API_URL,
	// apiKeyToken: process.env.API_KEY_TOKEN,
	// googleClientId: process.env.GOOGLE_CLIENT_ID,
	// googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
	// sessionSecret: process.env.SESSION_SECRET,
	// twitterConsumerKey: process.env.TWITTER_CONSUMER_KEY,
	// twitterConsumerSecret: process.env.TWITTER_CONSUMER_SECRET,
	// facebookClientId: process.env.FACEBOOK_CLIENT_ID,
	// facebookClientSecret: process.env.FACEBOOK_CLIENT_SECRET,
};

console.log(config);

export default { config };
