<template>
  <div class="top-list" v-loading="loading">
    <scroll class="top-list-content">
      <ul>
        <li
          class="item"
          v-for="item in topList"
          :key="item.id"
          @click="selectItem(item)"
        >
          <div class="icon">
            <img
              width="100"
              height="100"
              v-lazy="item.imgUrl"
            />
          </div>
          <ul class="song-list">
            <li
              class="song"
              v-for="(song, index) in item.songs"
              :key="song.id">
              <span>{{index + 1}}. </span>
              <span>{{song.first}}-{{song.second}}</span>
            </li>
          </ul>
        </li>
      </ul>
    </scroll>
    <router-view v-slot="{ Component }">
      <transition appear name="slide">
        <component :is="Component" :data="selectedTop"/>
      </transition>
    </router-view>
  </div>
</template>

<script setup>
      import { ref, computed } from 'vue';
      import { useRouter } from 'vue-router'

      import { getImg, getTopList } from '@/services/api/rank';
      import { getDiscData } from '@/services/api/disc';

      import { TOP_KEY } from '@/utils/constant'
      import storage from 'good-storage';

      const router = useRouter();

      
      const topList = ref(null);
      const selectedTop = ref(null);



      const loading = computed(() => {
          if(topList.value)return false;
          return true;
      })

      getTopList().then(async (res) => {
          topList.value = await getRank(res.list)
      })

      async function getRank(list) {
          const songs = list.slice(0, 10)
          const imgs = await getImg()
          const len = imgs.length
          

          const result = await Promise.all(songs.map(async (item, index) => {
                if(item.tracks.length === 0){

                  const ret = await getDiscData(item.id);
                  // console.log('kong', ret)
                  
                  for(let i = 0; i < 3; ++ i){

                    item.tracks.push({
                      first:  ret.playlist.tracks[i].name,
                      second: getDesc(ret.playlist.tracks[i].ar)    
                    })

                  }
                }
                // console.log(item)
                let data = {
                  id: item.id,
                  name: item.name,
                  // imgUrl: item.coverImgUrl,
                  imgUrl: index < len ? imgs[index] : item.coverImgUrl,
                  songs: item.tracks,
                  desc: item.description,
                }

                return data
          }))


          return result;
      }
      function selectItem(item){
          selectedTop.value = item;
          cacheTop(item)
          
          router.push(`/top-list/${item.id}`)
      }

      function cacheTop(top){
          storage.session.set(TOP_KEY, top)
      }

      function getDesc(singer){

        let songers = [];
        
        for (let i = 0; i < singer.length; i++) {
          songers.push(singer[i].name)
        }

        return `${songers.join('/')}`
      }
</script>

<style lang="less" scoped>
  .top-list {
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;
    .top-list-content {
      height: 100%;
      overflow: hidden;
      .item {
        display: flex;
        margin: 0 1.1429rem;
        padding-top: 20px;
        height: 100px;
        &:last-child {
          padding-bottom: 20px;
        }
        .icon {
          flex: 0 0 100px;
          width: 5.7143rem;
          height: 100px;
        }
        .song-list {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0 1.1429rem;
          height: 100px;
          overflow: hidden;
          background: @color-highlight-background;
          color: @color-text-d;
          font-size: @font-size-small;
          .song {
            .no-wrap();
            line-height: 1.4857rem;
          }
        }
      }
    }
  }
</style>
