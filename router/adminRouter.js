var express = require("express");
module.exports = router = express.Router();

router.all("/index",function( req,res,next ) {
	res.render("admin/index.html",{username:req.session.admin.aname});
});

router.post("/list",function( req,res,next ){
	//从数据库中找到所有的用户
	adminModule.list().on("success",function( rows,fields ){
		res.json(rows).end();
	}).on("error",function( err ){
		return next(err);
	});
});

router.post("/adminAdd",function( req,res,next ){
	adminModule.adminAdd( req.body.aname ).on("success",function( result,fields ){
		if( result.insertId ) {
			res.json(info.message.success).end();
		} else {
			res.json(info.error.adminAdderror).end();
		}
	}).on("error",function( err ){
		return next(err);
	});
});

router.post("/checkAdminUser",function( req,res,next ){
	adminModule.checkAdminUser( req.body.aname ).on("success",function( result,fields ){
		if( result.length == 0 ) {
			res.json(info.message.success).end();
		} else {
			res.json(info.error.checkAdminUser).end();
		}
	}).on("error",function( err ){
		return next(err);
	});
});

router.post("/adminDel",function( req,res,next ){
	adminModule.adminDel( req.body.uid ).on("success",function( result,fields ){
		if( result.affectedRows == 1 ) {
			res.json(info.message.success).end();
		} else {
			res.json(info.error.adminDel).end();
		}
	}).on("error",function( err ){
		return next(err);
	});
});