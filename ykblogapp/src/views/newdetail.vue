<template>
	<div class="page slideIn">
		<div class="bd">
			<div class="weui_article">
				<h1 class="page_title">{{news.ntitle}}</h1>
				<section>
					<p>{{{news.ncontent}}}</p>
				</section>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	module.exports = {
		data : function() {
			return {
				news : {}
			}
		},
		route : {
			data : function( transition ) {
				var nid = transition.to.params.nid;
				var that = this;
				M.getNewsByNid(nid,function( news ) {
					that.news = news[0];
				});
			}
		}
	}
</script>