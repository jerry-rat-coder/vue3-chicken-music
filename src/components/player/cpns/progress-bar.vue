<template>
    <div class="progress-bar" 
    ref="progressBarRef" 
    @click="onClick">
        <div class="bar-inner">
            <div 
            class="progress" 
            :style="progressStyle"
            ref="progressRef"></div>
        <div 
        class="progress-btn-wrapper" 
        :style="progressBtnStyle"
        @touchstart="onTouchstart"
        @touchmove="onTouchmove"
        @touchend="onTouchend"
        >
            <div class="progress-btn"></div>
        </div>
    </div>
    </div>
</template>

<script setup>
import { computed, nextTick, ref, watch } from 'vue'
    const progressBtnWidth = 16;
    const props = defineProps({
        progress: {
            type: Number,
            default: 0
        }
    })
    const emits = defineEmits(['progressChanging', 'progressChanged']);
    const progressRef = ref(null);
    const progressBarRef = ref(null);
    const barWidth = ref(0);

    const offset = computed(() => {
        // console.log('offset', barWidth.value, props.progress)
            return barWidth.value * props.progress;
        })
    const progressStyle = computed(() => {
        return  `width: ${offset.value}px`;
    })
    const progressBtnStyle = computed(() => {
        return `transform: translateX(${offset.value}px)`;
    })

    watch(() => props.progress, async (newProgress) => {
        await nextTick();
        barWidth.value = progressBarRef.value.clientWidth - progressBtnWidth;
        // offset.value = barWidth * newProgress; // 0 -> 1
    })


    const touch = {};
    function onTouchstart(e) {
        // console.log(111)
        touch.x1 = e.touches[0].pageX;
        touch.beginWidth = progressRef.value.clientWidth;
    }
    function onTouchmove(e) {
        const delta = e.touches[0].pageX - touch.x1;
        const tempWidth = touch.beginWidth + delta;
        // const barWidth = progressBarRef.value.clientWidth - progressBtnWidth;
        const progress = Math.min(1, Math.max(0, tempWidth / barWidth.value));
        // offset.value = progress * barWidth;
        emits('progressChanging', progress);
    }
    function onTouchend(e) {
        // const barWidth = progressBarRef.value.clientWidth - progressBtnWidth;
        const newProgress = (progressRef.value.clientWidth / barWidth.value);
        emits('progressChanged', newProgress);
    }
    function onClick(e) {
        // console.log(e.offsetX - progressRef.value.clientWidth);
        const tempWidth = e.offsetX;
        const newProgress = Math.min(1, Math.max(0, tempWidth / barWidth.value));
        emits('progressChanged', newProgress);
    }
</script>
<style lang="less" scoped>
.progress-bar {
    height: 30px;
    .bar-inner {
      position: relative;
      top: 13px;
      height: 4px;
      background: rgba(0, 0, 0, 0.3);
      .progress {
        position: absolute;
        height: 100%;
        background: @color-theme;
      }
      .progress-btn-wrapper {
        // transform: translateX(20px);
        position: absolute;
        left: -8px;
        top: -13px;
        width: 30px;
        height: 30px;
        .progress-btn {
          position: relative;
          top: 7px;
          left: 7px;
          box-sizing: border-box;
          width: 16px;
          height: 16px;
          border: 3px solid @color-text;
          border-radius: 50%;
          background: @color-theme;
        }
      }
    }
  }
</style>