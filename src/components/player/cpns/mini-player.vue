<template>
    <transition name="mini">
        <div 
        class="mini-player"
        v-show="!fullScreen"
        @click="showNormalPlayer"
        >
            <div class="cd-wrapper">
                <div 
                class="cd"
                ref="cdRef"
                >
                  <template v-if="currentSong.al">
                    <img 
                    :src="currentSong.al.picUrl" 
                    ref="cdImgRef"
                    width="40"
                    height="40"
                    :class="cdCls"
                    >
                  </template>
                </div>
            </div>
            <div 
            class="slider-wrapper"
            ref="sliderWrapperRef"
            >
              <div class="slider-group">
                <div 
                class="slider-page"
                v-for="song in playlist"
                :key="song.id"
                >
                  <h2 class="name">{{ song.name }}</h2>
                  <!-- <p class="desc">{{ song.singer }}</p> -->
                  <template v-if="song.singer">
                    <p class="desc">{{ song.singer[0].name }}</p>
                  </template>
                </div>
              </div>
            </div>
            <div class="control">
                <progress-circle
                :progress="props.progress"
                :radius="32"
                >
                <i 
                class="icon-mini"
                :class="miniPlayIcon"
                @click.stop="togglePlay"
                ></i>
                </progress-circle>
            </div>
            <div 
            class="control"
            @click.stop="showPlaylist"
            >
              <i class="icon-playlist"></i>
            </div>
            <now-playlist
            ref="nowPlaylistRef"
            ></now-playlist>
        </div>
    </transition>
</template>

<script setup>
// import { useStore } from "vuex";
import usePlayerStore from '@/store/modules/player'
// import useShowCpnsStore from '@/store/modules/showComonents'

import { computed, ref } from 'vue'


import nowPlaylist from './nowPlaylist.vue'

import useCd from '@/hooks/player/use-cd'
import progressCircle from './progress-circle.vue'
import useMiniSlider from '@/hooks/player/use-mini-slider'

const props = defineProps({
    progress: {
        type: Number,
        default: 0
    }
})

const store = usePlayerStore();
// const showCpnsStore = useShowCpnsStore();

const nowPlaylistRef = ref(null);

const currentSong = computed(() => {
    return store.currentSong;
})
const fullScreen = computed(() => {
    return store.fullScreen;
})
const playing = computed(() => {
    return store.playing;
})
const miniPlayIcon = computed(() => {
    return playing.value ? 'icon-pause-mini' : 'icon-play-mini'
})
const playlist = computed(() => {
    return store.playlist;
})


const { sliderWrapperRef } = useMiniSlider()

function showNormalPlayer() {
    // store.commit('setFullScreen', true);
    store.setFullScreen(true)
}
function togglePlay() {
    // store.commit('setPlayingState', !playing.value);4
    store.setPlayingState(!playing.value)
}
function showPlaylist() {
  // store.commit('setting/setShowNowPlayList', true);
  // showCpnsStore.set()
     nowPlaylistRef.value.show()
}

const { cdRef, cdImgRef, cdCls } = useCd();
</script>
<style lang="less" scoped>
  .mini-player {
    display: flex;
    align-items: center;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 180;
    width: 100%;
    height: 60px;
    background: @color-highlight-background;
    .cd-wrapper {
      flex: 0 0 2.2857rem;
      width: 2.2857rem;
      height: 2.2857rem;
      padding: 0 .5714rem 0 1.1429rem;
      .cd {
        height: 100%;
        width: 100%;
        img {
          border-radius: 50%;
          &.playing {
            animation: rotate 10s linear infinite;
          }
          &.pause {
            animation-play-state: paused;
          }
        }
      }
    }

    .slider-wrapper {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex: 1;
      line-height: 1.1429rem;
      overflow: hidden;
      .slider-group {
        position: relative;
        overflow: hidden;
        white-space: nowrap;
        .slider-page {
          display: inline-block;
          width: 100%;
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
          .name {
            margin-bottom: .1143rem;
            .no-wrap();
            font-size: @font-size-medium;
            color: @color-text;
          }
          .desc {
            .no-wrap();
            font-size: @font-size-small;
            color: @color-text-d;
          }
        }
      }
    }
    .control {
      flex: 0 0 30px;
      width: 1.7143rem;
      padding: 0 .5714rem;
      .icon-playlist {
        position: relative;
        top: -2px;
        font-size: 1.6rem;
        color: @color-theme-d;
      }
      .icon-mini {
        position: absolute;
        left: 0;
        top: 0;
        color: @color-theme-d;
        font-size: 1.8286rem;
      }
    }
    &.mini-enter-active, &.mini-leave-active {
      transition: all 0.6s cubic-bezier(0.45, 0, 0.55, 1);
    }
    &.mini-enter-from, &.mini-leave-to {
      opacity: 0;
      transform: translate3d(0, 100%, 0)
    }
  }
</style>
