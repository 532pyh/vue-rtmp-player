import 'video.js/dist/video-js.css'
import 'videojs-flash'
import videojs from 'video.js'
import 'video.js/dist/lang/zh-CN'
export default {
    name: 'vueRtmpPlayer',
    props: {
        playsinline: {
            type: Boolean,
            default: false
        },
        height: {//播放器高度
            type: [String, Number],
            default: 360
        },
        fluid: {//为true时，播放器将按比例缩放以适应其容器
            type: Boolean,
            default: false
        },
        aspectRatio: {//播放器宽高比
            type: String,
            default: ''
        },
        language: {//播放器语言
            type: String,
            default: 'zh-CN'
        },
        autoplay: {//是否自动播放
            type: Boolean,
            default: true
        },
        muted: {//是否静音
            type: Boolean,
            default: false
        },
        controls: {//是否显示控制栏
            type: Boolean,
            default: true
        },
        src: {//rtmp://58.200.131.2:1935/livetv/hunantv
            type: String,
            default: ''
        },
        notSupportedMessage: {//覆盖Video.js无法播放媒体源时显示的默认信息
            type: String,
            default: '此视频暂无法播放，请稍后再试'
        },
        poster: {
            type: String,
            default: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=66788718,2542085327&fm=26&gp=0.jpg'
        }
    },
    data() {
        return {
            player: null,
            reseted: true
        }
    },
    watch: {
        height(value) {
            this.dispose(() => {
                this.initialize()
            })
        },
        fluid(value) {
            this.dispose(() => {
                this.initialize()
            })
        },
        aspectRatio(value) {
            this.dispose(() => {
                this.initialize()
            })
        },
        language(value) {
            this.dispose(() => {
                this.initialize()
            })
        },
        autoplay(value) {
            this.dispose(() => {
                this.initialize()
            })
        },
        muted(value) {
            this.dispose(() => {
                this.initialize()
            })
        },
        controls(value) {
            this.dispose(() => {
                this.initialize()
            })
        },
        src(value) {
            this.dispose(() => {
                this.initialize()
            })
        },
        notSupportedMessage(value) {
            this.dispose(() => {
                this.initialize()
            })
        },
        poster(value) {
            this.dispose(() => {
                this.initialize()
            })
        }
    },
    mounted() {
        if (!this.player) {
            this.initialize()
        }
    },
    beforeDestroy() {
        if (this.player) {
            this.dispose()
        }
    },
    methods: {
        initialize(src) {
            // videojs options
            const videoOptions = {
                height: this.height,
                fluid: this.fluid,
                language: this.language,
                autoplay: this.autoplay,
                techOrder: ['flash'],
                sources: [
                    {
                        type: 'rtmp/mp4',
                        src: this.src
                    },
                ],
                notSupportedMessage: this.notSupportedMessage,
                poster: this.poster,
                muted: this.muted,//控制初始是不是静音
                controls: this.controls,//是否显示控制栏
                controlBar: {
                    fullscreenToggle: true, // 是否显示全屏按钮
                    volumePanel: true,// 是否显示音量控制
                    currentTimeDisplay: false, // 是否显示当前时间
                    timeDivider: false, // 是否显示当前时间和持续时间的分隔符
                    durationDisplay: false, // 是否显示显示持续时间
                    remainingTimeDisplay: false, // 是否显示剩余时间功能
                    progressControl: false, // 是否显示进度条
                },
            }

            if (this.aspectRatio) {
                videoOptions.aspectRatio = this.aspectRatio
            }
            if (src !== undefined) {
                console.log(src)
                videoOptions.sources = [
                    {
                        type: 'rtmp/mp4',
                        src: src
                    },
                ]
            }
            // ios fullscreen
            if (this.playsinline) {
                this.$refs.video.setAttribute('playsinline', this.playsinline)
                this.$refs.video.setAttribute('webkit-playsinline', this.playsinline)
                this.$refs.video.setAttribute('x5-playsinline', this.playsinline)
                this.$refs.video.setAttribute('x5-video-player-type', 'h5')
                this.$refs.video.setAttribute('x5-video-player-fullscreen', false)
            }

            // emit event
            const emitPlayerState = (event, value) => {
                if (event) {
                    this.$emit(event, this.player)
                }
                if (value) {
                    this.$emit('statechanged', { [event]: value })
                }
            }

            // avoid error "VIDEOJS: ERROR: Unable to find plugin: __ob__"
            if (videoOptions.plugins) {
                delete videoOptions.plugins.__ob__
            }

            // player
            const self = this
            this.player = videojs(this.$refs.video, videoOptions, function () {

                // events
                const events = [
                    'loadeddata',
                    'play',
                    'pause',
                    'waiting',
                    'playing',
                    'error'
                ]

                // watch events
                const onEdEvents = {}
                for (let i = 0; i < events.length; i++) {
                    if (typeof events[i] === 'string' && onEdEvents[events[i]] === undefined) {
                        (event => {
                            onEdEvents[event] = null
                            this.on(event, () => {
                                emitPlayerState(event, true)
                            })
                        })(events[i])
                    }
                }

                // watch timeupdate
                this.on('timeupdate', function () {
                    emitPlayerState('timeupdate', this.currentTime())
                })

                // player readied
                self.$emit('ready', this)
            })
        },
        dispose(callback) {
            if (this.player && this.player.dispose) {
                if (this.player.techName_ !== 'Flash') {
                    this.player.pause && this.player.pause()
                }
                this.player.dispose()
                this.player = null
                this.$nextTick(() => {
                    this.reseted = false
                    this.$nextTick(() => {
                        this.reseted = true
                        this.$nextTick(() => {
                            callback && callback()
                        })
                    })
                })
            }
        },
        reset() {
            this.dispose(() => {
                console.log(this.src)
                this.initialize('')
            })
        },
        play() {
            if (this.player) {
                this.player.play()
            }
        },
        pause() {
            if (this.player) {
                this.player.pause();
            }
        },
        setHeight(value) {
            if (this.player && value !== undefined) {
                this.player.height(value);
            }
        },
        setVolume(value) {
            if (this.player) {
                this.player.volume(value);
            }
        },
        setSrc(value) {
            this.dispose(() => {
                this.initialize(value)
            })
        },
    },
}