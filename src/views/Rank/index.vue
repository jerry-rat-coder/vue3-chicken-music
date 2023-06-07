<template>
    <div class="top-detail">
        <music-list
        :songs="songs"
        :title="computedData.name"
        :pic="computedData.imgUrl"
        :loading="loading"
        :rank="true"
        ></music-list>
    </div>
</template>

<script setup>
import createDetailComponent from '@/hooks/create-detail-like-comp';
import { TOP_KEY } from '@/utils/constant';
import { getRank } from '@/services/api/disc';


const props = defineProps({
      data: {
          type: Object,
          default: () => ({})
      }
})

const {computedData, loading, songs} = createDetailComponent(props.data, TOP_KEY, getRank);

</script>
<style lang="less" scoped>
.top-detail {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 100;
    background: @color-background;
}
</style>