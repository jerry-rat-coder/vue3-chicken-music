<template>
  <div class="album">
    <music-list
      :songs="songs"
      :title="computedData.name"
      :pic="computedData.picUrl"
      :loading="loading"
    ></music-list>
  </div>
</template>

<script setup>
import { getAlbum } from '@/services/api/disc';
import { ALBUM_KEY } from '@/utils/constant'
import musicList from '@/components/Music-lsit/music-list.vue';
import createDetailComponent from '@/hooks/create-detail-like-comp'
const props = defineProps({
      data: {
          type: Object,
          default: () => ({})
      }
})
const {computedData, loading, songs} = createDetailComponent(props.data, ALBUM_KEY, getAlbum)
// export default createDetailComponent('album', ALBUM_KEY, getAlbum)

</script>

<style lang="less" scoped>
  .album {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: @color-background;
  }
</style>
