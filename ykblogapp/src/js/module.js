exports.getNewsType = function( cb ) {
	$.ajax({
		type: "get",
		url : "http://120.27.126.250/API/newtype?cb=?",
		dataType : "jsonp",
		success : cb
	});
}

exports.getNewsByTid = function( tid, cb ) {
	$.ajax({
		type:"post",
		url:"http://120.27.126.250/API/newlist/" + tid + "?cb=?",
		dataType : "json",
		success : cb
	});
}

exports.getNewsByNid = function( nid, cb ) {
	$.ajax({
		type:"post",
		url:"http://120.27.126.250/API/newdetail/" + nid + "?cb=?",
		dataType : "json",
		success : cb
	});
}
