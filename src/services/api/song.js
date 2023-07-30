import axios from 'axios'
import {get } from '../request/index'
// const instance = axios.create({
//     baseURL: 'https://service-f23fl8wz-1318570863.bj.apigw.tencentcs.com/release',
//     timeout: 5000
// })
//85680488


export function getSongDetail(id) {

    return get(`/song/detail?ids=${id}`)

}

export function getSongUrl(id) {

    return get(`/song/url?id=${id}&br=320000`)

}

export function getSongLyric(id) {


    return get(`/lyric?id=${id}`)

}