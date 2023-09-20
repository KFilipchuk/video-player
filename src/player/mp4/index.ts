import {PlayerCore} from '../core'

export class MP4Player extends PlayerCore {
    src: string

    constructor(src: string) {
        super()
        this.src = src
    }

    setEvents() {
        super.setEvents()
        this.element.addEventListener('progress', this.onBufferingStart)
        this.element.addEventListener('suspend', this.onBufferingEnd)
    }

    removeEvents() {
        super.removeEvents()
        this.element.removeEventListener('progress', this.onBufferingStart)
        this.element.removeEventListener('suspend', this.onBufferingEnd)
    }

    load() {
        if (!super.canLoad(this.src)) return

        this.setEvents()

        this.element.src = this.src
        this.element.load()
    }

    destroy() {
        this.removeEvents()

        this.element.src = ''
    }
}
