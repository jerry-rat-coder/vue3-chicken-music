import { ref, onMounted, onUnmounted } from "vue";

export default function useReachBottom(callback) {
    const isReachBottom = ref(false);

    function handleScrollListener() {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;
        if (scrollHeight <= clientHeight + scrollTop) {
            console.log("滚动到底部");
            isReachBottom.value = true;
            callback();
        } else {
            isReachBottom.value = false;
        }
    }

    onMounted(() => {
        window.addEventListener("scroll", handleScrollListener);
    });
    onUnmounted(() => {
        window.removeEventListener("scroll", handleScrollListener);
    });

    return isReachBottom;
}