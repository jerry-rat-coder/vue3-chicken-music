<template>
    <div
      class="player"
      v-show="playlist.length"
    >
    <!-- <h1>Player</h1> -->
     <template v-if="currentSong">
      <transition
        name="normal"
        @enter="enter"
        @after-enter="afterEnter"
        @leave="leave"
        @after-leave="afterLeave"
      >
        <div
          class="normal-player"
          v-show="fullScreen"
        >
          <div class="background">
            <template v-if="currentSong.al">
             <img :src="currentSong.al.picUrl">
            </template>
          </div>
          <div class="top">
            <div
              class="back"
              @click="miniMode"
            >
              <i class="icon-back"></i>
            </div>
            <h1 class="title">{{currentSong.name}}</h1>
            <template v-if="currentSong.singer">
              <h2 class="subtitle">{{currentSong.singer[0].name}}</h2>
            </template>
          </div>
          <div
            class="middle"
            @touchstart.prevent="onTouchMiddleStart"
            @touchmove.prevent="onTouchMiddleMove"
            @touchend.prevent="onTouchMiddleEnd"
          >
            <div
              class="middle-l"
              :style="middleLStyle"
            >
              <div
                ref="cdWrapperRef"
                class="cd-wrapper"
              >
                <div
                  ref="cdRef"
                  class="cd"
                >
                  <template v-if="currentSong.al">
                    <img
                    ref="cdImgRef"
                    class="image"
                    :class="cdCls"
                    :src="currentSong.al.picUrl" />
                  </template>
                </div>
              </div>
            </div>
            
            <scroll 
              class="middle-r"
              ref="lyricScrollRef"
              :style="middleRStyle"
              >
              <div 
              class="lyric-wrapper"
              >
                <div 
                v-if="currentLyric"
                ref="lyricListRef"
                >
                  <p
                  class="text"
                  v-for="(line, index) in currentLyric.lines"
                  :key="line.num"
                  :class="{'current': currentLyricLineNum === index}"
                  >
                  {{ line.txt }}
                </p>
                </div>
                <div class="pure-music">
                  <p>{{ pureMusicLyric }}</p>
                </div>
              </div>
              </scroll>
          </div>
          <div class="bottom">
            <div class="dot-wrapper">
              <span class="dot" :class="{'active':currentShow==='cd'}"></span>
              <span class="dot" :class="{'active':currentShow==='lyric'}"></span>
            </div>
            <div class="progress-wrapper">
              <span class="time time-l">{{formatTime(currentTime)}}</span>
              <div class="progress-bar-wrapper">
                <progress-bar
                  ref="barRef"
                  :progress="progress"
                  @progress-changing="onProgressChanging"
                  @progress-changed="onProgressChanged"
                ></progress-bar>
              </div>
              <span class="time time-r">{{ currentSong.time }}</span>
            </div>
            <div class="operators">
              <div class="icon i-left">
                <i @click="toggleMode" :class="playModeIcon"></i>
              </div>
              <div class="icon i-left" :class="disableCls">
                <i @click="onPrev" class="icon-prev"></i>
              </div>
              <div class="icon i-center" :class="disableCls">
                <i @click="onTogglePlaying" :class="playIcon"></i>
              </div>
              <div class="icon i-right" :class="disableCls">
                <i @click="onNext" class="icon-next"></i>
              </div>
              <div class="icon i-right">
                <i @click="toggleFavor(currentSong)" :class="getFavoriteIconBySong(currentSong)"></i>
              </div>
            </div>
          </div>
        </div>
      </transition>
      <mini-player
        :progress="progress"
        ></mini-player>
     </template>
     <audio
        ref="audioRef"
        @pause="onPause"
        @canplay="onReady"
        @error="onError"
        @timeupdate="updateTime"
        @ended="onEnd"
        ></audio>
    </div>
</template>
<script setup>
import scroll from '@/components/Scroll/Scroll'
import progressBar from './cpns/progress-bar.vue'
import miniPlayer from './cpns/mini-player.vue'

import { ref,computed,watch } from 'vue'
// import { useStore } from 'vuex'
import usePlayerStore from '@/store/modules/player'

import usePlay from '@/hooks/player/use-play'
import usePlayMode from '@/hooks/player/use-playMode'
import useFavorite from '@/hooks/player/use-favorite'
import useCd from '@/hooks/player/use-cd'
import useLyric from '@/hooks/player/use-lyric'
import useMiddleInteractive from '@/hooks/player/useMiddleInteractive'
import useAnimation from '@/hooks/player/use-animation'
// import miniPlayer from './cpns/mini-player.vue'
import { formatTime } from '@/utils/utils'


const store = usePlayerStore();
const currentTime = ref(0);
const songReady = ref(false)
const playlist = computed(() => {
  // console.log(store.playlist)
  return store.playlist;
})
const currentSong = computed(() => {
  return store.currentSong;
})
const duration = computed(() => {
  if(!currentSong.value || !currentSong.value.time)return;
  const tim = currentSong.value.time;
  // console.log(tim.slice(0, 2))
  const mm = parseInt(tim.slice(0, 2));
  const ss = parseInt(tim.slice(3, 5));
  return mm * 60 + ss;
})
const progress = computed(() => {
  // console.log(currentTime.value )
  return currentTime.value / duration.value;
})
const playing = computed(() => {
        return store.playing;
})
//vuex store

//hooks
const { fullScreen,audioRef, currentIndex, playIcon,disableCls,miniMode,onError,onLoop,onNext,onPause,onPrev,onReady,onTogglePlaying,onEnd } = usePlay({ songReady, playing });

const { playMode, playModeIcon, toggleMode } = usePlayMode();

const { getFavoriteIconBySong, toggleFavor  } = useFavorite();

const { cdRef, cdImgRef ,cdCls } = useCd();

const { currentLyric, currentLyricLineNum, pureMusicLyric, playLyric, playingLyric, stopLyric, lyricScrollRef, lyricListRef } = useLyric({ songReady ,currentTime, playing });

const { currentShow, middleLStyle, middleRStyle, onTouchMiddleStart, onTouchMiddleMove, onTouchMiddleEnd } = useMiddleInteractive();


const { cdWrapperRef, enter, afterEnter, leave, afterLeave  } = useAnimation();

// //标记是否正在拖动 修复拖动自动复原bug
let isProgressChanging = false; 

// watch(currentSong, () => {
//   console.log(currentIndex.value)
// })
// //watch
// // watch(progress, (newProgress) => {
// //   console.log(newProgress)
// // })


// //播放自动修改时间
const updateTime = (e) => {
  if(isProgressChanging)return;
  currentTime.value = e.target.currentTime;
}

const onProgressChanging = (newProgress) => {
  isProgressChanging = true;
  currentTime.value = newProgress * duration.value;
  playLyric();
  stopLyric();
}

const onProgressChanged = (newProgress) => {
  isProgressChanging = false;

  currentTime.value = newProgress * duration.value;
  audioRef.value.currentTime = currentTime.value;
  // console.log(currentTime.value)

  playLyric();
}


</script>

<style lang="less" scoped>
  .player {
    .normal-player {
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: 180;
      background: @color-background;
      .background {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        opacity: 0.6;
        filter: blur(20px);

        img {
          width: 100%;
          height: 100%;
        }
      }
      .top {
        position: relative;
        margin-bottom: 25px;
        .back {
          position: absolute;
          top: 0;
          left: 6px;
          z-index: 50;
        }
        .icon-back {
          display: block;
          padding: 9px;
          font-size: @font-size-large-x;
          color: @color-theme;
          transform: rotate(-90deg);
        }
        .title {
          width: 70%;
          margin: 0 auto;
          line-height: 40px;
          text-align: center;
          .no-wrap();
          font-size: @font-size-large;
          color: @color-text;
        }
        .subtitle {
          line-height: 20px;
          text-align: center;
          font-size: @font-size-medium;
          color: @color-text;
        }
      }
      .middle {
        position: fixed;
        width: 100%;
        top: 80px;
        bottom: 170px;
        white-space: nowrap;
        font-size: 0;
        .middle-l {
          display: inline-block;
          vertical-align: top;
          position: relative;
          width: 100%;
          height: 0;
          padding-top: 80%;
          .cd-wrapper {
            position: absolute;
            left: 10%;
            top: 0;
            width: 80%;
            box-sizing: border-box;
            height: 100%;
            .cd {
              width: 100%;
              height: 100%;
              border-radius: 50%;
              img {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                box-sizing: border-box;
                border-radius: 50%;
                border: 10px solid rgba(255, 255, 255, 0.1);
              }
              .playing {
                animation: rotate 20s linear infinite
              }
            }
          }
          .playing-lyric-wrapper {
            width: 80%;
            margin: 30px auto 0 auto;
            overflow: hidden;
            text-align: center;
            .playing-lyric {
              height: 20px;
              line-height: 20px;
              font-size: @font-size-medium;
              color: @color-text-l;
            }
          }
        }
        .middle-r {
          display: inline-block;
          vertical-align: top;
          width: 100%;
          height: 100%;
          overflow: hidden;
          .lyric-wrapper {
            width: 80%;
            margin: 0 auto;
            overflow: hidden;
            text-align: center;
            .text {
              line-height: 32px;
              color: @color-text-l;
              font-size: @font-size-medium;
              &.current {
                color: @color-text;
              }
            }
            // .text:nth-child(1) {
            //   padding-top: 30vh;
            // }
            .pure-music {
              padding-top: 50%;
              line-height: 32px;
              color: @color-text-l;
              font-size: @font-size-medium;
            }
          }
        }
      }
      .bottom {
        position: absolute;
        bottom: 50px;
        width: 100%;
        .dot-wrapper {
          text-align: center;
          font-size: 0;
          .dot {
            display: inline-block;
            vertical-align: middle;
            margin: 0 4px;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: @color-text-l;
            &.active {
              width: 20px;
              border-radius: 5px;
              background: @color-text-ll;
            }
          }
        }
        .progress-wrapper {
          display: flex;
          align-items: center;
          width: 80%;
          margin: 0px auto;
          padding: 10px 0;
          .time {
            color: @color-text;
            font-size: @font-size-small;
            flex: 0 0 40px;
            line-height: 30px;
            width: 40px;
            &.time-l {
              text-align: left;
            }
            &.time-r {
              text-align: right;
            }
          }
          .progress-bar-wrapper {
            flex: 1;
          }
        }
        .operators {
          display: flex;
          align-items: center;
          .icon {
            flex: 1;
            color: @color-theme;
            &.disable {
              color: @color-theme-d;
            }
            i {
              font-size: 30px;
            }
          }
          .i-left {
            text-align: right;
          }
          .i-center {
            padding: 0 20px;
            text-align: center;
            i {
              font-size: 40px;
            }
          }
          .i-right {
            text-align: left
          }
          .icon-favorite {
            color: @color-sub-theme;
          }
        }
      }
      &.normal-enter-active, &.normal-leave-active {
        transition: all .6s;
        .top, .bottom {
          transition: all .6s cubic-bezier(0.45, 0, 0.55, 1);
        }
      }
      &.normal-enter-from, &.normal-leave-to {
        opacity: 0;
        .top {
          transform: translate3d(0, -100px, 0);
        }
        .bottom {
          transform: translate3d(0, 100px, 0)
        }
      }
    }
  }
</style>
