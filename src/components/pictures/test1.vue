<template>
	<div>
		<div id="slider" class="mui-slider">
				<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
					<div class="mui-scroll">
						<a :class="['mui-control-item', item.id == 0 ? 'mui.actice' : ' '] " v-for="item in datas" :key="item.id" @click="getpicture(item.id)">
							{{item.title}}
						</a>
						
					</div>
				</div>
		</div>
		
		<div >
			<ul class="pictures">
			  <li v-for="item in pictures" :key="item.id">
			    <img v-lazy="item.img_url">
				<div class="info">
				          <h1 class="info-title">{{ item.title }}</h1>
				          <div class="info-body">{{ item.zhaiyao }}</div>
				        </div>
			  </li>
			  
			</ul>
		</div>
	</div>
</template>

<script>
	import mui from '../../lib/mui/js/mui.min.js';
	
	export default {
		data(){
			return {
				datas:[],
				pictures:[],
			};
		},
		created(){
			this.getlist();
			this.getpicture(0);
		},
		mounted(){
			mui(".mui-scroll-wrapper").scroll({
			      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
			    });
		},
		methods: {
			getlist(){
				this.$http.get('api/getimgcategory').then(result =>{
					if(result.body.status === 0){
						result.body.message.unshift({title:"全部",id:"0"});
						this.datas = result.body.message;
					}
				});
			},
			getpicture(id){
				this.$http.get('api/getimages/' + id).then(result => {
					if(result.body.status === 0){
						this.pictures = result.body.message;
					}
				});
			}
			
		}
		
		
		
	};
</script>


<style lang="scss" scoped>
* {
  touch-action: pan-y;
 
}
.pictures {
  list-style: none;
  margin: 0;
  padding: 10px;
  padding-bottom: 0;
  li {
    background-color: #ccc;
    text-align: center;
    margin-bottom: 10px;
    box-shadow: 0 0 9px #999;
    position: relative;
    img {
      width: 100%;
      vertical-align: middle;
    }
    img[lazy="loading"] {
      width: 40px;
      height: 300px;
      margin: auto;
    }
    .info {
	  overflow: hidden;
      color: skyblue;
      text-align: left;
      position: absolute;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.4);
      max-height: 84px;
      .info-title {
        font-size: 14px;
      }
      .info-body {
        font-size: 13px;
      }
    }
  }
}

</style>
