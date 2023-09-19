import {VideoPlayer} from './player'
import {PlayerExtensions} from './player/types'

const selectElement = document.getElementById('select')

selectElement?.addEventListener('change', (e: Event) => {
    const target = e.target as HTMLSelectElement

    VideoPlayer.load(target.value as PlayerExtensions)
})

VideoPlayer.load(PlayerExtensions.MP4)
