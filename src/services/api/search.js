import {get } from "../request/index"

export function getHotKeys() {

    return get(`/search/hot`)

}

export function getSuggest(query, offset) {

    return get(`/cloudsearch?keywords=${query}&offset=${offset}`)

}