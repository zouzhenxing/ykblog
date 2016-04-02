var dataSource = function(){
	this.pool = mysql.createPool({
	  connectionLimit : 10,
	  host            : 'localhost',
	  user            : 'root',
	  password        : '',
	  database        : 'ykblog',
	  dateStrings     : true,
	  multipleStatements: true
	});
};

dataSource.prototype.getConn = function() {
	var emitter = new events.EventEmitter();
	
	this.pool.getConnection(function( err,conn ){
		if( err ) {
			return emitter.emit("error",err);
		}
		
		emitter.emit("success",conn);
	});
	
	return emitter;
}

module.exports = function(){
	return new dataSource();
};