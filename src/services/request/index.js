import axios from 'axios'
import { BASE_URL, TIMEOUT } from './config'
const ERR_OK = 0
    // const baseURL = 'https://music-backend-nu.vercel.app/api'
    // const baseURL = '/api'
axios.defaults.baseURL = BASE_URL
// axios.create({timeout: TIMEOUT, baseURL: BASE_URL})
export function get(url, params) {
    return axios.get(url, {
        params: {
            TIMEOUT,
            ...params
        }
    }).then((res) => {
        // console.log(res);
        const serverData = res.data
            // console.log(res);
            // if (serverData.code === ERR_OK) {
            //     return serverData.result
            // }
        return serverData;
    }).catch((e) => {
        console.log(e)
    })
}