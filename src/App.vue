<template>
  <div class="app-container">

  	<mt-header fixed title="小牛测试">
		<span slot="left" @click="back" v-show="visable">
			<mt-button icon="back"> 返回 </mt-button>
		</span>
	</mt-header>
    
  	<transition>
  		<router-view></router-view>
  	</transition>
    
	
	
    <nav class="mui-bar mui-bar-tab">
		<router-link class="mui-tab-item-nxy" to="/home">
			<span class="mui-icon mui-icon-home"></span>
			<span class="mui-tab-label">首页</span>
		</router-link>
		<router-link class="mui-tab-item-nxy" to="/member">
			<span class="mui-icon mui-icon-contact"></span>
			<span class="mui-tab-label">会员</span>
		</router-link>
		<router-link class="mui-tab-item-nxy" to="/shoppingcart">
			<span class="mui-icon mui-icon-extra mui-icon-extra-cart">
				<span class="mui-badge" id="badge">{{ $store.getters.getAllCount }}</span>
			</span>
			<span class="mui-tab-label">购物车</span>
		</router-link>
		<router-link class="mui-tab-item-nxy" to="/search">
			<span class="mui-icon mui-icon-search"></span>
			<span class="mui-tab-label">搜索</span>
		</router-link>
	</nav>

  </div>

</template>

<script>
export default {
	data(){
		return {
			visable:true 
		}
	},
	methods:{
		back(){
			this.$router.go(-1);    //返回上一页面
		}
	},
	watch:{
		'$route.path':function(adress){
			if(adress =='/home'){
				this.visable = false;
			}
			else {
				this.visable = true;
			}
		}
	}
}
</script>


<style lang="scss" scoped>
.app-container {
	padding-top: 40px;
	overflow-x: hidden;
	padding-bottom:50px;
}
.v-enter{
	opacity: 0; 
	transform: translateX(100%);
}
.v-leave-to {
	opacity: 0; //?
	transform: translateX(-100%);
	position: absolute; //重要设置！
}
.v-enter-active,
.v-leave-active{
	transition: all 0.5s ease;
}
.mui-bar-tab .mui-tab-item-nxy.mui-active {
    color: #007aff;
}
.mui-bar-tab .mui-tab-item-nxy {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
	.mui-icon {
	    top: 3px;
	    width: 24px;
	    height: 24px;
	    padding-top: 0;
	    padding-bottom: 0;
	  }
	.mui-icon ~ .mui-tab-label {
	    font-size: 11px;
	    display: block;
	    overflow: hidden;
	    text-overflow: ellipsis;
	}  
}
</style>
