import { ref } from "vue";
import animations from 'create-keyframe-animation'
export default function useAnimation() {
    const cdWrapperRef = ref(null);
    const rem = window.innerWidth / 20;
    let leaving = false;
    let entering = false;

    function enter(el, done) {
        if (leaving) {
            afterLeave();
        }
        entering = true;
        const { x, y, scale } = getPosAndScale();
        // console.log(x * rem, y, scale, window.innerHeight)
        const animation = {
            0: {
                transform: `translate3d(${x}rem, ${y}px, 0) scale(${scale});`
            },
            100: {
                transform: `translate3d(0, 0, 0) scale(1);`
            }
        }

        animations.registerAnimation({
            name: 'moveEnter',
            animation,
            presets: {
                duration: 600,
                easing: 'cubic-bezier(0.45, 0, 0.55, 1)'
            }
        })

        animations.runAnimation(cdWrapperRef.value, 'moveEnter', done)
    }

    function afterEnter() {
        entering = false;
        animations.unregisterAnimation('moveEnter');
        cdWrapperRef.value.animation = '';
    }

    function leave(el, done) {
        if (entering) {
            afterEnter();
        }
        leaving = true;
        const { x, y, scale } = getPosAndScale();
        // console.log(x * rem, y, scale, window.innerHeight)
        const animation = {
            0: {
                transform: `translate3d(0, 0, 0) scale(1);`
            },
            100: {
                transform: `translate3d(${x}rem, ${y}px, 0) scale(${scale});`
            }
        }

        animations.registerAnimation({
            name: 'moveLeave',
            animation,
            presets: {
                duration: 600,
                easing: 'cubic-bezier(0.45, 0, 0.55, 1)'
            }
        })

        animations.runAnimation(cdWrapperRef.value, 'moveLeave', done)
    }

    function afterLeave() {
        leaving = false;
        animations.unregisterAnimation('moveLeave');
    }

    function getPosAndScale() {
        const targetWidth = 40 / rem;
        const width = window.innerWidth * 0.8 / rem;
        const paddingLeft = 40 / rem;
        const paddingBottom = 30;
        const paddingTop = 80;
        const y = window.innerHeight - (paddingTop + (width / 2) * rem + paddingBottom);
        const x = -(window.innerWidth / (2 * rem) - paddingLeft);
        const scale = targetWidth / width;
        return {
            x,
            y,
            scale
        }
    }

    return {
        cdWrapperRef,
        enter,
        afterEnter,
        leave,
        afterLeave
    }
}