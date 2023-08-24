import BScroll from "better-scroll";
import ObserveDOM from "@better-scroll/observe-dom";
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { throttle } from "@/utils/utils";
BScroll.use(ObserveDOM)
export default function useScroll(wrapperRef, options, emit) {
    const scroll = ref(null);


    onMounted(() => {
        scroll.value = new BScroll(wrapperRef.value, {
            observeDOM: true,
            ...options
        });

        if (options.probeType > 0) {
            scroll.value.on('scroll', throttle((pos) => {
                emit('bScroll', pos)
            }, 50))
        }
    })
    onUnmounted(() => {
        scroll.value.destroy();
    })
    return scroll;
}