import {get } from '../request/index'

export function getRecommend() {
    // return get('/getRecommend')
    return get('/banner')
}
export function getAlbumList() {
    return get('/personalized?limit=30')
}