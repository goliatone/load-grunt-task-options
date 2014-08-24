'use strict';

module.exports = function(grunt) {
    grunt.initConfig({
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec'
                },
                src: ['test/**/*.js']
            }
        }
    });

    grunt.loadNpmTasks('grunt-mocha-test');

    grunt.registerTask('test', 'mochaTest');

    if (process.env.TEST_CMD) {
        grunt.registerTask('travis', process.env.TEST_CMD);
    }

    // By default, lint and run all tests.
    grunt.registerTask('default', ['test']);

};
