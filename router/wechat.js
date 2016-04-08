module.exports = wechat("yuankuorg").text(function (message, req, res, next) {
	res.reply([
	  {
	    title: '点击进入博客',
	    url: 'http://120.27.126.250/wechat.html'
	  }
	]);
}).image(function (message, req, res, next) {
}).voice(function (message, req, res, next) {
}).video(function (message, req, res, next) {
}).location(function (message, req, res, next) {
}).link(function (message, req, res, next) {
}).event(function (message, req, res, next) {
	if( message.Event == 'subscribe' ) {
		res.reply('欢迎来到兴哥的博客');
	}
}).device_text(function (message, req, res, next) {
}).device_event(function (message, req, res, next) {
}).middlewarify();
