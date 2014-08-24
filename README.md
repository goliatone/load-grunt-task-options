# Load Grunt Task Options

Loads structured grunt tasks option files.

## Structuring Grunt tasks

Using a build system to automate repetitive tasks can simplify a developer's work-flow. If you are using Grunt, then you might be aware that a `Gruntfile` grows wildly really fast, making it hard to maintain.

The following is an example of a simple Grunt setup. 

There is a generic `Gruntfile` that loads all grunt tasks declared as dependencies in the `package.json` file.
Next, it will load custom tasks located under the **tasks** directory. 
Each custom task should be in a separated JavaScript file. As a convention the filename should match the task name declared within.
Next, all task configuration options should be placed in their own JavaScript file inside the **tasks/options** directory.

The structure project should look something like this:

```
.
├── Gruntfile.js
├── app
├── package.json
├── tasks
│   ├── build.js
│   ├── dist.js
│   ├── options
│   │   ├── copy.js
│   │   ├── ...
│   │   ├── gconfig.js
│   │   └── usemin.js
│   └── test.js
└── tests
```

**Gruntfile.js**

```javascript
module.exports = function (grunt) {
  'use strict';  
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Time how long tasks take.
  require('time-grunt')(grunt);

  /*
   * Default values.
   */
  var config = {
    app: 'app',
    dist: 'dist',
    test: 'tests'
  };
  
  var options = {};
  options.config = config;

  /*
   * Load configuration files.
   * Each file will be mapped to a property
   * in options object.
   */
  var loadConfigs = require('load-grunt-task-options');

  /**
   * Extend the default options object with
   * the loaded task options. 
   */
  grunt.util._.extend(options, loadConfigs('./tasks/options/'));  
  
  /**
   * We have a tasks directory with all
   * our custom tasks.
   */
  grunt.loadTasks('tasks');

  /**
   * Finally, run grunt with 
   * loaded options.
   */
  grunt.initConfig(options);
};
```


**tasks/build.js**

```javascript
/**
 * Serve grunt task
 * @param  {Object} grunt Grunt instance
 */
module.exports = function(grunt) {
  /**
   * Define `build` task alias:
   */
  grunt.registerTask('build', [
    'clean:dist',
    'gconfig:dist',
    'version',
    'copy:build',
    'copy:gconf'
  ]);
};
```

**tasks/options/cssmin.js**

```javascript
module.exports = {
  dist: {
    files: {
      '<%= config.dist %>/css/main.css': [
        '.tmp/css/{,*/}*.css',
        '<%= config.app %>/css/{,*/}*.css'
      ]
    }
  }
};
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## License
Copyright (c) 2014 goliatone  
Licensed under the MIT license.
