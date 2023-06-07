import {get } from '../request/index'



export function getSingerList() {
    return get('/top/artists?limit=100')
}

export function getSingerDetail(id) {
    return get(`/artist/songs?id=${id}&limit=100`)
}