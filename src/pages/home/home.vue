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
				<view v-if="current === 0">
					<home-recommend></home-recommend>
				</view>
				<view v-if="current === 1">
					<home-categoty></home-categoty>
				</view>
				<view v-if="current === 2">
				   <home-new></home-new>
				</view>
				<view v-if="current === 3">
				   <home-album></home-album>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import HomeAlbum from './homeAlbum/home-album.vue'
	import HomeCategoty from './homeCategoty/home-categoty.vue'
	import HomeNew from './homeNew/home-new.vue'
	import HomeRecommend from './homeRecommend/homeRecommend.vue'
	
	import uniSegmentedControl from "@dcloudio/uni-ui/lib/uni-segmented-control/uni-segmented-control.vue";
	export default {
		components:{
			HomeAlbum,
			HomeCategoty,
			HomeNew,
			HomeRecommend,
			uniSegmentedControl
		},
		data() {
			return {
				items: [
					{title:'推荐'},
					{title:'分类'},
					{title:'最新'},
					{title:'专辑'}
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
