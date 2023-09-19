import {PlayerExtensions, PlayerState} from './types'
import Hls from 'hls.js'
import {MediaPlayer, MediaPlayerClass} from 'dashjs'

const sources = {
    [PlayerExtensions.MP4]: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
    [PlayerExtensions.HLS]: 'https://storage.googleapis.com/shaka-demo-assets/bbb-dark-truths-hls/hls.m3u8',
    [PlayerExtensions.DASH]: 'https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd',
}

class Player {
    extension: PlayerExtensions = PlayerExtensions.MP4
    src: string | null = null

    state: PlayerState = PlayerState.IDLE
    element: HTMLVideoElement = document.getElementById('video') as HTMLVideoElement

    HLSPlayer: Hls | null = null
    DASHPlayer: MediaPlayerClass | null = null

    constructor() {
        this.addEventListeners()
    }

    onLoading = () => {
        this.state = PlayerState.LOADING
        console.log(this.state)
    }

    onReady = () => {
        this.state = PlayerState.READY
        console.log(this.state)
        if (this.element.paused) {
            this.element.play()
        }
    }

    onPause = () => {
        this.state = PlayerState.PAUSED
        console.log(this.state)
    }

    onPlaying = () => {
        this.state = PlayerState.PLAYING
        console.log(this.state)
    }

    onSeeking = () => {
        this.state = PlayerState.SEEKING
        console.log(this.state)
    }

    onBuffering = () => {
        this.state = PlayerState.BUFFERING
        console.log(this.state)

        if (this.element.buffered.length > 0) {
            for (let i = 0; i < this.element.buffered.length; i++) {
                console.log(`buffer ${i}: `, {
                    start: this.element.buffered.start(i),
                    end: this.element.buffered.end(i),
                })
            }
        }
    }

    onEnded = () => {
        this.state = PlayerState.ENDED
        console.log(this.state)
    }

    addEventListeners() {
        if (!this.element) {
            this.error('Video tag is not found')
            return
        }

        this.element.addEventListener('loadstart', this.onLoading)
        this.element.addEventListener('canplay', this.onReady)
        this.element.addEventListener('playing', this.onPlaying)
        this.element.addEventListener('pause', this.onPause)
        this.element.addEventListener('seeking', this.onSeeking)
        this.element.addEventListener('progress', this.onBuffering)
        this.element.addEventListener('ended', this.onEnded)
    }

    load(videoType: PlayerExtensions) {
        if (!this.element) {
            this.error('Video tag is not found')
            return
        }

        if (this.HLSPlayer) this.HLSPlayer.destroy()
        if (this.DASHPlayer) {
            this.DASHPlayer.reset()
            this.DASHPlayer.destroy()
        }

        this.extension = videoType
        this.src = sources[videoType]

        if (this.extension === PlayerExtensions.MP4) {
            this.loadNativePlayer()
            return
        }

        if (this.extension === PlayerExtensions.HLS) {
            if (this.element.canPlayType('application/vnd.apple.mpegurl')) {
                this.loadNativePlayer()
            } else if (Hls.isSupported()) {
                this.HLSPlayer = new Hls()

                this.HLSPlayer.loadSource(this.src)
                this.HLSPlayer.attachMedia(this.element)
            } else {
                this.error('HLS is not supported')
            }
            return
        }

        if (this.extension === PlayerExtensions.DASH) {
            if (this.element.canPlayType('application/dash+xml')) {
                this.loadNativePlayer()
            } else {
                try {
                    this.DASHPlayer = MediaPlayer().create()

                    this.DASHPlayer.initialize(this.element, this.src, false)
                } catch (e) {
                    this.error('DASH is not supported')
                }
            }
            return
        }

        this.error('Video type is not supported')
    }

    loadNativePlayer() {
        if (!this.src) {
            this.error('Source is empty')
            return
        }

        this.element.src = this.src
        this.element.load()
    }

    error(msg: string) {
        alert(msg)
    }
}

export const VideoPlayer = new Player()
