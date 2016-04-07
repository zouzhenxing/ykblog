var express = require("express");
module.exports = router = express.Router();

/**
 * 查所有的资讯类型
 */
router.all("/newtype",function( req,res,next ){
	//从数据库中找到所有的用户
	newsModule.newstypeList().on("success",function( rows,fields ){
//		res.json(rows).end();
		res.send( req.query.cb + '(' + JSON.stringify(rows) + ')' ).end();
	}).on("error",function( err ){
		return next(err);
	});
});

/**
 * 根据新闻类型查列表
 */
router.all("/newlist/:tid",function( req,res,next ) {
	//从数据库中找到所有的用户
	newsModule.getNewsByTid( req.params.tid ).on("success",function( rows,fields ){
//		res.json(rows).end();
		res.send( req.query.cb + '(' + JSON.stringify(rows) + ')' ).end();
	}).on("error",function( err ){
		return next(err);
	});
});

/**
 * 根据新闻编号查新闻
 */
router.all("/newdetail/:nid",function( req,res,next ) {
	//从数据库中找到所有的用户
	newsModule.getNewByNid( req.params.nid ).on("success",function( rows,fields ){
//		res.json(rows).end();
		res.send( req.query.cb + '(' + JSON.stringify(rows) + ')' ).end();
	}).on("error",function( err ){
		return next(err);
	});
})
