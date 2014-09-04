module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			// options: {
				// banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			// },
			utils: {
				src: 'scripts/jquery/jquery.utils.js',
				dest: 'scripts/jquery/jquery.utils.min.js'
			},
			form: {
				src: 'scripts/jquery/plugin/jquery.form.js',
				dest: 'scripts/jquery/plugin/jquery.form.min.js'
			},
			layer: {
				src: 'scripts/jquery/plugin/jquery.layer.js',
				dest: 'scripts/jquery/plugin/jquery.layer.min.js'
			},
			admin_plugin_package : {
				files : {
					'scripts/jquery/plugin/jquery.admin.ppg.js' : [
						'scripts/jquery/plugin/jquery.navigate.js',
						'scripts/jquery/plugin/jquery.dotdotdot.js',
						'scripts/jquery/plugin/jquery.form.js',
						'scripts/jquery/plugin/jquery.validate.js',
					]
				}
			}
		},
		jsdoc : {
			dist : {
				src : ['scripts/jquery/plugin/jquery.plugin.sample.js'],
				// src : ['scripts/jquery/plugin/jquery.plugin.sample.js', 'scripts/jquery/jquery.utils.js'],
				options : {destination : 'doc'}
			}
		},
		less : {
			development: {
				options: {
					paths: ["assets/css"]
				},
				files: {
					"styles/default.less.css": "styles/default.less"
				}
			}
		}
	});
	
	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-jsdoc');
	grunt.loadNpmTasks('grunt-contrib-less');
	
	// Default task(s).
	grunt.registerTask('default', ['uglify', 'jsdoc']);
	
	grunt.registerTask('doc', ['jsdoc']);
	
	grunt.registerTask('min', ['uglify']);
};