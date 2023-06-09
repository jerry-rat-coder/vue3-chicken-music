import axios from 'axios'
import {get } from '../request/index'

const instance = axios.create({
    baseURL: 'https://music-backend-rho.vercel.app/wyy'
        // baseURL: 'http://localhost:3000/wyy'
})

export function getRecommend() {
    // return get('/getRecommend')
    return instance.get('/banner').then(res => res.data)
}
export function getAlbumList() {
    // return get('/personalized?limit=30')
    return instance.get('/personalized?limit=30').then(res => res.data)
}