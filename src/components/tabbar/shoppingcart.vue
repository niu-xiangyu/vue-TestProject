<template>
  <div class="shopcar_container" >
	<!-- 1 -->
	<div class="goods-list" v-for="(item,i) in goodslist" :key="item.id">
		<div class="mui-card" >
				<div class="mui-card-content">
					<div class="mui-card-content-inner" >
						<mt-switch v-model="$store.getters.goodsSelect[item.id]" 
						@change="btnChange(item.id,$store.getters.goodsSelect[item.id])"></mt-switch>
						<img :src="item.thumb_path" alt="">
						<div class="info">
							<h3>{{item.title}}</h3>
							<p>
								<span class="price">￥{{item.sell_price}}</span>
								<shopcar_numbox :goodsId="item.id" :initcount="$store.getters.getShopCarNum[item.id]"></shopcar_numbox>
								<a href="" @click.prevent="removeGoods(item.id,i)">删除</a>
							</p>
						</div>
					</div>
				</div>
			</div>
	</div>
	
	<div class="mui-card">
			<div class="mui-card-content">
				<div class="mui-card-content-inner jiesuan">
					<div class="left">
						<p>总计</p>
						<p>勾选商品<span class="red">{{$store.getters.getGoodsCountAndAmount.count}}</span>件，总价<span class="red">￥{{$store.getters.getGoodsCountAndAmount.amount}}</span> </p>
					</div>
					<mt-button type="danger">结算</mt-button>
				</div>
			</div>
	</div>
	{{$store.getters.goodsSelect}}
  </div>
  
</template>

<script>
import shopcar_numbox from "../others/shopcar_numbox.vue"
export default{
	data(){
		return {
			goodslist: []
		};
	},
	created() {
		this.getInfo();
	},
	methods:{
		removeGoods(id,index){
			this.goodslist.splice(index,1);
			this.$store.commit("deleteGoods",id);
		},
		getInfo(){
			var info = [];
			this.$store.state.shopcar.forEach(i => info.push(i.id));
			if(info.lemgth <= 0){
				
				return;
			}
			this.$http.get('api/goods/getshopcarlist/' + info.join(",")).then(result => {
				if(result.body.status === 0){
					
					this.goodslist = result.body.message;
					
				}
				else {
					console.log('false');
				}
			});
		},
		btnChange(id,status){
			this.$store.commit('updataGoodsSelect',{id,selected:status});
		}
	},
	components: {
		shopcar_numbox
	}
}
</script>


<style lang='scss' scoped>
.shopcar_container{
	background-color: #eee;
	overflow: hidden;
	
	.goods-list {
		.mui-card-content-inner {
			display: flex;
			align-items: center;
		}
		
		img {
			width: 70px;
			height: 60px;
			margin: 7px;
		}
		h3 {
			font-size: 15px;
			margin-bottom: 5px;
		}
		.info {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			
			P {
				margin-top: 6px;
			}
			.price {
				color: red;
				font-weight: bold;
			}
		}
	}
}
.jiesuan {
	display: flex;
	justify-content: space-between;
	align-items: center;
	
	.red {
		color:red;
		font-size: 15px;
		font-weight: bold;
	}
}
</style>