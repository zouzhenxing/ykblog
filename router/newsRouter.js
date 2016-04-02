var express = require("express");
module.exports = router = express.Router();

router.post("/newtypeList",function( req,res,next ){
	//从数据库中找到所有的用户
	newsModule.newstypeList().on("success",function( rows,fields ){
		res.json(rows).end();
	}).on("error",function( err ){
		return next(err);
	});
});

router.post("/newtypeAdd",function( req,res,next ){
	//从数据库中找到所有的用户
	newsModule.newtypeAdd( req.body.typename ).on("success",function( rows,fields ){
		if( rows.insertId ) {
			res.json(info.message.success).end();
		} else {
			res.json(info.error.newtypeAddError).end();
		}
	}).on("error",function( err ){
		return next(err);
	});
});

router.post("/newsList",util.creagePage,function( req,res,next ){
	//从数据库中找到所有的用户
	newsModule.newsList( req.page.getStart(),req.page.pageCount ).on("success",function( rows,fields ){
		req.page.data = rows[1];
		req.page.totalPage = Math.ceil(rows[0][0].count / req.page.pageCount);
		
		res.json( req.page ).end();
	}).on("error",function( err ){
		return next(err);
	});
});

router.post("/newsAdd",function( req,res,next ){
	//从数据库中找到所有的用户
	newsModule.newsAdd( req.body.title,req.session.admin.aid,req.body.content,req.body.typeid ).on("success",function( result,fields ){
		if( result.insertId ) {
			res.json( info.message.success ).end();
		} else {
			res.json( info.error.newsAddError ).end();
		}
	}).on("error",function( err ){
		return next(err);
	});
});