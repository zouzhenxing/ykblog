(function(){//扩展基于jquery的验证插件
	$.validate = {};
	//非空返回true,空返回false
	$.validate.isEmpty = function( str ) {
		var reg = /\S+/;	
		return reg.test(str);
	}
	//符合为true,不符合为false
	$.validate.isEmail = function( str ) {
		var reg = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
		return reg.test(str);
	}
	
	$.fn.alert = function( type,msg,delay ){
		var classtype = "alert-info";
		var title = "成功";
		if( type == "warning" ) {
			classtype = "alert-warning";
			title = "警告";
		} else if( type == "error" ) {
			classtype = "alert-danger";
			title = "错误";
		}
		
		var html = '<div class="alert ' + classtype + ' fade in"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button><strong>' + title + '：</strong> ' + msg + '</div>';
		$(this).prepend(html).find(".alert").delay(1000 * delay).fadeOut(function(){
			$(this).remove();
		});
	}
	
	$.modal = function( title,message ) {
		$("#modalInfo #modalInfoTitle").html(title);
		$("#modalInfo .modal-body").html("<p>" + message + "</p>");
		$("#modalInfo").modal();
	}
	
	$.yk_ajax = function( option ) {
		$(".caseMarron").show();
		
		option.complete = function(){
			$(".caseMarron").hide();
		}
		return $.ajax(option).fail(function(obj,status,errort) {
			if( obj.status == 500 ) {
				window.location.href = "/500.html";
			} else if(obj.status == 404) {
				window.location.href = "/404.html";
			} else {
				console.log(errort);
			}
		});
	}
	
	$.pageChange = function( html ) {
		$("#main").find(".page").removeClass("pt-page-rotateCarouselBottomIn").addClass("pt-page-rotateCarouselBottomOut");
		setTimeout(function(){
			$("#main").html(html).find(".page").addClass("pt-page-rotateCarouselBottomIn");
		},300);
	}
}());


(function( window,factory ){
	factory(window);
}(window,function( window ){
	window.M = {};
	M.adminList = function(){
		$.yk_ajax({
			type: "post",
			url : "/admin/admin/list",
			dataType : "json"
		}).done(function( users ){
			var html = ejs.render( $("#adminList").html(),{users:users} );
			$.pageChange(html);
		});
	}
	
	M.newtypeList = function(){
		$.yk_ajax({
			type: "post",
			url : "/admin/news/newtypeList",
			dataType : "json"
		}).done(function( news ) {
			var html = ejs.render( $("#newstypeList").html(),{news:news} );
			$.pageChange(html);
		});
	}
	
	M.getNewType = function() {
		return $.yk_ajax({
			type: "post",
			url : "/admin/news/newtypeList",
			dataType : "json"
		});
	}
	
	M.newsList = function( data ){
		data = data ? data : {};
		
		$.yk_ajax({
			type: "post",
			url : "/admin/news/newsList",
			dataType : "json",
			data : data
		}).done(function( page ) {
			var html = ejs.render( $("#newsList").html(),{ page:page } );
			$.pageChange(html,".newsList");
		});
	}
	
	M.adminAdd = function( data ) {
		return $.yk_ajax({
			type:"post",
			url:"/admin/admin/adminAdd",
			data : data,
			dataType : "json"
		});
	}
	
	M.checkAdminUser = function( data ) {
		return $.yk_ajax({
			type:"post",
			url:"/admin/admin/checkAdminUser",
			data : data,
			dataType : "json"
		});
	}
	
	M.adminDel = function( data ){
		return $.yk_ajax({
			type:"post",
			url:"/admin/admin/adminDel",
			data : data,
			dataType : "json"
		});
	}
	
	M.loginOut = function( ){
		return $.yk_ajax({
			type:"post",
			url:"/login/loginout",
			dataType : "json"
		});
	}
	
	M.newtypeAdd = function( data ) {
		return $.yk_ajax({
			type:"post",
			url:"/admin/news/newtypeAdd",
			data : data,
			dataType : "json"
		});
	}
	
	M.newsAdd = function( data ) {
		return $.yk_ajax({
			type:"post",
			url:"/admin/news/newsAdd",
			data : data,
			dataType : "json"
		});
	}
	
	M.imgAdd = function() {
		var html = ejs.render( $("#imgAdd").html() );
		$.pageChange(html,".imgAdd");
	}
}));
