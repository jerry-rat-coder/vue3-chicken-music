import { getSongLyric } from "@/services/api/song";
import { ref, computed, watch } from "vue";
import usePlayerStore from '@/store/modules/player'
import Lyric from 'lyric-parser'
export default function useLyric({ songReady, currentTime, playing }) {

    const store = usePlayerStore();
    const currentLyricLineNum = ref(0);
    const currentLyric = ref(null);
    const lyricListRef = ref(null);
    const lyricScrollRef = ref(null);
    //纯音乐
    const pureMusicLyric = ref('');
    const playingLyric = ref('');

    const currentSong = computed(() => {
        return store.currentSong;
    })

    watch(currentSong, async(newSong) => {
        if (!newSong.id || !newSong.songUrl) {
            return;
        }
        stopLyric();
        currentLyric.value = null;
        currentTime.value = 0;
        pureMusicLyric.value = '';
        playingLyric.value = '';
        // const id = newSong.id;

        const res = await getSongLyric(currentSong.value.id);
        const lyric = res.lrc.lyric;
        // console.log(lyric)
        store.setLyric(lyric);
        // console.log(Object.prototype.toString.call(lyric));
        // console.log(newSong.lyric === lyric)
        // if (newSong.lyric !== lyric) {
        //     return;
        // }
        currentLyric.value = new Lyric(lyric, handleLyric);
        // console.log(currentLyric.value)
        const hasLyric = currentLyric.value.lines.length;
        // console.log(hasLyric)
        if (hasLyric) {
            if (songReady.value) {
                // console.log('ready')
                playLyric();
            }
        } else {
            pureMusicLyric.value = lyric.slice(10);
        }
    })

    watch(songReady, (newSongReady) => {
        if (newSongReady) {
            stopLyric();
            playLyric();
        }
    })
    watch(playing, async(newPlaying) => {
        if (newPlaying) {
            playLyric();
        } else {
            stopLyric();
        }
    })

    function playLyric() {
        const currentLyricVal = currentLyric.value;
        // console.log('currentLyricVal', currentLyricVal);
        if (currentLyricVal) {
            currentLyricVal.seek(currentTime.value * 1000)
        }
    }

    function stopLyric() {
        const currentLyricVal = currentLyric.value;
        if (currentLyricVal) {
            currentLyricVal.stop();
        }
    }

    function handleLyric({ lineNum, txt }) {
        currentLyricLineNum.value = lineNum;
        const scrollComp = lyricScrollRef.value;
        const listEl = lyricListRef.value;
        playingLyric.value = txt;
        // console.log(listEl)
        if (!listEl) return;

        if (lineNum > 5) {
            const lineEl = listEl.children[lineNum - 5];
            scrollComp.scroll.scrollToElement(lineEl, 1000);
        } else {
            scrollComp.scroll.scrollTo(0, 0, 1000);
        }
    }
    return {
        currentLyric,
        currentLyricLineNum,
        pureMusicLyric,
        playingLyric,
        playLyric,
        stopLyric,
        lyricScrollRef,
        lyricListRef
    }
}