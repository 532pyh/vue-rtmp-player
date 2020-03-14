import vueRtmpPlayer from './src/index.vue';
vueRtmpPlayer.install = function(Vue) {
    Vue.component(vueRtmpPlayer.name, vueRtmpPlayer);
};
export default vueRtmpPlayer;
