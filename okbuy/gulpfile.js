//gulp 插件

const gulp = require("gulp");  //引入gulp插件

const connect =require("gulp-connect")// connect自动刷新

const concat = require("gulp-concat");// 合并插件

const uglify = require("gulp-uglify");//压缩插件

const babel = require("gulp-babel");//es6的编译；

const sass = require("gulp-sass-china");//sass 插件

//=============开启服务器=======================
gulp.task("connect",()=>{
    connect.server({
        root:"dist/",
        port:8888,
        livereload:true,
        middleware: function (connect, opt) {
            var Proxy = require('gulp-connect-proxy');
            opt.route = '/proxy';
            var proxy = new Proxy(opt);
            return [proxy];
          }
    });
})
// =================复制=====================
gulp.task("html" , ()=>{
    return gulp.src("src/*.html")
    .pipe(gulp.dest("dist/"))
    //数据更新之后，进行页面刷新；
    .pipe(connect.reload());
})
//==============监听==============================
gulp.task("watch",()=>{
    gulp.watch("src/*.html",["html","sass"]);
    gulp.watch("sass/*.scss",["html","sass"]);
})

//==============sass=============================
gulp.task("sass",()=>{
    return gulp.src(["sass/*.scss"])
            .pipe(sass().on("error",sass.logError))
            .pipe(gulp.dest("dist/css"));
})
//==============合并除jquery.js文件除外的所有要求的文件夹下的js====================
gulp.task("scirpt" , ()=>{
    return gulp.src(["module/*.js","libs/*.js","!libs/jquery.js"])
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(concat("bundle.js"))
    .pipe(uglify())
    .pipe(gulp.dest("dist/script"))
})
//============================================
gulp.task("default",["watch","connect"]);