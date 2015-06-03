var gulp = require('gulp');
var open = require("gulp-open");
var argv = require('yargs').argv;
var livereload = require('gulp-livereload');

var connect = require('connect');
var serveStatic = require('serve-static');

var src = __dirname + '/src';
var port = process.env.PORT || 8000;

var fileName = argv.part ? 'part' + argv.part : 'index';

console.log(argv.part);

gulp.task('server', function(next) {
  connect()
    .use(serveStatic(src, {'index': [fileName + '.html']}))
    .listen(port, next);
});

gulp.task('watch', ['server'], function() {
  var server = livereload();
  gulp.watch(src + '/**/*').on('change', function(file) {
    server.changed(file.path);
  });
});

gulp.task("url", function(){
  var options = {
    url: "http://localhost:" + port,
    app: "google-chrome"
  };

  gulp.src(src + "/" + fileName + ".html")
    .pipe(open("", options));
});

gulp.task('default',['watch', 'url']);