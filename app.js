//引入第三方模块
var express = require("express");
var log4js = require('log4js');
var bodyParser = require("body-parser");
var session = require("express-session");
var mysql = require("mysql");
var path = require('path');
var events = require("events");
//将模块放到全局
global.log = log4js.getLogger("logInfo");
global.mysql = mysql;
global.events = events;
global.rootPath = __dirname;

//引入自定义模块
var util = require("./util/util.js");
global.util = util;
global.info = util.loadConfig("info");//配置信息
global.dataSource = require("./module/dataSource.js")();
global.adminModule = require("./module/adminModule.js")();
global.newsModule = require("./module/newsModule.js")();

//加载日志
log4js.configure("config/log4j.json");

//服务器设置
var app = express();
//设置express的模板引擎
var ejs = require('ejs');
ejs.delimiter = "$";
app.set("views",path.join(__dirname,'views'));
app.set('view engine', 'html');
app.engine('.html', ejs.__express);

//配置post请求
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//使用session中间件
app.use(session({
	secret:"!@#$",
	resave : true,
	saveUninitialized : false,
	rolling : true,
	cookie:{ "maxAge":1000 * 60 * 10 }
}));

app.use("/login",require("./router/loginRouter.js"));
app.use("/admin",util.checkLogin); //使用中间件过滤所有admin下的请求，只有登录后才可以进入
app.use("/admin/admin",require("./router/adminRouter.js"));
app.use("/admin/news",require("./router/newsRouter.js"));
app.use("/API",require("./router/apiRouter.js"));

//设置静态目录
app.use(express.static('public'));
//设置404错误
app.use(function(req, res, next) {
	if( req.xhr ) {
		res.status(404).end();
	} else {
		res.status(404).redirect("/404.html");
	}
});

//设置500错误
app.use(function(err, req, res, next) {
	console.error(err.stack);
	log.error(err.stack);
	
	if( req.xhr ) {
		res.status(500).end();
	} else {
		res.status(500).redirect("/500.html");
	}
	
});

//设置错误守护
process.on("uncaughtException",function( err ){
	log.error(err.stack);
	console.error(err.stack);
});

//开启服务器
var server = app.listen(80, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('服务器开启成功 http://%s:%s', host, port);
});
