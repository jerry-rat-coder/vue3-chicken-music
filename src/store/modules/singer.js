import { defineStore } from "pinia"

const useSingerStore = defineStore('SingerStore', {
    state: () => {
        return {
            singer: {}
        }
    }
})
export default useSingerStore;