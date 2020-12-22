<template>
	<scroll-view class="video-wrap"  
		enable-flex="true"
		scroll-y
		@scrolltolower="handleTolower">
		<view class="video-item" v-for="(item,index) in videowp" :key="index" @click="videoPlay(item)">
			<image :src="item.img" mode="widthFix"></image>
		</view>
	</scroll-view>
</template>

<script>
	export default{
		props:{
			urlobj:Object
		},
		data(){
			return{
				videowp:[],
				hashMore:true
			}
		},
		watch:{
			urlobj(){
				this.getList();
				this.videowp=[];
			}
		},
		mounted() {
			this.getList()
		},
		methods:{
			//获取数据
			getList(){
				this.request({
					url: this.urlobj.url,
					data:this.urlobj.params
				}).then(result=>{
					//console.log(result)
					if(result.res.videowp.length === 0){
						this.hashMore = false;
						uni.showToast({
							title:"已经全部加载完啦~",
							icon:"none"
						});
						return;
					}
					this.videowp = [...this.videowp,...result.res.videowp]
				})
			},
			//下拉到底加载更多数据
			handleTolower(){
				if(this.hashMore){
					this.urlobj.params.skip += this.urlobj.params.limit;
					this.getList()
				}else{
					uni.showToast({
						title:"已经全部加载完啦~",
						icon:"none"
					})
				}
			},
			//跳转到视频播放页
			videoPlay(item){
				//把数据缓存
				getApp().globalData.video = item;
				//跳转
				uni.navigateTo({
					url:"../VideoPlay/VideoPlay"
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	.video-wrap{
		display: flex;
		flex-flow: row wrap;
		justify-content: space-between;
		box-sizing: border-box;
		height: calc(100vh - 36px);
		border: 5rpx solid #fff;
		.video-item{
			// width: 33.33%;
			width: calc((100%)/3);
			display: flex;
			justify-content: center;
			align-items: center;
			border: 5rpx solid #fff;
		}
	}
</style>
