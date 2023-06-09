import {get } from '../request/index'
import axios from 'axios'
const instance = axios.create({
    baseURL: 'https://music-backend-rho.vercel.app/wyy'
        // baseURL: 'http://localhost:3000/wyy'
})

export function getSingerList() {
    // return get('/top/artists?limit=100')
    return instance.get('/top/artists?limit=100').then(res => {
        return res.data
    })
}

export function getSingerDetail(id) {
    console.log('id', id)
        // return get(`/artist/songs?id=${id}&limit=100`)
    return instance.get(`/artist/songs?id=${id}&limit=100`).then(res => {
        return res.data
    })
}