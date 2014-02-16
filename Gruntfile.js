module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		markdown: {
			all: {
				files: [{
						expand: true,
						src: 'pages/**/*.md',
						dest: '.',
						ext: '.html'
					}
				],
				options: {
					template: 'pages/page.tpl',
					markdownOptions: {
						gfm: true
					}
				}
			}
		}
	});
	grunt.loadNpmTasks('grunt-markdown');
	grunt.registerTask('default', ['markdown']);
};