'use strict';

var glob = require('glob'),
    extend = require('extend'),
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
var loader = module.exports = function(target, options) {

    var parent = sanitize(target, '/../');

    var defaults = findTasks(parent);

    var object = findTasks(target);

    options = extend(true, defaults, options, object);

    return options;
};

function findTasks(target) {
    var object = {},
        filepath,
        key;
    target = sanitize(target);

    glob.sync('*', {
        cwd: target
    }).forEach(function(option) {
        key = option.replace(/\.js$/, '');
        filepath = path.join(target, option);
        object[key] = require(filepath);
    });

    return object;
}

function sanitize(src, append) {
    if (!src) throw new Error('Invalid path');
    var cwd = process.cwd() + (append || '');
    src = path.normalize(src);
    src = path.resolve(cwd, src);

    return src;
}

loader.loadNpmTasks = function(grunt) {
    var target = path.resolve(process.cwd() + '/../', 'package.json');
    require('matchdep').filterDev('grunt-*', target).forEach(grunt.loadNpmTasks);
};