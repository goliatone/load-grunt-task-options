'use strict';

var glob = require('glob'),
	path = require('path');

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
module.exports = function loadConfig(target) {
 	var object = {},
 		filepath,
    	key;

    target = _sanitize(target);

  	glob.sync('*', {cwd: target}).forEach(function(option) {
    	key = option.replace(/\.js$/,'');
    	filepath = path.join(target, option);
    	object[key] = require(filepath);
  	});

  	return object;
};

function _sanitize(src){
	if(!src) throw new Error('')
	var cwd = process.cwd();
	src = path.normalize(src);
	src = path.resolve(cwd, src);

	return src;
}