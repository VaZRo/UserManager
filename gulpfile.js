const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const babel = require('gulp-babel');
const uglifyJs = require('gulp-uglify');

const paths = {
    styles: {
        src: 'src/public/scss/**/*.scss',
        dest: 'dist/public/css/'
    },
    scripts: {
        src: 'src/public/scripts/**/*.js',
        dest: 'dist/public/js/'
    },
    views: {
        src: 'src/views/**/*.ejs',
        dest: 'dist/views/'
    },
    public: {
        src: 'src/public/images/**/*',
        dest: 'dist/public/images/'
    }
}

const stylesToCss = () => {
    return gulp.src(paths.styles.src)
        .pipe(sass())
        .pipe(gulp.dest(paths.styles.dest));
}

const scriptsUglify = () => {
    return gulp.src(paths.scripts.src)
        .pipe(babel({ presets: ["@babel/preset-env"] }))
        .pipe(uglifyJs())
        .pipe(gulp.dest(paths.scripts.dest))
}

const viewsTransform = () => {
    return gulp.src(paths.views.src)
        .pipe(gulp.dest(paths.views.dest));
}

const publicTransform = () => {
    return gulp.src(paths.public.src)
        .pipe(gulp.dest(paths.public.dest));
}

const watchStyles = () => {
    return gulp.watch(paths.styles.src, (cb) => {
        stylesToCss();
        cb();
    });
}

const watchScripts = () => {
    return gulp.watch(paths.scripts.src, (cb) => {
        scriptsUglify();
        cb();
    })
}

const watchViews = () => {
    return gulp.watch(paths.views.src, (cb) => {
        viewsTransform();
        cb();
    })
}

const watchPublic = () => {
    return gulp.watch(paths.public.src, (cb) => {
        publicTransform();
        cb();
    })
}

exports.default = gulp.parallel(watchStyles, watchScripts, watchViews, watchPublic);
