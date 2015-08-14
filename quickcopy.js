/**
 * This is for local usage only (not for WebIDE)
 * 
 * Purpose:
 * 
 * - Copies bundles and features folder over to .sapvi/extensions for quicker iterative testing.
 * - No need to continually remove/reinstall your packed/ZIPed release for testing over and over.
 *
 * Prerequisite:
 * 
 * - This requires NodeJS to be installed on developer workstation (not needed for users, etc) 
 * - Eclipse project located under c:\lumira_sdk\lumira (Simply modify path if this is not your case, though)
 * 
 * Usage:
 * 
 * - From your Eclipse project directory at command line, type 'node quickcopy'
 * - Restart Lumira.
 */
var ncp = require('ncp').ncp;
console.log ("Copying bundles and features to " + (process.env.HOME || process.env.USERPROFILE) + '/.sapvi');
ncp('bundles', (process.env.HOME || process.env.USERPROFILE) + '/.sapvi/extensions/bundles');
ncp('features', (process.env.HOME || process.env.USERPROFILE) + '/.sapvi/extensions/features');