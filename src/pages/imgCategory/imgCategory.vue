<template>
	<view class="page">
		<view class="category-title">
			<!-- 标题 -->
			<view class="title-choose">
				<uni-segmented-control
					:current="current" 
					:values="items.map(v=>v.title)" 
					@clickItem="onClickItem" 
					style-type="text" 
					active-color="#d4237a"
					>
				</uni-segmented-control>
			</view>
			<!-- 图标 -->
			<view class="iconfont iconsearch"></view>
		</view>
		<!-- 对应切换的内容 -->
		<scroll-view 
				scroll-y  
				enable-flex 
				class="category-content"
				@scrolltolower="handleTolower">
			<view class="category-item" v-for="item in vertical" :key="item.id">
				<image :src="item.thumb" mode="widthFix"></image>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import uniSegmentedControl from "@dcloudio/uni-ui/lib/uni-segmented-control/uni-segmented-control.vue";
	export default {
		components:{
			uniSegmentedControl
		},
		data() {
			return {
				items: [
					{title:'最新',order:'new'},
					{title:'热门',order:'hot'
					},
				],
				current: 0,
				params:{
					limit:30,
					skip:0,
					order:"new"
				},
				id:0,
				vertical:[],
				hashMore:true
			}
		},
		onLoad(options) {
			this.id = options.id;
			this.getList()
		},
		methods: {
			getList(){
				this.request({
					url:`http://157.122.54.189:9088/image/v1/vertical/category/${this.id}/vertical`,
					data:this.params
				}).then(result=>{
					//console.log(result)
					if(result.res.vertical.length === 0){
						uni.showToast({
							title:"已经全部加载完啦~",
							icon:"none"
						})
						this.hashMore = false;
						return;
					}
					this.vertical =[...this.vertical,...result.res.vertical] 
				})
			},
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex;
				}else{
					//点击相同的
					return;
				}
				this.params.order = this.items[e.currentIndex].order;
				this.params.skip = 0;
				this.vertical = [];
				this.getList()
			},
			handleTolower(){
				//console.log("到底了")
				if(this.hashMore){
					this.params.skip += this.params.limit;
					this.getList(this.id)
				}else{
					uni.showToast({
						title:"已经全部加载完啦~",
						icon:"none"
					})
					return;
				}
			}
		}
	}
</script>

<style lang="scss">
.category-title{
	display: flex;
	flex-flow: wrap;
	align-items: center;
	.title-choose{
		width: 65%;
		margin: 0 auto;
	}
	.iconsearch{
		margin-right: 50rpx;
	}
}
.category-content{
	height: calc(100vh - 36px);
	display: flex;
	flex-flow: wrap;
	.category-item{
		width: 33.33%;
		border: 5rpx solid #fff;
		image{}
	}
}
</style>