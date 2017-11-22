var gulp = require('gulp');
var scp = require('gulp-scp');
var gutil = require('gulp-util');
var rsync = require("rsyncwrapper");

gulp.task('default', function() {
  // place code for your default task here
});


// --------------------------------------------------------------------------------
// Actualizar en produccion
// --------------------------------------------------------------------------------
gulp.task('pro', ['upload-plataformas'], function() {
  console.log('Actualizado el entorno de producción!');
});


// --------------------------------------------------------------------------------
// Subir ficheros a produccion
// --------------------------------------------------------------------------------
gulp.task('upload-plataformas', function() {
  rsync({
    ssh: true,
    src: '/Users/Carlos/Workspace/Varios/ccb',
    dest: 'root@172.26.6.50:/var/www/html/plataformas/',
    recursive: true,
    syncDest: true,
    args: ['--verbose']
  }, function(error, stdout, stderr, cmd) {
      gutil.log(stdout);
  });
});

