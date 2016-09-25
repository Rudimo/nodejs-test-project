module.exports = function (grunt) {

    let site_js = [
        './bower_components/jquery/dist/jquery.js',
        './bower_components/bootstrap/dist/js/bootstrap.js',
        './node_modules/core-js/client/shim.min.js',
        './node_modules/zone.js/dist/zone.js',
        './node_modules/reflect-metadata/Reflect.js',
        './node_modules/systemjs/dist/system.src.js'
    ];

    let site_css = [
        './bower_components/bootstrap/dist/css/bootstrap.css'
    ];

    let site_less = [
        './front/public/stylesheets/style.less'
    ];

    grunt.initConfig({
        
        less: {
            development: {
                options: {
                    paths: ["assets/css"]
                },
                files: {
                    "./front/public/stylesheets/site_build_less.css": site_less
                }
            },
            production: {
                options: {
                    paths: ["assets/css"],
                    cleancss: true
                },
                files: {
                    "./front/public/stylesheets/site_build_less.css": site_less
                }
            }
        },

        uglify: {
            site_build_js: {
                files: {
                    './front/public/javascripts/site_build.js': site_js
                }
            }
        },

        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    './front/public/stylesheets/site_build.css': site_css
                }
            }
        },

        clean: ['./resources/tmp']
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-less');

    grunt.registerTask('default', ['uglify', 'cssmin', 'clean', 'less']);
    grunt.registerTask('js', ['concat:js']);
};
