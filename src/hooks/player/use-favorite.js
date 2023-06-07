import { computed } from 'vue'
// import { useStore } from 'vuex'
import usePlayerStore from '@/store/modules/player'
import { FAVORITE_KEY } from '@/utils/constant';
import { save, remove } from '@/utils/array-store';
export default function useFavorite() {
    const store = usePlayerStore();
    const favoriteList = computed(() => {
        return store.favoriteList;
    })
    const currentSong = computed(() => {
        return store.currentSong;
    })
    const getFavoriteIcon = computed(() => {
        return isFavor(currentSong.value) ? 'icon-favorite' : 'icon-not-favorite';
    })
    const toggleFavor = (song) => {
        let list;
        // console.log('store.state.favoriteList', favoriteList.value)
        if (isFavor(song)) {
            // remove
            list = remove(FAVORITE_KEY, compare);
        } else {
            // add
            list = save(song, FAVORITE_KEY, compare, 100);
        }
        // store.commit('setFavoriteList', list)
        store.setFavoriteList(list)


        function compare(item) {
            return song.id === item.id;
        }
    }
    const getFavoriteIconBySong = (song) => {
        return isFavor(song) ? 'icon-favorite' : 'icon-not-favorite';
    }

    const isFavor = (song) => {
        return store.favoriteList.findIndex((item) => {
            return item.id === song.id;
        }) !== -1;
    }
    return {
        getFavoriteIcon,
        toggleFavor,
        toggleFavorite: toggleFavor,
        getFavoriteIconBySong
    }
}