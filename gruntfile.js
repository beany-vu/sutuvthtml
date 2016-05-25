module.exports = function(grunt) {
    grunt.initConfig({
        concat : {
            options: {
                separator: '\n\n//------------------------------------------\n',
                banner: '\n\n//------------------------------------------\n'
            },
            dist : {
                src: ['components/scripts/*.js'],
                dest: 'builds/development/js/script.js'
            }
        }, // concat
        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'builds/development/css/styles.css': 'components/scss/styles.scss' // syntax:  target file: source file
                }
            }
        }, // sass
        postcss: {
            options: {
                map: true,
                processors: [
                    require('autoprefixer')({
                        browsers: ['last 2 versions', 'ie 6-8', 'Firefox > 20', 'Chrome 25']
                    })
                ]
            },
            dist: {
                src: 'builds/development/css/*.css'
            }
        }, // postcss
        connect: {
            sever: {
                options: {
                    hostname: 'localhost',
                    port: 6969,
                    base: 'builds/development/',
                    livereload: true
                }
            }
        }, //connect
        watch: {
            options: {
                spawn: false,
                livereload: true
            },
            scripts: {
                files: ['builds/development/**/*.html',
                    'components/scripts/**/*.js',
                    'components/scss/**/*.scss'],
                tasks: ['concat', 'sass', 'postcss']
            }
        } // watch
    }); //end initConfig

    // load npm tasks
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-connect');

    // task register
    grunt.registerTask('default',['concat','sass', 'connect','watch']);
} // end module.export