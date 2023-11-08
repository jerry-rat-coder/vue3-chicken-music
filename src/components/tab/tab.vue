<template>
    <div class="tab">
      <van-tabs v-model:active="currentName" ref="tabRef" >
          <template v-for="(item, key, index) in tabs" :key="index">
            <van-tab :title="item.name" :name="key" :to="item.path" ></van-tab>
          </template>
      </van-tabs>
    </div>
</template>
  
<script setup>
import { onMounted, ref, watch } from 'vue';
import {useRoute, useRouter} from 'vue-router'
        const tabs = ref([
            {
            name: '推荐',
            path: '/recommend'
            },
            {
            name: '歌手',
            path: '/singer'
            },
            {
            name: '排行',
            path: '/top-list'
            },
            {
            name: '搜索',
            path: '/search'
            }
        ])
        const tabRef = ref(null);
        const currentName = ref(0);
        const router = useRouter();
        const route = useRoute();
        watch(() => route.meta, () => {
          if(route.meta.id){
            // console.log(currentName.value)
            currentName.value = route.meta.id
          }
        })

</script>
<style lang="less" scoped>
.tab {
  width: 100%;
  position: relative;
  z-index: 9 !important;
  height:44px;
  line-height: 2.5143rem;
  font-size: @font-size-medium;
}
</style>
