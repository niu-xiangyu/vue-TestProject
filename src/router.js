import VueRouter from 'vue-router';
import Home from './components/tabbar/home.vue';
import Member from './components/tabbar/member.vue';
import Shoppingcart from './components/tabbar/shoppingcart.vue';
import Search from './components/tabbar/search.vue';
import Test1 from  './components/test/test1.vue';
import Test2 from  './components/test/test2.vue';
import PTest1 from  './components/pictures/test1.vue';
import Goods from  './components/goods/goods.vue';
import GoodsInfo from  './components/goods/goodsInfo.vue';
import ShowGoodsInfo from  './components/goods/showInfo.vue';
import GoodsComments from  './components/goods/comments.vue';


var router = new VueRouter({
  routes: [
  	{path: '/', redirect: '/home'},
  	{path: '/home', component: Home},
  	{path: '/member', component: Member},
  	{path: '/shoppingcart', component: Shoppingcart},
  	{path: '/search', component: Search},
	{path: '/home/test1', component: Test1},
	{path: '/home/test2/:id', component: Test2},
	{path: '/home/pictures', component: PTest1},
	{path: '/home/goods', component: Goods},
	{path: '/home/goods/goodsinfo/:id', component: GoodsInfo , name: 'goodsinfo'},
	{path: '/home/goods/goodsinfo/showinfo/:id', component: ShowGoodsInfo , name: 'showinfo'},
	{path: '/home/goods/goodsinfo/comments/:id', component: GoodsComments , name: 'comments'}
  ],
  linkActiveClass: 'mui-active' //覆盖默认路由高亮类 默认为router-link-active 

});

// 把路由对象暴露出去
export default router