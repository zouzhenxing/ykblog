<template>
	<div class="page slideIn">
		<div class="hd"><h1 class="page_title">新闻类型</h1></div>
		<div class="bd">
			<div class="weui_cells weui_cells_access">
	            <a class="weui_cell" v-for="new in news" v-link="{name:'newlist',params:{'tid':new.typeid}}">
	                <div class="weui_cell_bd weui_cell_primary">
	                    <p>{{new.typename}}</p>
	                </div>
	                <div class="weui_cell_ft">{{new.newcount}}</div>
	            </a>
	        </div>
		</div>
	</div>
</template>
<script type="text/javascript">
	module.exports = {
		data : function() {
			return {
				news : []
			}
		},
		route : {
			data : function( transition ) {
				var that = this;
				M.getNewsType(function( news ){
					that.news = news;
				});
			}
		}
	}
</script>