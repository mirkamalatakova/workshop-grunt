# Workshop - Grunt
![Grunt](https://dl.dropboxusercontent.com/u/15053734/grunt-workshop/grunt.png "Grunt")

As a result of this wokshop you will know how to use Grunt task runner to automate your front-end development workflow.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Introduction](#introduction)
- [What you need](#what-you-need)
- [How it works](#how-it-works)
  - [package.json](#packagejson)
  - [Installing Grunt and Grunt plugins](#installing-grunt-and-grunt-plugins)
  - [Gruntfile](#gruntfile)
      - [The "wrapper" function](#the-wrapper-function)
      - [Project and task configuration](#project-and-task-configuration)
      - [Loading Grunt plugins and tasks](#loading-grunt-plugins-and-tasks)
      - [Registering tasks](#registering-tasks)
    - [Task Configuration, Targets and Options](#task-configuration-targets-and-options)
    - [Files](#files)
    - [Globbing patterns](#globbing-patterns)
    - [Templates](#templates)
  - [Running Grunt tasks](#running-grunt-tasks)
- [Let's get the party started!](#lets-get-the-party-started)
  - [Installation & Basic setup](#installation-&-basic-setup)
    - [1. Installing Node.js and updating npm](#1-installing-nodejs-and-updating-npm)
    - [2. Installing Grunt command line interface (CLI)](#2-installing-grunt-command-line-interface-cli)
    - [3. Creating package.json](#3-creating-packagejson)
    - [4. Creating Gruntfile](#4-creating-gruntfile)
    - [5. Installing Grunt and Grunt plugins](#5-installing-grunt-and-grunt-plugins)
  - [Tasks](#tasks)
    - [1. Compile LESS files to CSS](#1-compile-less-files-to-css)
    - [2. Create sprite image](#2-create-sprite-image)
    - [3. Minify CSS](#3-minify-css)
    - [4. Lint JavaScript using JSHint](#4-lint-javascript-using-jshint)
    - [5. Concat JavaScript](#5-concat-javascript)
    - [6. Minify JavaScript](#6-minify-javascript)
    - [7. Minify images](#7-minify-images)
    - [8. Copy fonts](#8-copy-fonts)
    - [9. Run predefined tasks whenever files are changed](#9-run-predefined-tasks-whenever-files-are-changed)
    - [10. Automatically refresh browser when files are changed](#10-automatically-refresh-browser-when-files-are-changed)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Introduction
* Grunt - the JavaScript **task runner**
* Great for **automation** and for improving your front-end development workflow
* You have to do less work when performing repetitive tasks like minification, compilation, unit testing, linting, etc
* Grunt and Grunt plugins - installed and managed via **npm** (the Node.js package manager)

## What you need
* Node.js: [https://nodejs.org/](https://nodejs.org/)
* npm: [https://www.npmjs.com/](https://www.npmjs.com/)
* Grunt command line interface (CLI): [https://www.npmjs.com/package/grunt-cli](https://www.npmjs.com/package/grunt-cli)
* Grunt: [http://gruntjs.com/](http://gruntjs.com/)
* Grunt Plugins: [http://gruntjs.com/plugins](http://gruntjs.com/plugins)
* enthusiasm :stuck_out_tongue_winking_eye:

## How it works

A typical setup will involve adding two files to your project: `package.json` and the `Gruntfile`

### package.json
This file is used by [npm](https://npmjs.org/) to store metadata for projects published as npm modules. It is also responsible for managing dependencies. The [devDependencies](https://docs.npmjs.com/files/package.json#devdependencies) property defines the different packages that are needed for your application.

Sample `package.json`:
```javascript
{
  "name": "my-project-name",
  "version": "0.1.0",
  "devDependencies": {
    "grunt": "~0.4.5",
    "grunt-contrib-jshint": "~0.10.0",
    "grunt-contrib-nodeunit": "~0.4.1",
    "grunt-contrib-uglify": "~0.5.0"
  }
}
```

### Installing Grunt and Grunt plugins
Grunt and Grunt plugins are installed with the command `npm install <module> --save-dev`. Not only will this install `<module>` locally, but it will automatically be added to the `devDependencies` section in `package.json` file, using a [tilde version range](https://docs.npmjs.com/misc/semver#advanced-range-syntax).

For example, this will install the latest version of Grunt in your project folder, adding it to your `devDependencies`:

`npm install grunt --save-dev`

The same can be done for Grunt Plugins and other node modules. As seen in the following example installing the JSHint task module:

`npm install grunt-contrib-jshint --save-dev`

### Gruntfile
The `Gruntfile.js` (or `Gruntfile.coffee`) is a valid JavaScript (or CoffeeScript) file that belongs in the root directory of your project, next to the `package.json` file. It is used to configure or define tasks and load Grunt plugins.

Gruntfile is comprised of the following parts:
* The "wrapper" function
* Project and task configuration
* Loading Grunt plugins and tasks
* Registering tasks

Sample `Gruntfile`:
```javascript
module.exports = function(grunt) {

  // Project configuration
  grunt.initConfig({
    uglify: {
      build: {
        src: 'src/main.js',
        dest: 'build/main.min.js'
      }
    }
  });

  // Load the Grunt plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Register tasks
  grunt.registerTask('default', ['uglify']);

};
```

##### The "wrapper" function
All of code for your `Gruntfile` must be placed inside this function:
```javascript
module.exports = function(grunt) {
  // Configuration, Tasks and Plugins.
};
```

##### Project and task configuration
This is handled by the `grunt.initConfig` method. This method should be passed an object containing the project configuration as well as any task configurations.
```javascript
grunt.initConfig({
  prop: 'foo',
  task: {...},
  taskTwo: {...}
});
```

##### Loading Grunt plugins and tasks
As long as a plugin has been installed via `npm install` and is specified in `package.json` as a dependency, it may be enabled inside your `Gruntfile` with a simple command:
```javascript
// Load the plugin that provides the "uglify" task.
grunt.loadNpmTasks('grunt-contrib-uglify');
```

##### Registering tasks
You can configure Grunt to run one or more tasks by default by defining a `default` task. In the following example, running `grunt` at the command line without specifying a task will run the `uglify` task. This is functionally the same as explicitly running `grunt uglify` or even `grunt default`. Any number of tasks (with or without arguments) may be specified in the array.
```javascript
// Register default task
grunt.registerTask('default', ['uglify']);
```

We can also specify our custom tasks. In the following example running `grunt build-js` will run all three tasks: `jshint`, `concat` and then `uglify`. We can even use this custom task when registering default task
```javascript
grunt.registerTask('build-js', ['jshint', 'concat', 'uglify']);
grunt.registerTask('default', 'build-js');
```

Also specific targets from task configuration can be used:
```javascript
grunt.registerTask('build-css-dev', ['less:dev', 'sprite']);
```

#### Task Configuration, Targets and Options
When a task is run, Grunt looks for its configuration under a property of the same name. Multi-tasks can have multiple configurations, defined using arbitrarily named "targets." In the example below, the `concat` task has `foo` and `bar` targets, while the `uglify` task only has a `bar` target.

Inside a task configuration, an `options` property may be specified to override built-in defaults. In addition, each target may have an `options` property which is specific to that target. Target-level options will override task-level options. The `options` object is optional and may be omitted if not needed.

```javascript
grunt.initConfig({
  // Custom properties
  myProperty: 'whatever',
  mySrcFiles: ['foo/*.js', 'bar/*.js'],

  // concat task
  concat: {
    options: {
      // Task-level options may go here, overriding task defaults
    },
    foo: {
      // concat task "foo" target options and files go here
      // No options specified; this target will use task-level options
    },
    bar: {
      // concat task "bar" target options and files go here.
      options: {
        // "bar" target options may go here, overriding task-level options
      }
    }
  },

  // uglify task
  uglify: {
    bar: {
      // uglify task "bar" target options and files go here.
    }
  }
});
```

#### Files
There are several ways to define **src-dest** (source-destination) file mappings, offering varying degrees of verbosity and control. Any multi task will understand all the following formats, so choose whichever format best meets your needs.

```javascript
grunt.initConfig({
  jshint: {
    foo: {
      /* Compact Format
       * single src property, no dest key is relevant
       * for read-only tasks like linting JS files
       */
      src: ['src/aa.js', 'src/aaa.js']
    }
  },
  concat: {
    foo: {
      /* Compact Format
       * single src and dest property
       * e.g. when combining files to into one other file
       */
      src: ['src/bb.js', 'src/bbb.js'],
      dest: 'dest/b.js'
    },
    bar: {
      /* Files Object Format
       * supports multiple src-dest mappings per-target
       * the property name is the destination file, and its value is the source file(s)
       */
      files: {
        'dest/b.js': ['src/bb.js', 'src/bbb.js'],
        'dest/b1.js': ['src/bb1.js', 'src/bbb1.js']
      }
    },
    baz: {
      /* Files Array Format
       * supports multiple src-dest file mappings per-target,
       * while also allowing additional properties per mapping
       */
      files: [
        {src: ['src/bb.js', 'src/bbb.js'], dest: 'dest/b/', nonull: true},
        {src: ['src/bb1.js', 'src/bbb1.js'], dest: 'dest/b1/', filter: 'isFile'}
      ] 
    }
  },
  uglify: {
    foo: {
       // Building the files object dynamically
       // Grunt will search for "**/*.js" under "lib/" when the "uglify" task runs
       // and build the appropriate src-dest file mappings then, so you
       // don't need to update the Gruntfile when files are added or removed.
      files: [
        {
          expand: true,     // Enable dynamic expansion.
          cwd: 'lib/',      // Src matches are relative to this path.
          src: ['**/*.js'], // Actual pattern(s) to match.
          dest: 'build/',   // Destination path prefix.
          ext: '.min.js',   // Dest filepaths will have this extension.
          extDot: 'first'   // Extensions in filenames begin after the first dot
        }
      ]
    }
  }
});
```

For more information about configuration check The [Configuring Tasks](http://gruntjs.com/configuring-tasks) guide. It has an in-depth explanation on how to configure tasks, targets, options and files inside the `Gruntfile`, along with an explanation of templates, globbing patterns and importing external data.

#### Globbing patterns
Grunt supports filename expansion (also know as globbing). In a filepath:
* `*` matches any number of characters, but not `/`
* `?` matches a single character, but not `/`
* `**` matches any number of characters, including `/`, as long as it's the only thing in a path part
* `{}` allows for a comma-separated list of "or" expressions
* `!` at the beginning of a pattern will negate the match

All most people need to know is that `foo/*.js` will match all files ending with `.js` in the `foo/` subdirectory, but `foo/**/*.js` will match all files ending with `.js` in the `foo/` directory and _all of its subdirectories_.

#### Templates
Templates specified using `<% %>` delimiters will be automatically expanded when tasks read them from the config. Templates are expanded recursively until no more remain. The entire config object is the context in which properties are resolved. `<%= prop.subprop %>` expand to the value of `prop.subprop` in the config, regardless of type.

```javascript
grunt.initConfig({
  foo: {
    bar: ['foo/*.js', 'bar/*.js']
  },
  baz: 'abcde',

  jshint: {
    sample: {
      options: {
        banner: '/* <%= baz %> */\n',   // '/* abcde */\n'
      },
      src: ['<%= foo.bar %>', 'baz/*.js']  // [['foo/*.js', 'bar/*.js'], 'baz/*.js']
    }
  }
});
```

### Running Grunt tasks
Individual Grunt task can be run with command `grunt taskName:taskTarget`.
Specifying both a task and target like `grunt concat:foo` or `grunt concat:bar` will process just the specified target's configuration, while running `grunt concat` will iterate over all targets, processing each in turn.

## Let's get the party started!

### Installation & Basic setup
Download ZIP package from this page and unpack it.

#### 1. Installing Node.js and updating npm
* Visit [https://nodejs.org/download/](https://nodejs.org/download/) and grab the installer for your operating system
* Test: `node -v`
* Node comes with npm installed, however, npm gets updated more frequently than Node does, so make sure you have the latest version
* `npm install -g npm` - you may need to use sudo or run your command shell as Administrator (for Windows) to do this
* Test: `npm -v`

#### 2. Installing Grunt command line interface (CLI)
* Responsible for locating the grunt library in your project and loading the **Gruntfile.js** configuration
* It will put the `grunt` command in your system path, allowing it to be run from any directory.
* `npm install -g grunt-cli` - you may need to use sudo or run your command shell as Administrator (for Windows) to do this
* The `-g` flag will install `grunt-cli` globally so you will only ever have to run this command once
* Note that installing `grunt-cli` does not install the Grunt task runner!

#### 3. Creating package.json
In the root directory of your project create file `package.json` with this content:
```javascript
{
  "name": "grunt-workshop",
  "version": "0.0.1"
}
```

*Note: the command `npm init` could instead be used to automatically generate a `package.json` file, but doing so adds many properties that we won’t need to use in this tutorial, so creating it manually is a simpler option in this case.*

#### 4. Creating Gruntfile
Create `Gruntfile.js` in the root directory of your project with this content:
```javascript
module.exports = function (grunt) {
  'use strict';
  
  // Project and tasks configuration
  grunt.initConfig({
   // ## Your code here ##
  });

  // Load plugins here
  // ## Your code here ##

  // Register available tasks
  // ## Your code here ##
};
```

#### 5. Installing Grunt and Grunt plugins
For the purpose of this tutorial we will install Grunt and these plugins:
* grunt-contrib-concat
* grunt-contrib-copy
* grunt-contrib-cssmin
* grunt-contrib-imagemin
* grunt-contrib-jshint
* grunt-contrib-less
* grunt-contrib-uglify
* grunt-contrib-watch
* grunt-spritesmith

So go to the root directory of your project and install the latest version of Grunt and all plugins with this single command:

`npm install grunt grunt-contrib-concat grunt-contrib-copy grunt-contrib-cssmin grunt-contrib-imagemin grunt-contrib-jshint grunt-contrib-less grunt-contrib-uglify grunt-contrib-watch grunt-spritesmith --save-dev`

Now check your project directory and you should see a new folder `node-modules` with all of our development dependencies that we just installed. A `devDependencies` property is also added to `package.json`, listing the names and current version numbers of our application’s development dependencies:
```javascript
{
  "name": "grunt-workshop",
  "version": "0.0.1",
  "devDependencies": {
    "grunt": "^0.4.5",
    "grunt-contrib-concat": "^0.5.1",
    "grunt-contrib-copy": "^0.8.0",
    "grunt-contrib-cssmin": "^0.12.3",
    "grunt-contrib-imagemin": "^0.9.4",
    "grunt-contrib-jshint": "^0.11.2",
    "grunt-contrib-less": "^1.0.1",
    "grunt-contrib-uglify": "^0.9.1",
    "grunt-contrib-watch": "^0.6.1",
    "grunt-spritesmith": "^4.7.1"
  }
}
```

### Tasks
1. Open `index.html` in your browser

  <img src="https://dl.dropboxusercontent.com/u/15053734/grunt-workshop/cat.jpeg" width="250" />

  But that's ok, see explanation in the next step :smiley:
2. Check the HTML markup of `index.html`. We are referencing directories and files that don’t exist yet – `dist/css/sprites.css`, `dist/css/main.css`  and `dist/js/main.js`. These directories and files will be created automatically by Grunt once we set it up and run tasks.

#### 1. Compile LESS files to CSS
**Plugin:** [grunt-contrib-less](https://www.npmjs.com/package/grunt-contrib-less)

As the first task we are going to make our page little bit less ugly so Grumpy Cat is happy (not impossible! :smirk:). Check `src/less` directory. There are LESS files we need to compile to CSS.

1. Create a task `less` with some target name that will take files `src/less/base.less` and `src/less/modules/header.less` and will compile them to file `main.css` in the `dist/css` directory. We won't use any special options.
2. Enable plugin `grunt-contrib-less` by adding `grunt.loadNpmTasks('grunt-contrib-less');` inside your `Gruntfile`
3. Your `Gruntfile` should look like this now (when compact form used for files):

  ```javascript
  module.exports = function (grunt) {
    'use strict';

    // Project and tasks configuration
    grunt.initConfig({
      
      // Compile LESS for Grumpy Cat
      less: {
        build: {
          src: ['src/less/base.less', 'src/less/modules/header.less'],
          dest: 'dist/css/main.css'
        }
      }

    });

    // Load plugins here
    grunt.loadNpmTasks('grunt-contrib-less');

    // Register available tasks
    // ## Your code here ##
  };
  ```

4. Run the following command:

  `grunt less`

  New directory `dist/css/` was created and you should see file `main.css` which has content of both LESS files we specified in the task.
5. We have our CSS ready (apart from sprite CSS that we will create in the next task) so check your browser and Grumpy Cat should be happy.
6. Now let's assume we want `base.less` to be always the first one in the created CSS file but then we want all LESS files from `src/less/modules/` folder. With current configuration we would need to manually update `src` property in our task everytime some LESS file was added or deleted.

  Since we don't want to do that manually modify this part `'src/less/modules/header.less'` in `src` property so it will compile **all** LESS files inside `src/less/modules/` directory and its subdirectories.
7. Create some new LESS file in the `src/less/modules/` directory. If you run command `grunt less` now, your `main.css` file should contain all three compiled LESS files.

#### 2. Create sprite image
**Plugin:** [grunt-spritesmith](https://www.npmjs.com/package/grunt-spritesmith)

Check source code of `index.html`. In the header there are tags for 3 social icons, that do not have icons at the moment. In `src/sprites/` directory we already have 2 icons ready, `twitter.png` and `instagram.png`, that we need to add to a sprite image and create some CSS rules. (The third icon will be added later in another task).

1. Create a task `sprite` with some target name that will create the sprite image with name `spritesheet.png` using all PNG images in the directory `src/sprites/` and will save this sprite image in the directory `dist/images/`. CSS file should have name `sprites.css` and should be created in `dist/css/` directory. We can also add some space between icons using padding parameter. Use the following code:
  
  ```javascript
  sprite: {
    all: {
      src: '',     // rule matching source path and all your files
      dest: '',    // destinaton path to your sprite image  
      destCss: '', // destination path to your sprites CSS file,
      padding: 0   // change to some other value if you want some spacing between icons
    }
  }
  ```

2. Enable plugin `grunt-spritesmith` inside your `Gruntfile`
3. Now create a sprite image and CSS using this command: `grunt sprite`
4. Check `dist/images/` directory. You should see a new file `spritesheet.png`.
5. Check `dist/css/` directory. You should see a new file `sprites.css`. Icon classes are named after their original file names, so you will have classes `.icon-instagram` and `.icon-twitter`
5. Refresh your browser, icons are displayed.

#### 3. Minify CSS
**Plugin:** [grunt-contrib-cssmin](https://www.npmjs.com/package/grunt-contrib-cssmin)

In `dist/css/` directory we have CSS files we want to minify.

1. Create a task `cssmin` with some target name that will minify all CSS files in `dist/css/` and create files with extension `.min.css` in the same directory. Exclude files that already have `.min.css` extension. You will need to build the files object dynamically like:
  
  ```javascript
  cssmin: {
    build: {
      files: [
        {
          expand: true,      // Enable dynamic expansion
          cwd: '',           // Path which contains our files we want to minify
          src: ['', ''],     // Actual pattern to match - first value should match all .css files, second value should exclude all .min.css files
          dest: '',          // Add your destination path prefix, in this case it is the same as cwd
          ext: '',           // Dest filepaths will have this extension
        }
      ]
    }
  }
  ```

2. Enable plugin `grunt-contrib-cssmin` inside your `Gruntfile`
3. Now minify our CSS file with the following command `grunt cssmin`
4. Check `dist/css/` directory. You should see new files `main.min.css` and `sprites.min.css`. From now on we can use these minified versions on our site, so open `index.html` and change src of our CSS files to minified versions.
5. Check your browser if everything is ok (if Grumpy Cat is still happy).
6. Register a new task with name `build-css` in your Gruntfile that will run our 3 tasks related to CSS in this order: `less`, `sprite` and `cssmin`:
  
  ```javascript
  grunt.registerTask('name-of-custom-task', ['task1', 'task2', 'task3']);
  ```
7. Now you can use only one command `grunt build-css` that will run all 3 defined tasks.

#### 4. Lint JavaScript using JSHint
**Plugin:** [grunt-contrib-jshint](https://www.npmjs.com/package/grunt-contrib-jshint)

In `src/js/` directory we have few JavaScript files we want to validate with [JSHint](http://www.jshint.com/).

1. Create a task `jshint` with some target name that will validate all JavaScript files in `src/js/`. You can specify any option that [JSHint](http://www.jshint.com/) supports. See the [JSHint documentation](http://jshint.com/docs/options/) for a list of supported options. 

  Options can be set directly in `options` parameter of `jshint` task or you can specify [jshintrc](https://www.npmjs.com/package/grunt-contrib-jshint#jshintrc) in `options` that can be set to `true` or to a specific file with those options for JSHint. For this tutorial we will use just few options directly in `jshint` task:
  
  ```javascript
  jshint: {
    options: {
      browser: true,  // defines globals exposed by modern browsers
      curly: true,    // requires curly braces around blocks in loops and conditionals
      eqeqeq: true,   // prohibits the use of == and != in favor of === and !==
      jquery: true,   // defines globals exposed by the jQuery JavaScript library
      latedef: true,  // prohibits the use of a variable before it was defined (scoping and hoisting)
      strict: true,   // requires all functions to run in ECMAScript 5's strict mode
      undef: true,    // prohibits the use of explicitly undeclared variables
      unused: true,   // warns when you define and never use your variables   
    },
    all: {
      src: ['']  // set as all JS files in 'src/js/'
    }
  }
  ```

  *Note: Many JSHint options have been deprecated and will be removed in the next major release of JSHint. JSHint is limiting its scope to issues of code correctness. If you would like to enforce rules relating to code style, check out [the JSCS project](https://github.com/jscs-dev/node-jscs) and plugin [grunt-jscs](https://www.npmjs.com/package/grunt-jscs) for Grunt.*

2. Enable plugin `grunt-contrib-jshint` inside your `Gruntfile`
3. Lint JavaScript files with the following command: `grunt jshint`
4. Oops! As you can see JSHint detected some errors and potential problems in our code. So read what's wrong and fix these issues.
5. Now run `grunt jshint` again. If you fixed all mentioned issues, it should run without any warning.

#### 5. Concat JavaScript
**Plugin:** [grunt-contrib-concat](https://www.npmjs.com/package/grunt-contrib-concat)

Now when our JavaScript code doesn't have any errors, we can concatenate these files.

1. Create a task `concat` with some target name that will concatenate all JavaScript files in `src/js/` and will create a new file `main.js` in directory `dist/js/`:
  ```javascript
  concat: {
    options: {
      separator: ';' // concatenated files will be joined on this string
    },
    all: {
      src: [''],  // set to all JS files in 'src/js/'
      dest: ''     // destination path with a filename 
    }
  }
  ```

2. Enable plugin `grunt-contrib-concat` inside your `Gruntfile`
3. Run task: `grunt concat`
4. Check directory `dist/js/`. There should be a new file with name `main.js`.
5. Check your browser. JavaScript should be working and you should see a new message on the page.

#### 6. Minify JavaScript
**Plugin:** [grunt-contrib-uglify](https://www.npmjs.com/package/grunt-contrib-uglify)

In `dist/js/` we have concatenated JavaScript files in `main.js`. Now we want to minify this file with UglifyJS.

1. Create a task `uglify` with some target name that will minify `main.js` in `dist/js/` and will create a new file `main.min.js` in the same directory. For `src` property use `<%= ... %>` delimiters that will set `dist` property from the `concat` task:
  ```javascript
  uglify: {
    dist: {
      src: '',   // source path and file from dist property in the concat task, using <%= ... %>
      dest: ''   // destination path and file name
    }
  }
  ```

2. Enable plugin `grunt-contrib-uglify` inside your `Gruntfile`
3. Run task: `grunt uglify`
4. Check directory `dist/js/`. There should be a new minified file with name `main.min.js`. From now on we can use this minified version on our site, so open `index.html` and change src of our JavaScript file from `main.js` to `main.min.js`.
5. Check your browser if everything is ok.
6. Register a new task with name `build-js` in your Gruntfile that will run our 3 tasks related to JavaScript in this order: `jshint`, `concat` and `uglify`:
  
  ```javascript
  grunt.registerTask('name-of-custom-task', ['task1', 'task2', 'task3']);
  ```
7. Now you can use only one command `grunt build-js` that will run all 3 defined tasks.

#### 7. Minify images
**Plugin:** [grunt-contrib-imagemin](https://www.npmjs.com/package/grunt-contrib-imagemin)

In `src/images` we have few images that we want to minify.

1. Create a task `imagemin` with some target that will optimise all images in `src/images` and will save them to `dist/images`. We will build the files object dynamically: 

  ```javascript
  imagemin: {
    all: {                         
      files: [
        {
          expand: true,  // Enable dynamic expansion 
          cwd: '',       // Src matches are relative to this path 
          src: [''],     // Actual patterns to match 
          dest: ''       // Destination path prefix 
        }
      ]
    }
  }
  ```
2. Enable plugin `grunt-contrib-imagemin` inside your `Gruntfile`
3. Run task: `grunt imagemin`.
4. Check directory `dist/images/`. There should be new optimised images.

#### 8. Copy fonts
**Plugin:** [grunt-contrib-copy](https://www.npmjs.com/package/grunt-contrib-copy)

In `src/fonts` we have fonts that we want to copy to the `dist/fonts` directory.

1. Create a task `copy` with target `fonts` that will copy all files from `src/fonts` to the `dist/fonts` directory. No hint provided for this task.
2. Enable plugin `grunt-contrib-copy` inside your `Gruntfile`
3. Run task: `grunt copy`.
4. Check directory `dist/fonts/`. There should be fonts files copied from the source directory.

#### 9. Run predefined tasks whenever files are changed
**Plugin:** [grunt-contrib-watch](https://www.npmjs.com/package/grunt-contrib-watch)

In all previous tasks we had to run `grunt` command manually everytime when we wanted some task to be run. But we can use other great plugin that will run predefined tasks whenever watched file patterns are added, changed or deleted.

1. Create a task `watch` with targets `less`, `css`, `sprite`, `js` and `imagemin` and for each target set up `files` that should be watched and correct `tasks` that should be run. Use `<%= ... %>` where possible to set paths from already defined tasks.
  ```javascript
  watch : {
    less : {
      files : ['path/to/some/file1', ...],
      tasks : ['task1', 'task2', ...]
    },
    sprite : {
      files : ['path/to/some/file2', ...],
      tasks : ['task3', 'task4', ...]
    },
    css : {
      files : ['path/to/some/file3', ...],
      tasks : ['task5', 'task6', ...]
    },
    js : {
      files : ['path/to/some/file4', ...],
      tasks : ['task7', 'task8', ...]
    },
    imagemin : {
      files : ['path/to/some/file5', ...],
      tasks : ['task9', 'task10', ...]
    }
  }
  ```

2. Enable plugin `grunt-contrib-watch` inside your `Gruntfile`
3. Register `watch` task to be a `default` task.
4. Run the default task with this command: `grunt`. You should see `Waiting...`. So we know watch task is waiting for some changes to be made.
5. So let's test it. Check `index.html`. In the header there is already the tag for Facebook icon but we need to add it to the sprite image and CSS. So go to the following URL [https://dl.dropboxusercontent.com/u/15053734/grunt-workshop/facebook.png](https://dl.dropboxusercontent.com/u/15053734/grunt-workshop/facebook.png). Download and save this Facebook icon in the `src/sprites` directory. Related tasks should be run automatically. Check your browser, Facebook icon should be displayed.

  <img src="https://dl.dropboxusercontent.com/u/15053734/grunt-workshop/lemon.png" width="200" />
6. You can also try to change LESS, JavaScript or other files and all defined tasks should be run automatically as you are making your changes.


#### 10. Automatically refresh browser when files are changed
We can also make our browser to automatically refresh when files are changed.

1. Add option `livereload` in `watch` task or for its targets when you want your browser should be refreshed like: 
  
  ```javascript
  watch : {
    options: {
      livereload: true
    },
    target : {
      files: ['...'],
      tasks: ['task1', 'task2', ...],
      options: {
        livereload: true
      }
    }
  }
  ```
2. To enable live reload on your page, add a script tag in `index.html` before the closing `</body>` tag pointing to the `livereload.js` script:
  
  ```javascript
  <script src="http://localhost:35729/livereload.js"></script>
  ```
  *Note: 35729 is default and recommended port. If needed you can also use `livereload: PORT_NUMBER` with yout custom port instead of `livereload: true`.*

3. Now run watch task again and try to change some files, e.g. some color in LESS files.
4. Tasks should be run automatically and your browser should be refreshed as well.

*Note: Instead of adding script tag we can also use the browser extensions. See [http://livereload.com/extensions/](http://livereload.com/extensions/)*


<img src="https://dl.dropboxusercontent.com/u/15053734/grunt-workshop/thats-all-folks.jpg" width="400" />










