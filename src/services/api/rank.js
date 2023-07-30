import axios from "axios"
import {get } from "../request/index"

const qq = axios.create({
    baseURL: 'https://music-backend-peach.vercel.app/',
    timeout: 5000
})

export function getTopList() {
    return get(`/toplist/detail`)
}

export function getImg() {
    return qq.get('/api/getTopList').then(res => {
        const toplist = res.data.result.topList
            // console.log(toplist)
        return toplist.map(item => {
            return item.pic
        })
        return [0]
    })
}