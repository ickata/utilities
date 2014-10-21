module.exports = function ( grunt ) {
   // load NPM tasks
   [
      'grunt-contrib-jasmine'
   ].forEach( this.loadNpmTasks.bind( grunt ) );
   // init configuration
   grunt.initConfig({
      jasmine  : {
         shell    : {
            options  : {
               specs    : ['Specs/**/*.js']
            },
            src      : ['Source/**/*.js']
         }
      }
   });
};