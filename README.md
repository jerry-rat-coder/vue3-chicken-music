# vue-chicken-music

仿炸鸡音乐移动端项目

技术栈: vue全家桶, pinia，vue-router, vue3 hooks 

## 在线预览：[Vite + Vue (vue3-chicken-music.vercel.app)](https://vue3-chicken-music.vercel.app/#/recommend)

- 使用vite创建 热更新更快
- vue3 composition api写法
- 自定义hook实现逻辑复用 解耦
- 热门推荐列表
- 热门轮播图
- 歌手列表索引页
- 排行榜页
- 搜索歌曲
- 热门搜索推荐
- 搜索历史
- 歌手详情页
- 歌单详情页
- 排行详情页
- 上述三个详情页的可复用逻辑封装函数
- 音乐播放器（全屏 小型模式 使用pinia控制全局状态）
- 当前播放列表
- 顺序播放，单曲循环和随机播放三种播放模式
- 个人中心（最近播放，收藏歌单）
- 通过计算dom属性、Transition组件、定位实现动画(滑动显示/隐藏 、 渐入渐出等)
- 使用localstorage存储音乐列表，收藏夹，历史记录等

# 项目启动

```
###
npm install
###
npm run dev
```

# 数据接口文档

[NeteaseCloudMusicApi - 网易云音乐 NodeJS 版 API (binaryify.github.io)](https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=neteasecloudmusicapi)

