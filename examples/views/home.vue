<template>
    <div style="text-align:center">
        <img alt="Vue logo" src="../assets/logo.png" height="50px">
        <div>
            <h4>基于vue-video-player封装的播放rtmp协议视频流的播放器</h4>
            <vueRtmpPlayer 
                ref="rtmpPlayer" 
                class="vjs-custom-skin" 
                @play="onPlayerPlay($event)" 
                @pause="onPlayerPause($event)" 
                @loadeddata="onPlayerLoadeddata($event)" 
                @waiting="onPlayerWaiting($event)" 
                @playing="onPlayerPlaying($event)" 
                @timeupdate="onPlayerTimeupdate($event)" 
                @ready="playerReadied" 
                @statechanged="playerStateChanged($event)">
            </vueRtmpPlayer>
            <input v-model="src" style="width:400px"/><button @click="handleSetSrc">设置视频源</button></br>
            <button @click="handlePlay">播放</button>
            <button @click="handlePause">暂停</button>
        </div>
    </div>
</template>
<script>
export default {
    name: "home",
    data() {
        return {
            src:'rtmp://58.200.131.2:1935/livetv/hunantv',
        }
    },
    methods: {
        handlePlay(){
            this.$refs.rtmpPlayer.play();
        },
        handlePause(){
            this.$refs.rtmpPlayer.pause();
        },
        handleSetSrc(){
            this.$refs.rtmpPlayer.setSrc(this.src);
        },
        // 播放回调
        onPlayerPlay(player) {
            // console.log('player play!', player)
        },
        // 暂停回调
        onPlayerPause(player) {
            // console.log('player pause!', player)
        },
        // 当播放器在当前播放位置下载数据时触发
        onPlayerLoadeddata(player) {
            // console.log('player Loadeddata!', player)
        },
        // 等待回调
        onPlayerWaiting(player) {
            // console.log('player Waiting!', player)
        },
        // 正在播放回调
        onPlayerPlaying(player) {
            // console.log('player Playing!', player)
        },
        // 当前播放位置发生变化回调
        onPlayerTimeupdate(player) {
            // console.log('player Timeupdate!', player.currentTime())
        },
        // 状态变化回调
        playerStateChanged(playerCurrentState) {
            // console.log('player current update state', playerCurrentState)
        },

        // 播放器就绪回调
        playerReadied(player) {
            // console.log('example player 1 readied', player)
            // player.currentTime(10)
        }
    }
};
</script>
