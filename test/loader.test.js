var assert = require('assert');
var loadConfig = require('../index');

describe('Grunt config loader', function() {
    describe('loadConfig', function() {
        it('should load and merge all files', function(done) {
            console.log()
            var output = loadConfig(__dirname + '/fixtures/');
            assert(output);
            done();
        });
    });
});