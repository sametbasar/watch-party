const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");
const uglify = require("gulp-uglify");
const sourcemaps = require("gulp-sourcemaps");
const minifyCss = require("gulp-csso");
const rename = require("gulp-rename");
const autoprefixer = require("gulp-autoprefixer");
const babel = require("gulp-babel");

gulp.task("js", function () {
  return gulp
    .src("./assets/js/*.js")
    .pipe(plumber())
    .pipe(babel({ presets: ["@babel/preset-env"] }))
    .pipe(uglify())
    .pipe(rename({ extname: ".min.js" }))
    .pipe(gulp.dest("./assets/js/minify/"));
});

gulp.task("css", () => {
  return gulp
    .src("./assets/scss/*.scss")
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        outputStyle: "compressed",
        precision: 10,
        includePaths: ["."],
      }).on("error", sass.logError),
    )
    .pipe(autoprefixer({ cascade: false }))
    .pipe(minifyCss())
    .pipe(rename({ extname: ".min.css" }))
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("./assets/css"));
});

gulp.task("watch", function () {
  gulp.watch("./assets/scss/*.scss", gulp.parallel("css"));
  gulp.watch("./assets/js/*.js", gulp.parallel("js"));
});

gulp.task("default", gulp.parallel("css", "js"));
