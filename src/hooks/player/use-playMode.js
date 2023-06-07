import { computed } from "vue";
// import { useStore } from "vuex"
import usePlayerStore from '@/store/modules/player'
import { PLAY_MODE } from "@/utils/constant";
export default function usePlayMode() {
    //data
    const store = usePlayerStore();

    //computed
    const playMode = computed(() => {
        return store.playMode;
    })
    const playModeIcon = computed(() => {
        const playModeVal = playMode.value;
        return playModeVal === PLAY_MODE.sequence ? 'icon-sequence' :
            playModeVal === PLAY_MODE.random ? 'icon-random' : 'icon-loop'
    })
    const modeText = computed(() => {
        const playModeVal = playMode.value;
        return playModeVal === PLAY_MODE.sequence ? '顺序播放' :
            playModeVal === PLAY_MODE.random ? '随机播放' : '单曲循环'
    })


    //methods
    const toggleMode = () => {
        // let mode = store.state.playMode;
        // mode = (mode + 1) % 3;
        // store.dispatch('changeMode');
        store.changeMode();
    }
    return {
        playMode,
        playModeIcon,
        toggleMode,
        modeIcon: playModeIcon,
        modeText
    }
}