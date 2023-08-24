<template>
    <div
    class="suggest"
    v-loading:[loadingText]="loading"
    ref="rootRef"
  >
    <ul class="suggest-list">
      <!-- li{$}*100 -->
      <li
        class="suggest-item"
        v-for="song in songs"
        :key="song.id"
        @click.stop="selectSong(song)"
      >
        <div class="icon">
          <i class="icon-music"></i>
        </div>
        <div class="name">
          <p class="text">
            {{ getDisplayName(song) }}
          </p>
        </div>
      </li>
      
      <div
        class="suggest-item"
      ></div>
    </ul>
  </div>
</template>

<script setup>
    import { ref,watch,computed, nextTick } from 'vue';

    import { getSuggest } from '@/services/api/search'
    import useGetSongData from '@/hooks/useGetSongData';
    import usePullUpLoad from '@/utils/use-pull-up-load'
    import { debounce } from '@/utils/utils';
    const props = defineProps({
        query: String
    })
    const emit = defineEmits(['selectSong', 'selectSinger'])
    // const store = usePlayerStore();
    const page = ref(0);
    const songs = ref([]);
    
    const hasMore = ref(true)
    // const singer = ref(null);
    // const hasMore = ref(false);
    const showSinger = true;
    const loadingText = ref('');
    const noResultText = ref('抱歉，暂无搜索结果')
    const preventPullUpLoad = computed(() => {
        return loading.value || manualLoading.value
      })
    const manualLoading = ref(false)
    const loading = computed(() => {
      // console.log(songs.value)
        return !songs.value.length;
    })
    // const noResult = computed(() => {
    //     return !singer.value && !songs.value.length 
    //   })
    // const pullUpLoading = computed(() => {
    //     return hasMore.value && isPullUpLoad.value
    // })
    const {isPullUpLoad, rootRef, scroll} = usePullUpLoad(searchFirst, preventPullUpLoad);
    const { getSongData } = useGetSongData()

    watch(() => props.query, debounce(async (newQuery) => {
        if(!newQuery)return;
        // await nextTick()
        // await makeItScrollable()
        await searchFirst();
        await nextTick()
    }, 700))

    async function searchFirst() {
        if(!props.query){
            return;
        }

        page.value = 0
        songs.value = []
        // console.log('research')
        const res = await getSuggest(props.query, page.value)
        // console.log('res',res);
        songs.value = await Promise.all(res.result.songs.map(async (item) => {
            const ret = await getSongData(item.id)
            return ret
        }))
        // console.log(songs.value)

        hasMore.value = true 
        checkMore(res.result)
        await nextTick()
        scroll.value.refresh()
        // await makeItScrollable()
    }
    async function searchMore() {
        if(!props.query || !hasMore.value){
            return;
        }

        page.value++

        const res = await getSuggest(props.query, page.value)
        // songs.value = res.songs;
        // songs.value = songs.value.concat(await processSongs(res.songs))
        songs.value = songs.value.concat(res.result.songs)
        // console.log(res)
        await nextTick()
        await makeItScrollable()

    }
    function selectSong(song) {
        emit('selectSong', song);
    }
    function getDisplayName(item) {
      let songers = [];

      if(item.singer){
        for (let i = 0; i < item.singer.length; i++) {
            songers.push(item.singer[i].name);
        }
      }

      return `${item.name} — ${songers.join(",")}`;
    }

    async function makeItScrollable() {
        if (scroll.value.maxScrollY >= -1) {
          manualLoading.value = true
          await searchMore()
          manualLoading.value = false
        }
      }
    function checkMore(data) {
      if (!data.songs.length || (page.value + 1) * 30 >= data.songCount) {
        hasMore.value = false;
        console.log("没有更多了");
      }
    }
</script>
<style lang="less" scoped>
.suggest {
    height: 100%;
    overflow: hidden;
    .suggest-list {
      padding: 0 30px;
      .suggest-item {
        display: flex;
        align-items: center;
        padding-bottom: 20px;
        .icon {
          flex: 0 0 30px;
          width: 30px;
          [class^="icon-"] {
            font-size: 14px;
            color: @color-text-d;
          }
        }
        .name {
          flex: 1;
          font-size: @font-size-medium;
          color: @color-text-d;
          overflow: hidden;
          .text {
            .no-wrap();
          }
        }
      }
    }
  }
</style>