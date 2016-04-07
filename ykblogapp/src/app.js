var Vue = require("vue");
var VueRouter = require("vue-router");
global.M = require("./js/module.js");

//引入样式
require("./css/weui.css");
require("./css/page.css");

Vue.use(VueRouter);
var App = Vue.extend({});
var router = new VueRouter({
    hashbang: true,
    history: false,
    saveScrollPosition: true,
    transitionOnLoad: true
});

router.map({
    '/': {
        component: require("./views/index.vue")
    },
    '/newlist/:tid': {
    	name : 'newlist',
    	component: require("./views/newlist.vue")
    },
    '/newdetail/:nid' : {
    	name : 'newdetail',
    	component : require("./views/newdetail.vue")
    }
});

router.start(App, '#app');