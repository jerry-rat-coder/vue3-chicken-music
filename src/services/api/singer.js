import {get } from '../request/index'


export function getSingerList() {
    // return get('/top/artists?limit=100')
    return get('/top/artists?limit=100')
}

export function getSingerDetail(id) {
    console.log('傻逼singer id', id)
        // return get(`/artist/songs?id=${id}&limit=100`)
        //3684 林俊杰
    return get(`/artist/songs?id=${id}`)
}