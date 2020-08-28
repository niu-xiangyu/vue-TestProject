<template>
  <div class="body">
 <!-- <router-link  :to="'/home/goods/goodsInfo/' + item.id"  class="example" v-for="item in goodslist" :key="item.id" tag="div"> -->
	  	<div class="example" v-for="item in goodslist" :key="item.id" @click="goDetail(item.id)">
	  		
			  <div class="content" >
	  		  		  <img :src="item.img_url" alt="">
	  		  		  <div class="title">
						  {{item.title}}
					  </div>
	  		  </div>
	  		  <div class='info'>
	  		  			<div class='price'>
	  		  					<span class='lprice'>￥{{item.sell_price}}</span>
	  		  					<span class="rprice">￥{{item.market_price}}</span>
	  		  			</div>
	  		  			<div class="surplus">
	  		  				<p>热卖中</p>  <p>剩{{item.stock_quantity}}件</p>
	  		  			</div>
	  		  </div>
	  		  		  
	  		  
	  </div>
	  <mt-button type="danger" size="large" @click="loadMore">loading more</mt-button>
 </div>
</template>

<script>
	export default {
		data(){
			return {
				pageID:1,
				goodslist:[]
			}
		},
		created(){
			this.getInfo();
		},
		methods:{
			getInfo(){
				this.$http
				.get("api/getgoods?pageindex=" + this.pageID)
				.then(result => {
					 if (result.body.status === 0) {
						 this.goodslist = this.goodslist.concat(result.body.message);
					 }
				});
			},
			loadMore(){
				++this.pageID;
				this.getInfo();
			},
			goDetail(id){
					
					// this.$router.push({name:"goodsinfo" , params:pageID});
					//2传递对象
					//this.$router.push({path:'/home/goods/goosinfo/' + id});
					//3.传递命名路由
					this.$router.push({name:'goodsinfo', params:{id}});
					
			},
		}
	}
	
	
</script>

<style lang="scss" scoped>
.body {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	padding: 0.5rem;
	
	
	.example {
		max-height: 50%;
		width: 49%;
		border: 1px solid #CCC;
		box-shadow: 0 0 5px;
		margin-bottom: 15px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		.content {
			img {
				width: 100%;
				min-height: 200px;
			}
			.title{
				font-size: 20px;
				
			}
		}
		.info {
			background-color: #eee;
			
			.lprice {
				margin: 0 2px;
				font-size: 20px;
				color: red;
				font-weight: bold;
			}
			.rprice {
				color: gray;
				font-size: 15px;
				text-decoration: line-through;
				margin-left: 10px;
			}
			.surplus {
				margin: 0 5px;
				display: flex;
				justify-content: space-between;
			}
		}
	}
	
}

</style>
