<template>
	<scroll-view  
		enable-flex 
		scroll-y
		class="video_category">
		<navigator class="category_item"
				 v-for="item in categorys"
				 :key="item.id"
				 :url="`/pages/imgCategory/imgCategory?id=${item.id}`">
		<image :src="item.cover"
			   mode="aspectFill"></image>
		<view class="cate_name">{{item.name}}</view>
	  </navigator>
	</scroll-view>
</template>

<script>
	export default{
		props:{
			category:Object
		},
		data(){
			return{
				categorys:[]
			}
		},
		mounted() {
			//console.log(this.category)
			this.getList()
		},
		methods:{
			getList(){
				this.request({
					url:this.category.url
				}).then(result=>{
					//console.log(result)
					this.categorys = result.res.category
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.video_category {
	height: calc(100vh - 36px);
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    box-sizing: border-box;
    border: 5rpx solid #fff;
    .category_item {
		// width: 33.33%;
		width: calc((100%)/3);
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		border: 5rpx solid #fff;
		image {
		  height: 240rpx;
		}
		.cate_name {
		    position: absolute;
		    width: 100%;
		    height: 40rpx;
		    left: 0;
		    bottom: 0;
		    color: #fff;
		    // c3 渐变效果
		    background-image: linear-gradient(
				to right top,
				rgba(0, 0, 0, 0.2),
				rgba(0, 0, 0, 0)
		    );
		    display: flex;
		    align-items: center;
		    font-size: 40rpx;
		    padding-left: 20rpx;
		    padding-bottom: 10rpx;
		}
    }
}
</style>