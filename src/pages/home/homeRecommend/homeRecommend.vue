<template>
	<scroll-view scroll-y 
			@scrolltolower="handleTolower"
			class="page recommend-view" 
			v-if="recommends.length > 0">
		<!-- 热门推荐 -->
		<view class="recommends">
			<view class="recommend-wrap" v-for="recomm in recommends" :key="recomm.id">
				<image :src="recomm.thumb" mode="widthFix"></image>
			</view>
		</view>
		<!-- 月份 -->
		<view class="monthes">
			<!-- 标题 -->
			<view class="monthes_title">
				<view class="monthes_title_info">
					<view class="monthes_info">
						<text>{{monthes.DD}} / </text>
						{{monthes.MM}}月
					</view>
					 <view class="monthes_text">{{monthes.title}}</view>
				</view>
				<view class="monthes_title_more">更多></view>
			</view>
			
			<!-- 内容 -->
			<view class="monthes-content">
				<view class="monthes-list" v-for="mon in monthes.items" :key="mon._id">
					<image :src="mon.thumb+mon.rule.replace('$<Height>',360)" mode="aspectFill"></image>
				</view>
			</view>
		</view>
		<!-- 热门 -->
		<view class="hot">
			<view class="hot-title">
				<text class="hot-title-text">热门</text>
			</view>
			<view class="hot-content">
				<view class="hot-itme" v-for="hot in hots" :key="hot.id">
					<image :src="hot.thumb" mode="widthFix"></image>
				</view>
			</view>
			<view class="hint" v-if="endMore">数据已加载完毕...</view>
		</view>
	</scroll-view>
</template>

<script>
	import moment from 'moment'
	export default{
		data(){
			return{
				recommends:[],
				monthes:[],
				hots:[],
				params:{
					//	获取多少条数据
					limit: 30,
					//	关键字 “hot”
					order: 'hot',
					//	跳过多少条
					skip: 0
				},
				hasMore: true,
				endMore:false
			}
		},
		mounted() {
			this.getList();
		},
		methods:{
			//发送请求获取数据
			getList(){
				this.request({
					url:'http://157.122.54.189:9088/image/v3/homepage/vertical',
					data: this.params
				}).then(result=>{
					if(result.res.vertical.length === 0){
						this.hasMore = false;
						this.endMore = false
						return;
					}
					if(this.recommends.length === 0){
						//推荐数据
						this.recommends = result.res.homepage[1].items;
						//月份数据
						this.monthes = result.res.homepage[2];
						//时间戳转化
						this.monthes.MM = moment(this.monthes.stime).format("MM");
						this.monthes.DD = moment(this.monthes.stime).format("DD");
					}
					//获取热门数据		//数组拼接
					this.hots = [...this.hots, ...result.res.vertical];
					//console.log(result.res.vertical.length)
				})
			},
			//滑动到底触发事件
			handleTolower(){
				if(this.hasMore){
					this.params.skip += this.params.limit
					this.getList()
				}
				else{
					this.endMore = true;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.recommend-view{
		height: calc(100vh - 36px);
	}
	// 推荐
	.recommends{
		display: flex;
		flex-wrap: wrap;
		border: 5rpx solid #FFFFFF;
		.recommend-wrap{
			width: 50%;
			border: 5rpx solid #FFFFFF;
		}
	}
	// 月份
	.monthes{
		// 标题
		.monthes_title {
		    display: flex;
		    justify-content: space-between;
			align-items: center;
		    padding: 20rpx;
		    .monthes_title_info {
		      color: $color;
		      font-size: 30rpx;
		      font-weight: 600;
		      display: flex;
		      .monthes_info {
		        text {
		          font-size: 36rpx;
		        }
		      }
		
		      .monthes_text {
		        font-size: 34rpx;
		        color: #666;
		        margin-left: 30rpx;
		      }
		    }
		
		    .monthes_title_more {
		      font-size: 24rpx;
		      color: $color;
		    }
		  }
		// 内容
		.monthes-content{
			display: flex;
			flex-flow: wrap;
			border: 5rpx solid #FFFFFF;
			.monthes-list{
				width: 33.33%;
				border: 5rpx solid #FFFFFF;
			}
		}
	}
	// 热门
	.hot{
		.hot-title{
			padding: 20rpx;
			.hot-title-text{
				border-left: 10rpx solid $color;
				font-size: 34rpx;
				 padding-left: 20rpx;
				 font-weight: 600;
			}
		}
		.hot-content{
			display: flex;
			flex-flow: wrap;
			border: 5rpx solid #FFFFFF;
			.hot-itme{
				width: 33.33%;
				border: 5rpx solid #FFFFFF;
			}
		}
		.hint{
			padding: 30rpx;
			text-align: center;
			font-size: 30rpx;
		}
	}
</style>
