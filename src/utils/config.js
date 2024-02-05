// GraphQL API URL

/* Defaults */
let graphUrl = 'https://jtchild.com/cms/graphql';
let siteUrl = 'https://jtchild.com/cms/';

// if (
// 	window.location.hostname === 'localhost ' ||
// 	'https://jtchild.com/' ||
// 	'162.241.217.231'
// ) {
// 	graphUrl = 'https://jtchild.com/cms/graphql';
// 	siteUrl = 'https://jtchild.com/cms/';
// }

// // If we're running on localhost then use the local URL
// if (window.location.hostname === 'localhost') {
// 	graphUrl = 'http://jamie-child-cms.local/cms/graphql';
// 	siteUrl = 'http://jamie-child-cms.local/cms/';
// }

const Config = {
	gqlUrl: graphUrl,
	siteUrl: siteUrl.replace(/\/$/, ''), // Always remove any trailing slashes.
};

export default Config;
