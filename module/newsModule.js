var newsModule = function(){};

newsModule.prototype.newstypeList = function(){
	var emitter = new events.EventEmitter();
	
	dataSource.getConn().on("success",function( conn ){
		conn.query("select *,(select count(*) from news n where n.typeid = nt.typeid) as newcount from newtype nt order by typeorder",function( err,rows,fields ) {
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

newsModule.prototype.newtypeAdd = function( typename ){
	var emitter = new events.EventEmitter();
	
	dataSource.getConn().on("success",function( conn ){
		conn.query("insert into newtype values(default,?,0,1)",[typename],function( err,rows,fields ) {
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

newsModule.prototype.newsList = function( start,count ){
	var emitter = new events.EventEmitter();
	
	var sqlcount = "select count(*) as count from news n,admin a,newtype nt where n.aid = a.aid and n.typeid = nt.typeid";
	var sqldata = "select n.*,a.aname,nt.typename as tname from news n,admin a,newtype nt where n.aid = a.aid and n.typeid = nt.typeid limit ?,?";
	var sql = sqlcount + ";" + sqldata;
	
	dataSource.getConn().on("success",function( conn ){
		conn.query(sql,[start,count],function( err,rows,fields ) {
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

newsModule.prototype.newsAdd = function( ntitle,aid,ncontnet,typeid ){
	var emitter = new events.EventEmitter();
	
	var sql = "insert into news values(default,?,?,now(),?,?)";
	dataSource.getConn().on("success",function( conn ){
		var query = conn.query(sql,[ntitle,aid,ncontnet,typeid],function( err,rows,fields ) {
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

newsModule.prototype.getNewsByTid = function( tid ){
	var emitter = new events.EventEmitter();
	
	var sql = "select * from news where typeid = ?";
	dataSource.getConn().on("success",function( conn ){
		var query = conn.query(sql,[ tid ],function( err,rows,fields ) {
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

newsModule.prototype.getNewByNid = function( nid ){
	var emitter = new events.EventEmitter();
	
	var sql = "select * from news where nid = ?";
	dataSource.getConn().on("success",function( conn ){
		var query = conn.query(sql,[ nid ],function( err,rows,fields ) {
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
	return new newsModule();
}
