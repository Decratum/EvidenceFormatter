module.exports = function(grunt, local){
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
	  less: {
	  	dist: {
				files: {
					"assets/css/main.min.css": [
						'assets/less/_*.less'
					]
				},
				options: {
					compress: true
				}
	  	}
	  },
	  uglify: {
	  	dist: {
	  		files: {
	  			"assets/js/main.min.js": [
	  				'assets/js/_*.js'
	  			]
	  		}
	  	}
	  },
	  copy: {
      Less: {
        expand: true,
        cwd: '/Users/Palmer/Sites/Library/less/',
        src: '*',
        dest: 'assets/less/'
      }
    },
	  watch: {
	  	all: {
	  		options: {
	  			livereload: true
	  		},
	  		files: [
	  			'assets/less/*.less',
	  			'assets/js/_*.js'
	  		],
	  		tasks: [
	  			'less',
	  			'uglify'
	  		]
	  		
	  	}
	  }
  });
  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
  grunt.registerTask('default', [
  	'less',
  	'uglify'
  ]);
  grunt.registerTask('dev', ['watch']);
};