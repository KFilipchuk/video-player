import {MediaPlayer, MediaPlayerClass} from 'dashjs'
import {PlayerCore} from '../core'

export class DASHPlayer extends PlayerCore {
    src: string
    player: MediaPlayerClass | null = null

    constructor(src: string) {
        super()
        this.src = src
    }

    setEvents() {
        super.setEvents()
        this.player?.on(MediaPlayer.events.FRAGMENT_LOADING_STARTED, this.onBufferingStart)
        this.player?.on(MediaPlayer.events.FRAGMENT_LOADING_COMPLETED, this.onBufferingEnd)
    }

    removeEvents() {
        super.removeEvents()
        this.player?.off(MediaPlayer.events.FRAGMENT_LOADING_STARTED, this.onBufferingStart)
        this.player?.off(MediaPlayer.events.FRAGMENT_LOADING_COMPLETED, this.onBufferingEnd)
    }

    load() {
        if (!super.canLoad(this.src)) return

        try {
            this.player = MediaPlayer().create()

            this.setEvents()

            this.player.initialize(this.element, this.src, false)
        } catch (e) {
            this.error('DASH is not supported')
        }
    }

    destroy() {
        this.removeEvents()

        this.player?.reset()
        this.player?.destroy()
        this.player = null
    }
}
