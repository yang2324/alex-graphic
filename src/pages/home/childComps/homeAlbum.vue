<template>
	<scroll-view scroll-y class="album-scroll" @scrolltolower="handleTolower">
		<!-- 轮播图 -->
		<view class="album_swiper">
			<swiper autoplay indicator-dots circular>
				<swiper-item v-for="item in banner" :key="item.id">
					<image :src="item.thumb" mode=""></image>
				</swiper-item>
			</swiper>
		</view>
		<!-- 专辑列表 -->
		<view class="album_list">
			<navigator 
				hover-class="none"
				:url="`../album/Album?id=${item.id}`"
				class="album_item" 
				v-for="item in album" 
				:key="item.id">
				<view class="item_img">
					<image mode="aspectFill" :src="item.cover"></image>
				</view>
				<view class="item_info">
					<view class="album_name">{{item.name}}</view>
					<view class="album_desc">{{item.desc}}</view>
					<view class="album_btn">
						<view class="btn-attention">+关注</view>
					</view>
				</view>
			</navigator>
			<view class="hint" v-if="endMore">数据已加载完毕...</view>
		</view>
	</scroll-view>
</template>

<script>
	export default{
		data(){
			return{
				params:{
					limit: 30,
					order: "new",
					skip: 0
				},
				//轮播图数据
				banner:[],
				//专辑数据
				album:[],
				//判断是否有数据
				hashMore:true,
				endMore:false
			}
		},
		mounted() {
			//修改头部标题
			uni.setNavigationBarTitle({
				title:"专辑"
			})
			//加载数据
			this.getAlbumList()
		},
		methods:{
			getAlbumList(){
				this.request({
					url:'http://157.122.54.189:9088/image/v1/wallpaper/album',
					data:this.params
				}).then(result=>{
					if(this.banner.length === 0){
						this.banner = result.res.banner;
					}
					if(result.res.album.length === 0){
						this.hashMore = false;
						this.endMore = true
						return;
					}
					this.album = [...this.album,...result.res.album]
					//console.log(result)
				})
			},
			handleTolower(){
				if(this.hashMore){
					this.params.skip += this.params.limit
					this.getAlbumList()
				}else{
					this.endMore = true
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.album-scroll{
		height: calc(100vh - 36px);
	}
	.album_swiper {
	  swiper {
	    height: calc(750rpx / 2.3);
	    image {
	      height: 100%;
	    }
	  }
	}
	.album_list{
		padding: 10rpx;
		.album_item{
			padding: 20rpx 0;
			display: flex;
			border-bottom: 1rpx solid #ccc;
			.item_img{
				flex: 1;
				image{
					width: 200rpx;
					height: 200rpx;
				}
			}
			.item_info{
				flex: 2;
				overflow: hidden;
				padding: 0 10rpx;
				.album_name{
					font-size: 34rpx;
					padding: 10rpx 0;
				}
				.album_desc{
					font-size: 28rpx;
					padding: 10rpx 0;
					
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
				}
				.album_btn{
					display: flex;
					justify-content: flex-end;
					color: $color;				
					.btn-attention{
						padding: 10rpx;
						border: 1rpx solid $color;
					}
				}
			}
		}
		.hint{
			padding: 30rpx;
			text-align: center;
			font-size: 30rpx;
		}
	}
</style>
