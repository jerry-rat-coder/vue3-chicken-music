import axios from 'axios'
import {get } from '../request/index'

const instance = axios.create({
    baseURL: 'http://localhost:3000/wyy'
})

export function getRecommend() {
    // return get('/getRecommend')
    return instance.get('/banner')
}
export function getAlbumList() {
    return get('/personalized?limit=30')
}