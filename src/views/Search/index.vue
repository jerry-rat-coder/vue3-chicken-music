<template>
    <div class="search">
        <div class="search-input-wrapper">
            <search-input v-model="query"></search-input>
        </div>
       <scroll
        ref="scrollRef"
        class="search-content"
        v-show="!query"
        >
        <div>
            <div class="hot-keys">
                <h1 class="title">热门搜索</h1>
                <ul>
                    <li
                    class="item"
                    v-for="item in hotKeys"
                    :key="item"
                    @click="addQuery(item.first)"
                    >
                    <span>{{item.first}}</span>
                    </li>
                    
                </ul>
            </div>
            <div class="search-history" v-show="searchHistory.length">
              <h1 class="title">
                <span class="text">搜索历史</span>
                <span class="clear" @click="showConfirm">
                  <i class="icon-clear"></i>
                </span>
              </h1>
              <confirm
                ref="confirmRef"
                text="是否清空所有搜索历史"
                confirm-btn-text="清空"
                @confirm="clearSearch"
              >
              </confirm>
              <search-list
                :searches="searchHistory"
                @select="addQuery"
                @delete="deleteSearch"
              ></search-list>
          </div>
        </div>
       </scroll>
        <div class="search-result" v-show="query">
          <suggest
            :query="query"
            @selectSong="onSelectSong"
          ></suggest>
        </div>
        <router-view v-slot="{ Component }">
          <transition appear name="slide">
            <component :is="Component" :data="selectedSinger"></component>
          </transition>
        </router-view>
    </div>
</template>

<script setup>
    import searchInput from './cpns/search-input.vue'
    import suggest from './cpns/suggest.vue'
    import searchList from '@/components/SearchList/search-list.vue'
    import scroll from '@/components/Scroll/Scroll.vue'
    import confirm from '@/components/Confirm/confirm.vue'

    import { ref, computed } from 'vue'
    import { useRouter } from 'vue-router'
    import { getHotKeys} from '@/services/api/search'
    
    import usePlayerStore from '@/store/modules/player'
    import useSearchHistory from '@/hooks/use-search-history'
    import { SINGER_KEY } from '@/utils/constant'
    import storage from 'good-storage'



    const hotKeys = ref(null);
    const query = ref('');
    const store = usePlayerStore();
    const router = useRouter();
    const selectedSinger = ref(null);
    const confirmRef = ref(null)

    const searchHistory = computed(() => store.searchHistory)


    const { saveSearch, deleteSearch, clearSearch } = useSearchHistory()

    getHotKeys().then(res => {
        hotKeys.value = res.result.hots;
    })



    function addQuery(str) {
        query.value = str;
    }
    function onSelectSong(song) {
        saveSearch(query.value)
        store.addSong(song)
    //   store.dispatch('addSong', song);
    }
    // function onSelectSinger(singer){
    //   selectedSinger.value = singer;
    //   router.push(`/search/${singer.mid}`);
    //   cacheSinger(singer);
    // }
    function cacheSinger(singer){
      storage.session.set(SINGER_KEY, singer);
    }
    function showConfirm() {
      confirmRef.value.show()
    }



</script>
<style lang="less" scoped>
.search {
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .search-input-wrapper {
        margin: 20px;
    }
    .search-content {
      flex: 1;
      overflow: hidden;
      .hot-keys {
        margin: 0 20px 20px 20px;
        .title {
          margin-bottom: 20px;
          font-size: @font-size-medium;
          color: @color-text-l;
        }
        .item {
          display: inline-block;
          padding: 5px 10px;
          margin: 0 20px 10px 0;
          border-radius: 6px;
          background: @color-highlight-background;
          font-size: @font-size-medium;
          color: @color-text-d;
        }
      }
      .search-history {
        position: relative;
        margin: 0 20px;
        .title {
          display: flex;
          align-items: center;
          height: 40px;
          font-size: @font-size-medium;
          color: @color-text-l;
          .text {
            flex: 1;
          }
          .clear {
            .extend-click();
            .icon-clear {
              font-size: @font-size-medium;
              color: @color-text-d;
            }
          }
        }
      }
    }
    .search-result {
      flex: 1;
      overflow: hidden;
    }
}
</style>