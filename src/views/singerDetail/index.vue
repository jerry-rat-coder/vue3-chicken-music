<template>
  <div class="singer-detail">
    <!-- <h1>singer-detail</h1> -->
    <music-list
    :title="computedData.name"
    :pic="computedData.avatar"
    :songs="songs"
    :loading="loading"
    ></music-list>
  </div>
</template>

<script setup>
import musicList from '@/components/Music-lsit/music-list.vue';
import { getSingerDetail } from '@/services/api/singer';
import { SINGER_KEY } from '@/utils/constant'
import createDetailComponent from '@/hooks/create-detail-like-comp';


const props = defineProps({
      data: {
          type: Object,
          default: () => ({})
      }
})
const { songs, computedData, loading } = createDetailComponent(props.data, SINGER_KEY, getSingerDetail);





  
</script>

<style lang="less" scoped>
  .singer-detail {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: @color-background;
  }
</style>
