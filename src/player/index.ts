import {PlayerExtensions} from './types'
import {MP4Player} from './mp4'
import {HLSPlayer} from './hls'
import {DASHPlayer} from './dash'

const sources = {
    [PlayerExtensions.MP4]: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
    [PlayerExtensions.HLS]: 'https://storage.googleapis.com/shaka-demo-assets/bbb-dark-truths-hls/hls.m3u8',
    [PlayerExtensions.DASH]: 'https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd',
}

class Player {
    MP4Player: MP4Player | null = null
    HLSPlayer: HLSPlayer | null = null
    DASHPlayer: DASHPlayer | null = null

    load(extension: PlayerExtensions) {
        if (this.MP4Player) this.MP4Player.destroy()
        if (this.HLSPlayer) this.HLSPlayer.destroy()
        if (this.DASHPlayer) this.DASHPlayer.destroy()

        switch (extension) {
            case PlayerExtensions.MP4: {
                this.MP4Player = new MP4Player(sources[extension])
                this.MP4Player.load()
                break
            }
            case PlayerExtensions.HLS: {
                this.HLSPlayer = new HLSPlayer(sources[extension])
                this.HLSPlayer.load()
                break
            }
            case PlayerExtensions.DASH: {
                this.DASHPlayer = new DASHPlayer(sources[extension])
                this.DASHPlayer.load()
                break
            }
        }
    }
}

export const VideoPlayer = new Player()
