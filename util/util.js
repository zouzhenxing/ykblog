var fs = require("fs");
var path = require("path");

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

exports.upfile = function( req,res,next ) {
	var urls = [];
	//将文件拷贝到public/upfile
	req.files.forEach( function( file,i ) {
		var extname = path.extname( file.originalname );
		var frpath = global.rootPath + "/" + file.path;
		var url = "/upfile/" + new Date().getTime() + extname;
		var fopath = global.rootPath + "/public" + url;
		urls.push( url );
		
		var fr = fs.createReadStream(frpath);
		var fo = fs.createWriteStream(fopath);
		fr.pipe(fo);
		
		//删除拷贝的文件
		fs.unlink(frpath,function( err ){
			if( err ) {
				return next(err);
			}
		});
		
		if( i == req.files.length - 1 ) {
			//返回一段js代码
			res.render("admin/upfileresult.html",{urls:urls});
		}
	});
}