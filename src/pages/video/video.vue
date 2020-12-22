<template>
	<view class="page">
		<view class="home-title">
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
		<view class="home-content">
			<view class="content">
				<view v-if="current < 4">
					<video-main :urlobj="{url:items[current].url,params:items[current].params}"></video-main>
				</view>
				<view v-if="current === 4">
					<video-category :category="{url:items[current].url}"></video-category>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniSegmentedControl from "@dcloudio/uni-ui/lib/uni-segmented-control/uni-segmented-control.vue";
	import VideoMain from "./childComps/VideoMain.vue"
	import VideoCategory from "./childComps/VideoCategory.vue"
	export default {
		components:{
			uniSegmentedControl,
			VideoMain,
			VideoCategory
		},
		data() {
			return {
				items: [
					{title:'推荐',url:"http://157.122.54.189:9088/videoimg/v1/videowp/featured",params:{limit:30,skip:0,order:"hot"}},
					{title:'娱乐',url:"http://157.122.54.189:9088/videoimg/v1/videowp/category/59b25abbe7bce76bc834198a",params:{limit:30,skip:0,order:"new"}},
					{title:'最新',url:"http://157.122.54.189:9088/videoimg/v1/videowp/videowp",params:{limit:30,skip:0,order:"new"}},
					{title:'热门',url:"http://157.122.54.189:9088/videoimg/v1/videowp/videowp",params:{limit:30,skip:0,order:"hot"}},
					{title:'分类',url:"http://157.122.54.189:9088/image/v1/vertical/category",params:{}}
				],
				current: 0
			}
		},
		methods: {
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex;
				}
			}
		}
	}
</script>

<style lang="scss">
.home-title{
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
</style>
