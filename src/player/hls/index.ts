import Hls from 'hls.js'
import {PlayerCore} from '../core'

export class HLSPlayer extends PlayerCore {
    src: string
    player: Hls | null = null

    constructor(src: string) {
        super()
        this.src = src
    }

    setEvents() {
        super.setEvents()
        this.player?.on(Hls.Events.BUFFER_APPENDING, this.onBufferingStart)
        this.player?.on(Hls.Events.BUFFER_APPENDED, this.onBufferingEnd)
    }

    removeEvents() {
        super.removeEvents()
        this.player?.off(Hls.Events.BUFFER_APPENDING, this.onBufferingStart)
        this.player?.off(Hls.Events.BUFFER_APPENDED, this.onBufferingEnd)
    }

    load() {
        if (!super.canLoad(this.src)) return

        if (Hls.isSupported()) {
            this.player = new Hls()

            this.setEvents()

            this.player.loadSource(this.src)
            this.player.attachMedia(this.element)
        } else {
            this.error('HLS is not supported')
        }
        return
    }

    destroy() {
        this.removeEvents()

        this.player?.destroy()
        this.player = null
    }
}
