// This requires Node JS to use.
// Usage via Command Line: node bundle
// Restart Lumira.
var ncp = require('ncp').ncp;
console.log ("Copying bundles and features to " + (process.env.HOME || process.env.USERPROFILE) + '/.sapvi');
ncp('/lumira_sdk/lumira/bundles', (process.env.HOME || process.env.USERPROFILE) + '/.sapvi/extensions/bundles');
ncp('/lumira_sdk/lumira/features', (process.env.HOME || process.env.USERPROFILE) + '/.sapvi/extensions/features');