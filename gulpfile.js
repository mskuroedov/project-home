var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    scss = require('gulp-scss'),
    // cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename');


gulp.task('scss', function () {
    gulp.src(
        "./scss/build.scss"
    ).pipe(scss(

    )).pipe(gulp.dest("./css"));
});


// gulp.task('css-libs', ['scss'], function () {
//     return gulp.src('./css/build.css') // Выбираем файл для минификации
//         .pipe(cssnano()) // Сжимаем
//         .pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
//         .pipe(gulp.dest('./css')); // Выгружаем в папку app/css
// });

gulp.task('browser-sync', function () { // Создаем таск browser-sync
    browserSync({ // Выполняем browserSync
        server: { // Определяем параметры сервера
            baseDir: './' // Директория для сервера - app
        },
        notify: false // Отключаем уведомления
    });
});
gulp.task('watch', ['browser-sync'], function () {
    gulp.watch('./scss/*.scss', ['scss']); // Наблюдение за sass файлами в папке sass
    gulp.watch('./js/*.js', browserSync.reload); // Наблюдение за js файлами в папке js
    gulp.watch('./*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
    gulp.watch('./css/*.css', browserSync.reload); // Наблюдение за CSS файлами в корне проекта
});