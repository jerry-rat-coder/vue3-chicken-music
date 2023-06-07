import {get } from '../request/index'

export function getDiscData(id) {

    ///playlist/detail?id=24381616
    return get(`/playlist/detail?id=${id}`)

}
export function getAlbum(id) {
    return getDiscData(id).then(res => {
        const playlist = res.playlist;
        return {
            songs: playlist.tracks
        }
    })
}

export function getRank(id) {
    return getDiscData(id).then(res => {
        const playlist = res.playlist;
        return {
            songs: playlist.tracks
        }
    })
}