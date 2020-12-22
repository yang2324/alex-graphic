<template>
	<view>
		<!-- 用户信息 -->
		<view class="user_info">
			<view class="user_icon">
				<image :src="imgDetail.user.avatar"
				   mode="widthFix"></image>
			</view>
			<view class="user_desc">
				<view class="user_name">{{imgDetail.user.name}}</view>
				<view class="user_time">{{imgDetail.cnTime}}</view>
			</view>
		</view>
		<!-- 大图 -->
		<view class="high_img">
			<swiper-action @swiperAction="handleSwiperAction">
				<image mode="aspectFill" :src="imgDetail.thumb"></image>
			</swiper-action>
		</view>
		<!-- 点赞 -->
		<view class="user_rank">
		  <view class="rank">
			<text class="iconfont icondianzan">{{imgDetail.rank}}</text>
		  </view>
		  <view class="user_collect">
			<text class="iconfont iconshoucang">收藏</text>
		  </view>
		</view>
		<!-- 专辑 -->
		<view class="album_wrap" v-if="album.length">
		    <view class="album_title">相关</view>
		    <view class="album_list">
				<view class="album_item"
						v-for="item in album"
						:key="item.id">
					<view class="album_cover">
					<image :src="item.cover"
							mode="aspectFill"></image>
					</view>
					<view class="album_info">
						<view class="album_info_text">专辑</view>
						<view class="album_name">{{item.name}}</view>
						<view class="iconfont iconiconfontjiantou4"></view>
					</view>
				</view>
		    </view>
		</view>
		
		<!-- 热评 -->
		<view class="comment hot"
			  v-if="hot.length">
		  <view class="comment_title">
			<text class="iconfont iconhot1"></text>
			<text class="comment_text">最热评论</text>
		  </view>
		  <view class="comment_list">
			<view class="comment_item"
				  v-for="item in hot"
				  :key="item.id">
			  <!-- 用户信息 -->
			  <view class="comment_user">
				<!-- 用户头像 -->
				<view class="user_icon">
				  <image mode="widthFix"
						 :src="item.user.avatar"></image>
				</view>
				<!-- 用户名称 -->
				<view class="user_name">
				  <view class="user_nickname">{{item.user.name}}</view>
				  <view class="user_time">{{item.cnTime}}</view>
				</view>
				<!-- 用户徽章 -->
				<view class="user_badge">
				  <image v-for="item2 in item.user.title"
						 :key="item2.icon"
						 :src="item2.icon"></image>
				</view>
			  </view>
			  <!-- 评论数据 -->
			  <view class="comment_desc">
				<view class="comment_content">{{item.content}}</view>
				<view class="comment_like">
				  <text class="iconfont icondianzan">{{item.size}}</text>
				</view>
			  </view>
			</view>
		  </view>
		</view>
		
		<!-- 新评论 -->
		<view class="comment new"
			  v-if="comment.length">
		  <view class="comment_title">
			<text class="iconfont iconpinglun"></text>
			<text class="comment_text">最新评论</text>
		  </view>
		  <view class="comment_list">
			<view class="comment_item"
				  v-for="item in comment"
				  :key="item.id">
			  <!-- 用户信息 -->
			  <view class="comment_user">
				<!-- 用户头像 -->
				<view class="user_icon">
				  <image mode="widthFix"
						 :src="item.user.avatar"></image>
				</view>
				<!-- 用户名称 -->
				<view class="user_name">
				  <view class="user_nickname">{{item.user.name}}</view>
				  <view class="user_time">{{item.cnTime}}</view>
				</view>
				<!-- 用户徽章 -->
				<view class="user_badge">
				  <image v-for="item2 in item.user.title"
						 :key="item2.icon"
						 :src="item2.icon"></image>
				</view>
			  </view>
			  <!-- 评论数据 -->
			  <view class="comment_desc">
				<view class="comment_content">{{item.content}}</view>
				<view class="comment_like">
				  <text class="iconfont icondianzan">{{item.size}}</text>
				</view>
			  </view>
			</view>
		  </view>
		</view>
		<!-- 下载保存图片按钮 -->
		<view class="download">
			<view class="download-btn"
				@click="handleDownload">下载图片</view>
		</view>
	</view>
</template>

<script>
	import moment from "moment"
	import swiperAction from "@/components/swiperAction"
	//时间转换成中文
	moment.locale('zh-cn');
	export default {
		components:{
			swiperAction
		},
		data() {
			return {
				imgDetail:[],
				album:[],
				comment:[],
				hot:[],
				//当前索引
				imgIndex:0
			}
		},
		onLoad() {
			//console.log(getApp().globalData)
			const {imgIndex} = getApp().globalData;
			this.imgIndex = imgIndex;
			this.getData();
		},
		methods: {
			getData(){
				const {imgList} = getApp().globalData;
				this.imgDetail = imgList[this.imgIndex];
				//时间戳转换成xxxx年前
				this.imgDetail.cnTime = moment(this.imgDetail.atime*1000).fromNow()
				this.getCommentList(this.imgDetail.id)
			},
			getCommentList(id){
				this.request({
					url:`http://157.122.54.189:9088/image/v2/wallpaper/wallpaper/${id}/comment`
				}).then(result=>{
					//console.log(result)
					this.album = result.res.album;
					// hot对象添加时间属性
					result.res.hot.forEach(e => e.cnTime = moment(e.atime * 1000).fromNow());
					result.res.comment.forEach(e => e.cnTime = moment(e.atime * 1000).fromNow());
					this.comment = result.res.comment;
					this.hot = result.res.hot;
				})
			},
			handleSwiperAction(e){
				const {imgList} = getApp().globalData;
				if(e.direction === "left"&& this.imgIndex < imgList.length-1){
					//可以进行左滑  进行下一页
					this.imgIndex ++;
					this.getData()
				}else if(e.direction === "right"&& this.imgIndex>0){
					//可以进行右滑  进行上一页
					this.imgIndex --;
					this.getData()
				}else{
					uni.showToast({
						title:"没有数据了~",
						icon:"none"
					})
				}
			},
			//点击下载图片在本地
			async handleDownload(){
				// 提示
				await uni.showLoading({
					title:"下载中"
				})
				//下载
				const result1 =  await uni.downloadFile({url:this.imgDetail.img});
				const {tempFilePath} = result1[1];
				//console.log(result1)
				//保存在本地
				const result2 = await uni.saveImageToPhotosAlbum({
					filePath:tempFilePath
				})
				//关闭加载中
				uni.hideLoading();
			}
		}
	}
</script>

<style lang="scss" scoped>
@import './imgDetail.scss' ; //导入外部scss文件
</style>
