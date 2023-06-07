import { ref, computed, watch } from "vue";
// import { useStore } from "vuex";
import usePlayerStore from '@/store/modules/player'

export default function useCd() {
    const cdRef = ref(null);
    const cdImgRef = ref(null);

    const store = usePlayerStore();
    const playing = computed(() => {
        return store.playing;
    })

    const cdCls = computed(() => {
        return playing.value ? 'playing' : '';
    })

    watch(playing, (newPlaying) => {
        if (!newPlaying) {
            syncTransform(cdRef.value, cdImgRef.value);
        }
    })




    function syncTransform(wrapperEl, innerEl) {
        const wrapperTransform = getComputedStyle(wrapperEl).transform;
        const innerTransform = getComputedStyle(innerEl).transform;
        // console.log(innerEl, innerTransform)
        wrapperEl.style.transform = wrapperTransform === 'none' ? innerTransform : innerTransform.concat('', wrapperTransform);
    }
    return {
        cdRef,
        cdImgRef,
        cdCls
    }
}