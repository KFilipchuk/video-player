import {PlayerState} from '../types'

export class PlayerCore {
    src: string | null = null

    state: PlayerState = PlayerState.IDLE
    element: HTMLVideoElement = document.getElementById('video') as HTMLVideoElement

    bufferingTimestamp: number = 0

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

    onBufferingStart = () => {
        this.bufferingTimestamp = Date.now()
        this.state = PlayerState.BUFFERING
        console.log(this.state)
    }

    onBufferingEnd = () => {
        console.log(`Buffering execution time: ${Date.now() - this.bufferingTimestamp}ms`)
    }

    onEnded = () => {
        this.state = PlayerState.ENDED
        console.log(this.state)
    }

    setEvents() {
        this.element.addEventListener('loadstart', this.onLoading)
        this.element.addEventListener('canplay', this.onReady)
        this.element.addEventListener('playing', this.onPlaying)
        this.element.addEventListener('pause', this.onPause)
        this.element.addEventListener('seeking', this.onSeeking)
        this.element.addEventListener('ended', this.onEnded)
    }

    removeEvents() {
        this.element.removeEventListener('loadstart', this.onLoading)
        this.element.removeEventListener('canplay', this.onReady)
        this.element.removeEventListener('playing', this.onPlaying)
        this.element.removeEventListener('pause', this.onPause)
        this.element.removeEventListener('seeking', this.onSeeking)
        this.element.removeEventListener('ended', this.onEnded)
    }

    canLoad(src: string) {
        if (!this.element) {
            this.error('Video tag is not found')
            return false
        }

        if (!src) {
            this.error('Source is empty')
            return false
        }

        return true
    }

    error(msg: string) {
        alert(msg)
    }
}
