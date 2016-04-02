var fs = require("fs");

//加载配置函数
exports.loadConfig = function( configName ){
	var path = rootPath + "/config/" + configName + ".json";
	var data = fs.readFileSync(path);
	return JSON.parse(data);
}

//检测当前用户是否登录
exports.checkLogin = function( req,res,next ){
	if( !req.session.admin ) {
		return res.redirect("/login.html");
	}
	
	next();
}

//创建一个分页中间件
exports.creagePage = function( req,res,next ) {
	var page = {
		"pageCount" : 2,
		"curPage" : 1,
		"totalPage" : 0,
		"data" : {},
		"getStart" : function() {
			return (this.curPage - 1) * this.pageCount;
		}
	};
	
	page.curPage = req.body.curPage ? req.body.curPage : 1;
	req.page = page;
	
	next();
}
