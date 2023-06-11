import { defineStore } from "pinia";
import shuffle from "@/utils/utils";
import { PLAY_MODE, FAVORITE_KEY, SEARCH_KEY, PLAY_KEY } from "@/utils/constant";
import { load } from "@/utils/array-store";
const usePlayerStore = defineStore('playerStore', {
    state: () => {
        return {
            // 音乐包 真实音乐队列 播放模式  播放状态 全屏模式 当前曲目
            sequenceList: [],
            playlist: [],
            playing: false,
            playMode: PLAY_MODE.sequence,
            currentIndex: 0,
            fullScreen: false,
            favoriteList: load(FAVORITE_KEY),
            searchHistory: load(SEARCH_KEY),
            playHistory: load(PLAY_KEY)
        }
    },
    getters: {
        currentSong: (state) => {
            return state.playlist[state.currentIndex] || {};
        },
        viewStyle: (state) => {
            const bottom = state.playlist.length ? '60px' : '0'
            return {
                bottom
            }
        }
    },
    actions: {
        setPlayingState(playing) {
            this.playing = playing
        },
        setSequenceList(list) {
            this.sequenceList = list
        },
        setPlaylist(list) {
            this.playlist = list
        },
        setPlayMode(mode) {
            this.playMode = mode
        },
        setCurrentIndex(index) {
            this.currentIndex = index
        },
        setFullScreen(fullScreen) {
            this.fullScreen = fullScreen
        },
        setFavoriteList(favoriteList) {
            this.favoriteList = favoriteList
        },
        setLyric(lyric) {
            this.playlist[this.currentIndex].lyric = lyric
        },
        setSearchHistory(searches) {
            this.searchHistory = searches
        },
        setPlayHistory(songs) {
            this.playHistory = songs
        },
        selectSongs({ list, index }) {
            console.log('store', index)
            this.setPlayMode(PLAY_MODE.sequence);
            this.setSequenceList(list);
            this.setPlayingState(true);
            this.setFullScreen(true);
            this.setPlaylist(list);
            this.setCurrentIndex(index);
        },
        randomPlay(list) {
            this.playMode = PLAY_MODE.random;
            this.sequenceList = list;
            this.playing = true;
            this.fullScreen = true;
            this.playlist = shuffle(list);
            this.currentIndex = 0;
        },
        changeMode() {
            let mode = this.playMode;
            mode = (mode + 1) % 3;
            const currentId = this.currentSong.id;
            if (mode === PLAY_MODE.sequence) {
                this.playlist = this.sequenceList;
            } else if (mode === PLAY_MODE.random) {
                this.playlist = shuffle(this.sequenceList);
            } else {
                this.playlist = [this.currentSong];
            }
            const index = this.playlist.findIndex((song) => {
                return song.id === currentId;
            })
            this.currentIndex = index;
            this.playMode = mode;
        },
        removeSong(song) {
            const sequenceList = this.sequenceList.slice();
            const playlist = this.playlist.slice();

            const sequenceIndex = findIndex(sequenceList, song);
            const playIndex = findIndex(playlist, song);

            if (sequenceIndex < 0 || playIndex < 0) {
                return;
            }

            sequenceList.splice(sequenceIndex, 1);
            playlist.splice(playIndex, 1);

            let currentIndex = this.currentIndex;

            if (playIndex < currentIndex || currentIndex === playlist.length) {
                currentIndex--;
            }

            this.sequenceList = sequenceList;
            this.playlist = playlist;
            this.currentIndex = currentIndex;

            if (!sequenceList.length) {
                this.playing = false;
            }
        },
        confirmClear() {
            this.sequenceList = [];
            this.playlist = [];
            this.currentIndex = 0;
            this.playing = false;
        },
        addSong(song) {
            const playlist = this.playlist.slice();
            const sequenceList = this.sequenceList.slice();
            const playIndex = findIndex(playlist, song);
            const sequenceIndex = findIndex(sequenceList, song);
            let currentIndex = 0;

            if (playIndex !== -1) {
                currentIndex = playIndex;
            } else {
                playlist.push(song);
                currentIndex = playlist.length - 1;
            }

            if (sequenceIndex === -1) {
                sequenceList.push(song);
            }

            this.sequenceList = sequenceList;
            this.playlist = playlist;
            this.currentIndex = currentIndex;
            this.playing = true;
            this.fullScreen = true;
        }
    }
})

function findIndex(list, song) {
    return list.findIndex(item => {
        return item.id === song.id;
    })
}
export default usePlayerStore;