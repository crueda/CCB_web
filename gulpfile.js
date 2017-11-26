var gulp = require('gulp');
var scp = require('gulp-scp');
var gutil = require('gulp-util');
var rsync = require("rsyncwrapper");
var ftp = require( 'vinyl-ftp' );

//https://loige.co/gulp-and-ftp-update-a-website-on-the-fly/
/** Configuration **/
var user = process.env.FTP_USER;  
var password = process.env.FTP_PWD;  
var host = 'your hostname or ip address';  
var port = 21;  
var localFilesGlob = ['./**/*'];  
var remoteFolder = '/myApp'


gulp.task('default', function() {
  // place code for your default task here
});


// helper function to build an FTP connection based on our configuration
function getFtpConnection() {  
    return ftp.create({
        host: host,
        port: port,
        user: user,
        password: password,
        parallel: 5,
        log: gutil.log
    });
}

// --------------------------------------------------------------------------------
// Actualizar en demos
// --------------------------------------------------------------------------------
gulp.task('demos', ['upload-plataformas'], function() {
  console.log('Actualizado el entorno de demos!');
});

// --------------------------------------------------------------------------------
// Actualizar en produccion
// --------------------------------------------------------------------------------
gulp.task('pro', ['upload-1and1'], function() {
  console.log('Actualizado el entorno de producción!');
});

// --------------------------------------------------------------------------------
// Subir ficheros a demos
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

// --------------------------------------------------------------------------------
// Subir ficheros a produccion
// --------------------------------------------------------------------------------
gulp.task('upload-1and1', function() {
  var conn = getFtpConnection();

    return gulp.src(localFilesGlob, { base: '.', buffer: false })
        .pipe( conn.newer( remoteFolder ) ) // only upload newer files 
        .pipe( conn.dest( remoteFolder ) )
    ;
});

