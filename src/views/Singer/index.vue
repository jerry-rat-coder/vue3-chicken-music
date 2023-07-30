<template>
    <div class="Singer">
        <index-list :singer-list="singerList" @select-singer="onSelectSinger"/> 
    </div>
    <router-view v-slot="{ Component }">
      <transition appear name="slide">
        <component :is="Component" :data="selectedSinger"></component>
      </transition>
    </router-view>
</template>

<script setup>
import indexList from "../../components/IndexList/index-list.vue";
import { getSingerDetail, getSingerList } from '@/services/api/singer'
import { computed, ref } from "vue";
import {pinyin} from 'pinyin-pro'
import { storeToRefs } from "pinia";
import storage from "good-storage";
import { SINGER_KEY } from "@/utils/constant";
import { useRouter } from "vue-router";
import useShowCpnsStore from "@/store/modules/showComonents";
    const HOT_NAME = '热门';
    const HOT_SINGER_LEN = 10;
    const singerList = ref([]);
    const router = useRouter();
    const showCpnsStore = useShowCpnsStore();
    const { isShowTab } = storeToRefs(showCpnsStore);
    const loading = ref(true);
    const selectedSinger = ref(null);


    getSingerList().then(res => {
      // console.log(res.artists);
      console.log(res.artists)
      initSingerList(res.artists);
    })


    function initSingerList(arr){
      for (let i = 0; i < arr.length; i++) {
        let tempIndex = pinyin(arr[i].name, {
          pattern: "first",
          toneType: "none",
          type: "array",
        });

        arr[i].findIndex = tempIndex[0].toUpperCase();
      }

      // console.log(arr);

      // this.singerList = arr;

      singerList.value = _normalizeSinger(arr)

      // console.log(this.singerList);
      
    }
    function _normalizeSinger(list) {
      let map = {
        hot: {
          title: HOT_NAME,
          items: [],
        },
      };

      list.forEach((item, index) => {
        //将 前十个数据作为热门歌手
        if (index < HOT_SINGER_LEN) {
          map.hot.items.push({
            name: item.name,
            id: item.id,
            findIndex: item.findIndex,
            avatar: item.picUrl,
          });
        }

        //将歌手做首字母分类

        const key = item.findIndex;

        if (!map[key]) {
          //如果map中没有这个 key 就创建这个 key 分类
          map[key] = {
            title: key,
            items: [],
          };
        }

        //将歌手信息 push 到 key分类下的数组中
        map[key].items.push({
          name: item.name,
          id: item.id,
          findIndex: item.findIndex,
          avatar: item.picUrl,
        });
      });

      // this.singerList = map

      // console.log(map);

      //为了得到有序列表，对map进行排序
      let hot = [];
      let ret = [];

      for (let key in map) {
        let val = map[key];

        if (val.title.match(/[a-zA-Z]/)) {
          //字母组
          ret.push(val);
        } else if (val.title === HOT_NAME) {
          hot.push(val);
        }
      }

      // console.log(ret);

      //对字母进行排序

      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0);
      });

      return hot.concat(ret);
    }
    async function onSelectSinger(singer) {
      console.log(singer)
      storage.session.set(SINGER_KEY, singer);
      // const res = await getSingerDetail(singer.id);
      // console.log(res);
      isShowTab.value = false;
      selectedSinger.value = singer;
      router.push(`/singer/${singer.id}`);
    }
</script>
<style lang="less" scoped>
.Singer {
  position: relative;
  height: 100vh;
  z-index: 9;
}
</style>