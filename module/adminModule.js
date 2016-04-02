var adminModule = function() {}

adminModule.prototype.login = function( uname,pwd ) {
	var emitter = new events.EventEmitter();
	
	dataSource.getConn().on("success",function( conn ){
		conn.query("select * from admin where aname = ? and apwd = ?",[uname,pwd],function( err, results, fields ){
			if( err ) {
				return emitter.emit("error",err);
			}
			
			emitter.emit("success",results,fields);
			conn.release(); //归还数据库连接到连接池
		});
	}).on("error",function( err ) {
		emitter.emit("error",err);
	});
	
	return emitter;
}

adminModule.prototype.list = function() {
	var emitter = new events.EventEmitter();
	
	dataSource.getConn().on("success",function( conn ){
		conn.query("select * from admin",function( err,rows,fields ) {
			if( err ) {
				return emitter.emit("error",err);
			}
			
			emitter.emit("success",rows,fields);
			conn.release(); //归还数据库连接到连接池
		});
	}).on("error",function( err ) {
		emitter.emit("error",err);
	});
	
	return emitter;
}

adminModule.prototype.adminAdd = function( uname,pwd ) {
	var emitter = new events.EventEmitter();
	
	dataSource.getConn().on("success",function( conn ){
		conn.query("insert into admin values(default,?,?,1)",[uname,pwd],function( err,rows,fields ) {
			if( err ) {
				return emitter.emit("error",err);
			}
			
			emitter.emit("success",rows,fields);
			conn.release(); //归还数据库连接到连接池
		});
	}).on("error",function( err ) {
		emitter.emit("error",err);
	});
	
	return emitter;
}

adminModule.prototype.checkAdminUser = function( uname ) {
	var emitter = new events.EventEmitter();
	
	dataSource.getConn().on("success",function( conn ){
		conn.query("select * from admin where aname = ?",[uname],function( err,rows,fields ) {
			if( err ) {
				return emitter.emit("error",err);
			}
			
			emitter.emit("success",rows,fields);
			conn.release(); //归还数据库连接到连接池
		});
	}).on("error",function( err ) {
		emitter.emit("error",err);
	});
	
	return emitter;
}

adminModule.prototype.adminDel = function( uid ) {
	var emitter = new events.EventEmitter();
	
	dataSource.getConn().on("success",function( conn ){
		conn.query("delete from admin where aid = ?",[uid],function( err,rows,fields ) {
			if( err ) {
				return emitter.emit("error",err);
			}
			
			emitter.emit("success",rows,fields);
			conn.release(); //归还数据库连接到连接池
		});
	}).on("error",function( err ) {
		emitter.emit("error",err);
	});
	
	return emitter;
}

module.exports = function() {
	return new adminModule();
}
