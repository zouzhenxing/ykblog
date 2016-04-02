var express = require("express");
module.exports = router = express.Router();

router.post("/",function( req,res,next ){
	adminModule.login( req.body.uname,req.body.pwd )
	.on("success",function( results, fields ){
		if( results.length == 0 ) {
			res.json(info.error.loginerror);
		} else {
			req.session.admin = results[0];
			res.json(info.message.success);
		}
	}).on("error",function( error ) {
		return next(error);
	});
})

router.post("/loginout",function( req,res,next ){
	delete req.session.admin;
	res.json(info.message.success);
})