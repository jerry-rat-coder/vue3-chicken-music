import { ref } from 'vue'
export default function useMiddleInteractive() {
    const currentShow = ref('cd');
    const currentView = ref('cd');

    const middleLStyle = ref(null);
    const middleRStyle = ref(null);
    const windowWidth = window.innerWidth;

    const touch = {};

    function onTouchMiddleStart(e) {
        touch.startX = e.touches[0].pageX;
        touch.startY = e.touches[0].pageY;

        touch.directionLocked = '';
    }

    function onTouchMiddleMove(e) {
        const currentViewVal = currentView.value;
        const deltaX = e.touches[0].pageX - touch.startX;
        const deltaY = e.touches[0].pageY - touch.startY;

        const absdeltaX = Math.abs(deltaX);
        const absdeltaY = Math.abs(deltaY);

        if (!touch.directionLocked) {
            touch.directionLocked = absdeltaX >= absdeltaY ? 'x' : 'y';
        }

        if (touch.directionLocked === 'y') return;

        const left = currentViewVal === 'cd' ? 0 : -windowWidth;
        // [-windowWidth, 0]
        const offset = Math.min(0, Math.max(left + deltaX, -windowWidth));
        const percent = Math.abs(offset / windowWidth);

        if (currentViewVal === 'cd') {
            currentShow.value = percent > 0.2 ? 'lyric' : 'cd';
        } else {
            currentShow.value = percent < 0.8 ? 'cd' : 'lyric';
        }

        middleLStyle.value = {
            opacity: 1 - percent
        }
        middleRStyle.value = {
            transform: `translateX(${offset}px)`
        }
    }

    function onTouchMiddleEnd() {
        // console.log('end')
        let offsetWidth = 0;
        let opacity = 0;
        const currentShowVal = currentShow.value;


        if (currentShowVal === 'lyric') {
            opacity = 0;
            offsetWidth = -windowWidth;
            currentView.value = 'lyric';
        } else {
            opacity = 1;
            offsetWidth = 0;
            currentView.value = 'cd';
        }

        const duration = 500;
        middleLStyle.value = {
            opacity,
            transitionDuration: `${duration}ms`
        }
        middleRStyle.value = {
            transform: `translateX(${offsetWidth}px)`,
            transitionDuration: `${duration}ms`
        }
    }
    return {
        currentShow,
        middleLStyle,
        middleRStyle,
        onTouchMiddleStart,
        onTouchMiddleMove,
        onTouchMiddleEnd
    }

}