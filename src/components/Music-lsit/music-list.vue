<template>
<div class="music-list">
    <div
    class="back"
    @click="goBack"
    >
    <i class="icon-back"></i>
    </div>
    <h1 class="title">{{ title }}</h1>
    <div
    class="bg-image"
    :style="bgImageStyle"
    ref="bgImage"
    >
    <div
        class="play-btn-wrapper"
        :style="playBtnStyle"
      >
        <div
          v-show="songs.length > 0"
          class="play-btn"
        >
          <i class="icon-play"></i>
          <span class="text" @click="onRandom">随机播放全部</span>
        </div>
      </div>
    <div
        class="filter"
        :style="filterStyle"
    ></div>
    </div>
    <scroll
    class="list"
    :style="scrollTopStyle"
    @bScroll="onScroll"
    :probe-type="3"
    ref="scrollRef"
    >
    <div class="song-list-wrapper">
        <song-list
        :songs="currentSongs"
        @selectItem="onSelectItem"
        :rank="rank"
        ></song-list>
    </div>
    </scroll>
</div>
</template>

<script setup>
import Scroll from '@/components/Scroll/Scroll.vue'
import songList from '@/components/song-list/song-list'

import { computed, onMounted, ref, toRefs,watch } from 'vue';
import { useRouter } from 'vue-router';

import useShowCpnsStore from '@/store/modules/showComonents'
import usePlayerStore from '@/store/modules/player';
import useGetSongData from '@/hooks/useGetSongData';
import useSearchHistory from '@/hooks/use-search-history';
        const RESERVED_HEIGHT = 40
        let bgImageHeight = ref(0);
        let isTop = false;
        let scrollY = ref(0);
        let maxTranslateY = ref(0);
        const props = defineProps({
          songs: {
            type: Array,
            default: () => []
          },
          title: String,
          pic: String,
          loading: Boolean,
          rank: Boolean
        })
        const bgImage = ref(null);
        const { songs } = toRefs(props);
        const router = useRouter();
        const showCpnsStore = useShowCpnsStore();
        const playerStore = usePlayerStore();
        const currentSongs = ref([]);

        const noResult = computed(() => {
            // return true;
            return !props.loading && !props.songs.length;
        })
        const bgImageStyle = computed(() => {
            let scale = 1;
            // const scrollY = scroll;
            let translateZ = 0; // ios适配
            let zIndex = 0;
            let paddingTop = '70%';
            let height = 0;

            if (scrollY.value > maxTranslateY.value) {
                zIndex = 10;
                paddingTop = 0;
                height = `${RESERVED_HEIGHT}px`;
                translateZ = 1;
            }

            if(scrollY.value < 0){
                scale = 1 + Math.abs(scrollY.value) / bgImageHeight.value;
                translateZ = 1;
            }
            return {
                zIndex,
                paddingTop,
                height,
                backgroundImage: `url(${props.pic})`,
                transform: `scale(${scale}) translateZ(${translateZ}px)`
            }
        })
        const playBtnStyle = computed(() => {
            let display = ''
            if(scrollY.value > maxTranslateY.value){
                return {
                    display: 'none'
                }
            }
            else {
                return {
                    display
                }
            }
        })
        const scrollTopStyle = computed(() => {
            return {
                top: `${bgImageHeight.value}px`
            }
        })
        const filterStyle = computed(() => {
            let blur = 0;
            // const bgImageHeight = bgImageHeight;
            // const scrollY = this.scrollY;
            
            if(scrollY.value >= 0){
                blur = Math.min(maxTranslateY.value / bgImageHeight.value, scrollY.value / bgImageHeight.value) * 20;
            }
            return {
                backdropFilter: `blur(${blur}px)`
            }
        })


        const { getSongData } = useGetSongData()
        const { savePlay } = useSearchHistory()


        onMounted(() => {
            // console.log('bgImage.value',bgImage.value.clientHeight)
            bgImageHeight.value = bgImage.value.clientHeight;
            maxTranslateY.value = bgImageHeight.value - RESERVED_HEIGHT;
        })

        watch(songs, async () => {
            // let arr = [];
            const songsVal = songs.value;
            if(songsVal.length) {
                const arr = await Promise.all(songsVal.map(async (item) => {
                    return await getSongData(item.id);
                }));
                
                currentSongs.value = arr;
            }
            // console.log(arr)
            // songs.value = arr;
            
            // console.log(currentSongs.value);
            // console.log(songs.value)
          })



        function goBack() {
          showCpnsStore.setIsShowTab(true)  
          router.back()
        }
        function onScroll(pos) {
          scrollY.value = -pos.y
        }
        function onSelectItem({song, index}) {
            // console.log(index);
            playerStore.selectSongs({
                list: currentSongs.value, 
                index
            })
            savePlay(song)
            // console.log(playerStore.playlist)
        }
    function onRandom() {
        playerStore.randomPlay(currentSongs.value);
    }

</script>

<style lang="less" scoped>
.music-list {
    position: relative;
    height: 100%;
    .back {
    position: absolute;
    top: 0;
    left: 6px;
    z-index: 20;
    transform: translateZ(2px);
    .icon-back {
        display: block;
        padding: 10px;
        font-size: @font-size-large-x;
        color: @color-theme;
      }
    }
    .title {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 0;
        left: 10%;
        width: 80%;
        z-index: 20;
        transform: translateZ(2px);
        .no-wrap();
        text-align: center;
        line-height: 40px;
        font-size: @font-size-large;
        color: @color-text;
    
    }
    .bg-image {
    position: relative;
    width: 100%;
    height: 0;
    // padding-top: 70%;
    transform-origin: top;
    background-size: cover;
    z-index: 0;
    .play-btn-wrapper {
        position: absolute;
        bottom: 20px;
        z-index: 10;
        width: 100%;
        .play-btn {
        box-sizing: border-box;
        width: 135px;
        padding: 7px 0;
        margin: 0 auto;
        text-align: center;
        border: 1px solid @color-theme;
        color: @color-theme;
        border-radius: 100px;
        font-size: 0;
        }
        .icon-play {
        display: inline-block;
        vertical-align: middle;
        margin-right: 6px;
        font-size: @font-size-medium-x;
        }
        .text {
        display: inline-block;
        vertical-align: middle;
        font-size: @font-size-small;
        }
    }
    .filter {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(7, 17, 27, 0.4);
    }
    }
    .list {
    position: absolute;
    bottom: 0;
    width: 100%;
    z-index: 0;
    // overflow: hidden;
    .song-list-wrapper {
        padding: 20px 30px;
        background: @color-background;
      }
    }
}

.topFixed {
    padding-top: 0px !important;
    height: 40px !important;
    z-index: 10 !important;
}
</style>
<!-- 你提到的适配问题可能与 iOS 上的硬件加速有关。在某些情况下，图像或其他元素可能会在 iOS 设备上渲染得不清晰或存在闪烁问题。通过触发硬件加速，可以改善渲染性能和外观。

这里的解决方案是使用 translateZ(1px) 或类似的 3D 变换。这会使浏览器将元素提升到自己的合成层，并利用 GPU 进行渲染，从而提供更流畅的动画和更清晰的渲染。代码示例如下：

css
Copy code
.your-image-selector {
  transform: translateZ(1px);
}
请注意，不必滥用硬件加速，因为它可能会增加 GPU 的负担并消耗更多的电池。只有在遇到性能或渲染问题时才应该使用这种技巧。

此外，强制硬件加速可能会带来其他副作用和兼容性问题。因此，在使用此解决方案时，最好在多种设备和浏览器上进行广泛测试。 -->