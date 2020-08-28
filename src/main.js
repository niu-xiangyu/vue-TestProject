// 入口文件
import Vue from 'vue';
import app from './App.vue';

import Vuerouter from 'vue-router';
Vue.use(Vuerouter);
import router from './router.js';

import Vuex from 'vuex';
Vue.use(Vuex);

var shopcar = JSON.parse(localStorage.getItem('shopcar') || '[]');
var store = new Vuex.Store({
	state: {
		shopcar:shopcar
	},
	mutations: {
		
		updata(state,goodsinfo){
			
		},
		addTo(state,goodsinfo){
			var flag = false;
			state.shopcar.some(item =>{
				if(item.id == goodsinfo.id) {
					item.count += parseInt(goodsinfo.count)
					flag = true;
					return true; 
				}
			});
			if (!flag){
				state.shopcar.push(goodsinfo);
			}
			//本地存储购物数量
			localStorage.setItem('shopcar', JSON.stringify(state.shopcar));
		},
		deleteGoods(state,id){
			state.shopcar.some((item,i) => {
				if(item.id == id){
					state.shopcar.splice(i,1);
					return true;
				}
			
			});
			localStorage.setItem('shopcar', JSON.stringify(state.shopcar));
		},
		updataGoodsSelect(state,info) {
			state.shopcar.some(item=>{
				if(item.id == info.id){
					item.selected = info.selected;
				}
				localStorage.setItem('shopcar',JSON.stringify(state.shopcar));
			});
		},
	},
	getters: { 
		getAllCount(state){
			var total = 0;
			state.shopcar.forEach(item => {
				total += item.count;
			})
			return total;
		},
		getShopCarNum(state){
			var obj = {
				id:0
			};
			state.shopcar.forEach(item =>{
				obj[item.id] = item.count
			});
			return obj;
		},
		goodsSelect(state) {
			var obj = {};
			state.shopcar.forEach(item => {
		        obj[item.id] = item.selected;
		      })
		      return obj;
		    },
		getGoodsCountAndAmount(state) {
			var obj = {
			    count: 0, // 勾选的数量
			    amount: 0 // 勾选的总价
			    }
			    state.shopcar.forEach(item => {
			    if (item.selected) {
			       obj.count += item.count
			       obj.amount += item.price * item.count
			     }
			 })
			return obj;
		}
			
	}
});
//导入mui样式
import './lib/mui/css/mui.min.css';
import './lib/mui/css/icons-extra.css';

//导入vue-resource
import  VueResource from 'vue-resource';
Vue.use(VueResource);
//设置请求根路径
Vue.http.options.root = "http://api.cms.liulongbin.top";
Vue.http.options.emulateJSON = true;

//定义全局过滤器
import moment from 'moment';  //时间格式化插件
Vue.filter('dateFormat',function(dataStr, pattern = "YYYY-MM-DD HH:mm:ss"){
	return moment(dataStr).format(pattern);
});

//导入mint-ui组件
import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'


var vm = new Vue({
	el: '#app',
	render:c=>c(app),
	router,//挂在路由到实例上
	store
});