<template>
	
	<div>
		
		<lunbotu :pictureList="pictures" :isfull="true"></lunbotu>
		
			 <ul class="mui-table-view mui-grid-view mui-grid-9">
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/test1">
		                    <img src="../../images/1.jpg">
		                    <div class="mui-media-body">测试</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/pictures">
		                     <img src="../../images/1.jpg">
		                    <div class="mui-media-body">测试</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/goods">
		                     <img src="../../images/1.jpg">
		                    <div class="mui-media-body">测试</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                 	 <img src="../../images/1.jpg">
		                    <div class="mui-media-body">测试</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                     <img src="../../images/1.jpg">
		                    <div class="mui-media-body">测试</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                     <img src="../../images/1.jpg">
		                    <div class="mui-media-body">测试</div></a></li>
		            
		     </ul> 
		
	
		

	</div>

</template>

<script>
	import {Toast} from "mint-ui";
	import lunbotu from "../others/lunbotu.vue";
	export default {
		data() {
			return {
				pictures:[]
			};
		},
		created(){
			this.getPicture();
		},
	
		methods: {
			getPicture(){
				this.$http.get("api/getlunbo").then(result =>{
					if (result.body.status === 0) {
						this.pictures = result.body.message;
						
					} 
					else {
						Toast('false');
					}
				});
			}
		},
		components:{
			lunbotu
		}
	}
	
</script>

<style lang='scss' scoped>


.mui-grid-view.mui-grid-9 {
	background-color: white;
	border: none;

	img {
		width: 80px;
		height: 68px;
	}

	.mui-media-body {
		font-size: 14px;
	}
}

.mui-grid-view.mui-grid-9 .mui-table-view-cell {
	border: none;
}

</style>