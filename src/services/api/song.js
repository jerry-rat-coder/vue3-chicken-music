import axios from 'axios'
import {get } from '../request/index'
// const instance = axios.create({
//     baseURL: 'https://service-f23fl8wz-1318570863.bj.apigw.tencentcs.com/release',
//     timeout: 5000
// })
const instance = axios.create({
    baseURL: 'https://music-backend-rho.vercel.app/wyy'
        // baseURL: 'http://localhost:3000/wyy'
})

export function getSongDetail(id) {

    return instance.get(`/song/detail?id=${id}`).then(res => res.data)

}

export function getSongUrl(id) {

    return instance.get(`/song/url?id=${id}&br=320000`).then(res => res.data)

}

export function getSongLyric(id) {

    return instance.get(`/lyric?id=${id}`).then(res => res.data)

}