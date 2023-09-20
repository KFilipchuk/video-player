export enum PlayerExtensions {
    MP4 = 'mp4',
    HLS = 'hls',
    DASH = 'dash',
}

export enum PlayerState {
    IDLE = 'idle',
    LOADING = 'loading',
    READY = 'ready',
    PLAYING = 'playing',
    PAUSED = 'paused',
    SEEKING = 'seeking',
    BUFFERING = 'buffering',
    ENDED = 'ended',
}
