<template>
    <!-- <h2>song-list</h2> -->
<ul class="song-list">
    <!-- <p>{{ songs }}</p> -->
    <li
    class="item"
    v-for="(song, index) in songs"
    :key="song.id"
    @click="selectItem(song, index)"
    >
    <div class="rank" v-if="rank">
        <span :class="getRankCls(index)">{{ getRankText(index) }}</span>
    </div>
    <div class="content" >
        <h2 class="name">{{song.name}}</h2>
        <p class="desc">{{getDesc(song)}}</p>
    </div>
    </li>
</ul>

</template>

<script setup>
import { ref,toRefs,watch } from 'vue';
// import { getSongDetail, getSongUrl, getSongLyric } from '@/services/api/song'
    const props = defineProps({
            songs: {
                type: Array,
                default() {
                return []
                }
            },
            rank: {
                type: Boolean,
                default: false
            }
        })
    const currentSongs = ref([]);
    const { songs } = toRefs(props);
    




    const emit = defineEmits(['selectItem']);
    function getDesc(song) {
        // console.log(song);
        // return 'yys'
        // return `${song.al.name} · ${song.ar[0].name}`
        let songers = [];
        for (let i = 0; i < song.singer.length; i++) {
            songers.push(song.singer[i].name);
        }
    //   // console.log(songers);
        return `${songers.join(",")} ∘ ${song.al.name}`;
    }
    function selectItem(song, index) {
        console.log(song, index)
        emit('selectItem', { song, index });
    }

    const getRankCls = (index) => {
      if(index <= 2){
      return `icon icon${index}`; 
      }else {
        return 'text';
      }
    }

    const getRankText = (index) => {
      if(index > 2){
        return index + 1;
      }
    }

</script>

<style lang="less" scoped>
.song-list {
    .item {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    height: 64px;
    font-size: @font-size-medium;
    .rank {
        flex: 0 0 25px;
        width: 25px;
        margin-right: 20px;
        text-align: center;
        .icon {
        display: inline-block;
        width: 25px;
        height: 24px;
        background-size: 25px 24px;
        &.icon0 {
            .bg-image('./img/first');
        }
        &.icon1 {
            .bg-image('./img/second');
        }
        &.icon2 {
            .bg-image('./img/third');
        }
        }
        .text {
        color: @color-theme;
        font-size: @font-size-large;
        }
    }
    .content {
        flex: 1;
        line-height: 20px;
        overflow: hidden;
        .name {
        .no-wrap();
        color: @color-text
        }
        .desc {
        .no-wrap();
        margin-top: 4px;
        color: @color-text-d;
        }
    }
    }
}
</style>
