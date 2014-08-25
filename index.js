'use strict';

var glob = require('glob');

/**
 * Loads all files from specified directory
 * and stores contents as keys of the passed
 * in object. Is used to construct a config
 * object from multiple files.
 *
 * @param  {String} path Path to dir containing task option
 *                       files
 * @return {Object}      Object containing merged files.
 */
module.exports = function loadConfig(path) {
 	var object = {},
    	key;

  	glob.sync('*', {cwd: path}).forEach(function(option) {
    	key = option.replace(/\.js$/,'');
    	object[key] = require(path + option);
  	});

  	return object;
};