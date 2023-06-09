import {get } from '../request/index'

const instance = axios.create({
    baseURL: 'https://music-backend-rho.vercel.app/wyy'
})

export function getSingerList() {
    // return get('/top/artists?limit=100')
    return instance.get('/top/artists')
}

export function getSingerDetail(id) {
    return get(`/artist/songs?id=${id}&limit=100`)
}