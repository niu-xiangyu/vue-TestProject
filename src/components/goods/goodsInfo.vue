<template>
  <div class="goodsinfo-container">

    
    <!-- 商品轮播图区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <lunbotu :pictureList="lunbotu" :isfull="false"></lunbotu>
        </div>
      </div>
    </div>


    <!-- 商品购买区域 -->
    <div class="mui-card">
      <div class="mui-card-header">{{ goodsinfo.title }}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价：<del>￥{{ goodsinfo.market_price }}</del>&nbsp;&nbsp;销售价：<span class="now_price">￥{{ goodsinfo.sell_price }}</span>
          </p>
          <p>购买数量：<numbox @getShopCount="getShopCount" :max="goodsinfo.stock_quantity"></numbox></p>
          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="littleBall()" >加入购物车</mt-button>
          </p>
        </div>
      </div>
    </div>


    <!-- 商品参数区域 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号：{{ goodsinfo.goods_no }}</p>
          <p>库存情况：{{ goodsinfo.stock_quantity }}件</p>
          <p>上架时间：{{ goodsinfo.add_time | dateFormat }}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" @click="showInfo(id)">图文介绍</mt-button>
        <mt-button type="danger" size="large" @click="comments(id)">商品评论</mt-button>
      </div>
    </div>

	<!-- 	小球 -->
	 <transition 
		@before-enter="beforeEnter"
		@enter="enter"
		@after-enter="afterEnter">
	      <div class="ball" v-show="visible" ref="ball"></div>
	 </transition>
	
  </div>
</template>

<script>

import lunbotu from "../others/lunbotu.vue";
import numbox from  "../others/goodsinfo_numbox.vue";

export default {
  data() {
    return {
      id: this.$route.params.id, //具体点击页面 id参数
      lunbotu: [], //轮播图数据
      goodsinfo: {},  //商品信息集合
	  visible: false, //购物小球隐藏显示控制
	  shopCount: 1 // 默认购物数
    
    };
  },
  created() {
    this.getLunbotu();
    this.getGoodsInfo();
  },
  methods: {
    getLunbotu() {
      this.$http.get("api/getthumimages/" + this.id).then(result => {
        if (result.body.status === 0) {
          // 先循环轮播图数组的每一项，为 item 添加 img 属性，因为 轮播图 组件中，只认识 item.img， 不认识 item.src
          result.body.message.forEach(item => {
            item.img = item.src;
          });
          this.lunbotu = result.body.message;
        }
      });
    },
    getGoodsInfo() {
      // 获取商品的信息
      this.$http.get("api/goods/getinfo/" + this.id).then(result => {
        if (result.body.status === 0) {
          this.goodsinfo = result.body.message[0];
        }
      });
    },
	showInfo(id){
		this.$router.push({ name:"showinfo", params:{id} });
	},
	comments(id){
		this.$router.push({ name:"comments", params:{id} });
	},
	littleBall(){
		this.visible = !this.visible;
		var goodsinfo = {
			id: this.id,
			count: this.shopCount,
			price: this.goodsinfo.sell_price,
			select: true
			
		};
		this.$store.commit("addTo", goodsinfo); //!
	},
	//小球动画部分
	beforeEnter(el){
		el.style.transform = 'translate(0,0)';
	},
	enter(el,done){
	  const ballPosition = this.$refs.ball.getBoundingClientRect();
      // 获取 徽标 在页面中的位置
      const badgePosition = document
        .getElementById("badge")
        .getBoundingClientRect();
      const xDist = badgePosition.left - ballPosition.left;
      const yDist = badgePosition.top - ballPosition.top;
      el.style.transform = `translate(${xDist}px, ${yDist}px)`;
      el.style.transition = "all 0.5s cubic-bezier(.4,-0.3,1,.68)";
      done();
		
	},
	afterEnter(el){
		this.visible = !this.visible;
	},
	getShopCount(count){
		this.shopCount = count;
		console.log(this.shopCount);
	}

  },
  components: {
    lunbotu,
	numbox
  }
}
</script>

<style lang="scss" scoped>
.goodsinfo-container {
  background-color: #eee;
  overflow: hidden;
  .now_price {
    color: red;
    font-size: 16px;
    font-weight: bold;
  }
  .mui-card-footer {
    display: block;
    button {
      margin: 15px 0;
    }
  }
  .ball {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: black;
    position: absolute;
    z-index: 99;
    top: 390px;
    left: 146px;
  }
}
</style>