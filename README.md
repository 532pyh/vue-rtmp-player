#### vue-rtmp-player组件使用说明
##### 安装
```
npm install vue-rtmp-player -save
npm install video.js@6.6.0 --save
npm install videojs-flash@2.1.0 --save
````
#### 使用
```
import 'vue-rtmp-player/packages/src/css/custom-theme.css'
import vueRtmpPlayer from 'vue-rtmp-player/packages/index.js'
Vue.use(vueRtmpPlayer);
```
##### Attributes

|参数|说明|类型|可选值|默认值|示例|
|----|---|----|-----|------|---|
| playsinline          | 移动端是否全屏| Boolean |  | false |
| height               | 播放器高度| String/Number |  | 360 |
| fluid                | 播放器是否按比例缩放以适应其容器，为true时，height不起作用 | Boolean | | false |
| aspectRatio          | 播放器宽高比，设置时，height不起作用| String | | |16:9|
| language             | 设置播放器语音| String |  | zh-CN |
| autoplay             | 是否自动播放 | Boolean |  | true |
| muted                | 是否静音 | Boolean |  | false |
| controls             | 是否显示控制栏 | Boolean |  | true |
| src                  | 地址 | String |  |  | rtmp://58.200.131.2:1935/livetv/hunantv |
| notSupportedMessage  | 无法播放媒体源时显示的默认信息| String | 此视频暂无法播放，请稍后再试 ||
| poster               | 播放器封面  | String |  |  |
##### 方法
| 方法名 | 说明 | 参数 |
| -------- | -------- | -------- |


##### Events
| 事件名称 | 说明 | 回调参数 |
| -------- | -------- | -------- | 
