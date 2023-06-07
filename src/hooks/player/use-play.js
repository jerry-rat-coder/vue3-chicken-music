import { ref, computed, watch } from 'vue'
// import { useStore } from 'vuex'
import usePlayerStore from '@/store/modules/player'
import { PLAY_MODE } from '@/utils/constant'
export default function usePlay({ songReady, playing }) {
    //data 
    // const fullScreen = ref(true)
    const audioRef = ref(null)
    const store = usePlayerStore();


    //vuex store
    // const store = useStore();
    const currentSong = computed(() => {
        // console.log('asdasdada', store.currentSong)
        return store.currentSong;
    })
    const currentIndex = computed(() => {
        // console.log('asdasdada', store.currentIndex)
        return store.currentIndex;
    })
    const playlist = computed(() => {
        return store.playlist;
    })

    //computed
    const playIcon = computed(() => {
        return playing.value ? 'icon-pause' : 'icon-play';
    })
    const disableCls = computed(() => {
        return songReady.value ? '' : 'disable';
    })
    const fullScreen = computed(() => {
        return store.fullScreen;
    })

    //watch
    watch(currentSong, (newSong) => {
        // console.log(newSong)
        // console.log(audioRef.value)
        if (!newSong.songUrl) return;
        // params.currentTime.value = 0;
        songReady.value = false;
        const audioVal = audioRef.value;
        // console.log(newSong.songUrl)
        audioVal.src = newSong.songUrl;
        songReady.value = true
        audioVal.play();
        store.setPlayingState(true);
    })
    watch(playing, (newPlaying) => {
        if (!songReady.value) {
            return;
        }
        const audioVal = audioRef.value;
        if (newPlaying) audioVal.play();
        else audioVal.pause();
    })




    //methods
    const miniMode = () => {
        store.setFullScreen(false)
    }
    const onPause = () => {
        store.setPlayingState(false)
    }
    const onTogglePlaying = () => {
        if (!songReady.value || !playlist.value.length) {
            return;
        }


        // store.commit('setPlayingState', !store.state.playing);
        store.setPlayingState(!store.playing)
    }

    const onNext = () => {
        if (!songReady.value || !playlist.value.length) {
            return;
        }

        if (playlist.value.length === 1) {
            onLoop();
            return;
        }

        const index = currentIndex.value;
        const len = store.playlist.length;
        const next = (index + 1) % len;
        const audioVal = audioRef.value;
        // store.commit('setCurrentIndex', next);
        store.setCurrentIndex(next);
        // if (!playing.value) {
        //     store.commit('setPlayingState', true);
        // }c
        audioVal.currentTime = 0;
    }
    const onPrev = () => {
        if (!songReady.value || !playlist.value.length) {
            return;
        }
        if (playlist.value.length === 1) {
            onLoop();
            return;
        }
        const index = currentIndex.value;
        const len = store.playlist.length;
        const next = (index - 1 + len) % len;
        const audioVal = audioRef.value;
        // store.commit('setCurrentIndex', next);
        store.setCurrentIndex(next);
        // if (!playing.value) {
        //     store.commit('setPlayingState', true);
        // }
        audioVal.currentTime = 0;
    }
    const onLoop = () => {
        const audioVal = audioRef.value;
        if (!playing.value) {
            // store.commit('setPlayingState', true);
            store.setPlayingState(true);
        }
        audioVal.currentTime = 0;
    }
    const onReady = () => {
        // console.log('onReady')
        if (songReady.value) return;
        songReady.value = true;
    }
    const onError = () => {
        songReady.value = true;
    }
    const onEnd = () => {
        onNext();
    }
    return {
        fullScreen,
        audioRef,
        songReady,
        currentSong,
        playing,
        currentIndex,
        playlist,
        playIcon,
        disableCls,
        miniMode,
        onError,
        onLoop,
        onNext,
        onPause,
        onPrev,
        onReady,
        onTogglePlaying,
        onEnd
    }
}