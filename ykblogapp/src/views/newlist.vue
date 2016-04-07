<template>
	<div class="page slideIn">
		<div class="hd"><h1 class="page_title">XXX类型</h1></div>
		<div class="bd">
			<div class="weui_cells weui_cells_access">
	            <a class="weui_cell" v-for="new in news" v-link="{name:'newdetail',params:{'nid':new.nid}}">
	                <div class="weui_cell_bd weui_cell_primary">
	                    <p>{{new.ntitle}}</p>
	                </div>
	                <div class="weui_cell_ft">{{new.addtime}}</div>
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
				var tid = transition.to.params.tid;
				var that = this;
				M.getNewsByTid(tid,function( news ){
					that.news = news;
				});
			}
		}
	}
</script>