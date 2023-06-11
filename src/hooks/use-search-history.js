import { save, remove, clear } from '@/utils/array-store'
import { SEARCH_KEY, PLAY_KEY } from '@/utils/constant'
// import { useStore } from 'vuex'
import usePlayerStore from '@/store/modules/player'

export default function useSearchHistory() {
    const maxLen = 200

    const store = usePlayerStore()

    function saveSearch(query) {
        const searches = save(query, SEARCH_KEY, (item) => {
                return item === query
            }, maxLen)
            // console.log('saveSearch', searches)
        store.setSearchHistory(searches)
            // store.commit('setSearchHistory', searches)
    }

    function savePlay(song) {
        const songs = save(song, PLAY_KEY, (item) => {
            return item.id === song.id
        }, maxLen)
        store.setPlayHistory(songs)
    }

    function deleteSearch(query) {
        const searches = remove(SEARCH_KEY, (item) => {
                return item === query
            })
            // store.commit('setSearchHistory', searches)
        store.setSearchHistory(searches)

    }

    function clearSearch() {
        const searches = clear(SEARCH_KEY)
            // store.commit('setSearchHistory', searches)
        store.setSearchHistory(searches)

    }

    return {
        saveSearch,
        deleteSearch,
        clearSearch,
        savePlay
    }
}