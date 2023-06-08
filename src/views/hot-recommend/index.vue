<template>
     <div class="recommend">
      <!-- <Loading></Loading> -->

          <Scroll 
        class="recommend-content" 
        :v-show="!loading"
        v-loading="loading"
        >
            <div>
              <div class="swipe-contain">
                  <van-swipe :autoplay="3000" lazy-render>
                      <van-swipe-item v-for="image in images" :key="image">
                          <img :src="image.imageUrl" />
                      </van-swipe-item>
                  </van-swipe>
              </div>
              <div class="recommend-list">
                <h1 class="list-title" v-show="!loading">热门歌单推荐</h1>
                <ul>
                  <li
                    v-for="item in albums"
                    class="item"
                    :key="item.id"
                    @click="selectItem(item)"
                  >
                    <div class="icon">
                      <img width="60" height="60" v-lazy="item.picUrl">
                      <!-- <img v-else src="@/assets/img/default.png"  width="60" height="60"> -->
                    </div>
                    <div class="text">
                      <h2 class="name">
                        {{ item.name }}
                      </h2>
                      <p class="title">
                        {{`播放量:${item.playCount}`}}
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
        </Scroll>
        <router-view v-slot="{ Component }">
          <transition appear name="slide">
            <component :is="Component" :data="selectedAlbum" ></component>
          </transition>
        </router-view>
    </div>
</template>

<script setup>
import mainHeader from '@/components/Header/main-header.vue';
import tab from '@/components/tab/tab.vue';
import { getRecommend, getAlbumList } from '@/services/api/recommend';
import Scroll from '@/components/Scroll/Scroll.vue'
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
    const recommendData = ref(null)
    const albums = ref([])
    const images = ref([])
    const loading = computed(() => {
        if(!albums.value.length || !images.value.length)return true;
        return false
    })
    const selectedAlbum = ref(null)

    const router = useRouter()
    // const recommendData = computed(async () => {
    //     const res = await getRecommend();
    //     console.log(res)
    //     return res;
    // })
    getRecommend().then(res => {
        console.log('bannerResult',res);
        images.value = res.banners;
        // albums.value = res.albums;
    })
    getAlbumList().then(res => {
      // console.log(res);
      albums.value = res.result;
    })
    

    function selectItem(album) {
      selectedAlbum.value = album;
      router.push(`/recommend/${album.id}`)
    }

</script>
<style lang="less" scoped>
.recommend {
   height: 100vh;
      .recommend-content{
        height: 100vh;
        overflow: hidden;
      .swipe-contain {
          position: relative;
          width: 100%;
          overflow: hidden;
          height: 150px;
          // margin-bottom: 30px;
          img {
              width: 100%;
              height: 100%;
          }
      }
      .recommend-list {
        box-sizing: border-box;
          .list-title {
            height: 65px;
            line-height: 3.7143rem;
            text-align: center;
            font-size: @font-size-medium;
            color: @color-theme;
          }
          .item {
            display: flex;
            box-sizing: border-box;
            align-items: center;
            padding: 0 1.1429rem 1.1429rem 1.1429rem;

            .icon {
              flex: 0 0 3.4286rem;
              width: 3.4286rem;
              padding-right: 1.1429rem;
            }
            .text {
              display: flex;
              flex-direction: column;
              justify-content: center;
              flex: 1;
              line-height: 1.1429rem;
              overflow: hidden;
              font-size: @font-size-medium;
            }
            .name {
              margin-bottom: .5714rem;
              color: @color-text;
            }
            .title {
              color: @color-text-d;
            }
          }
          .item:nth-last-of-type(1) {
            padding-bottom: 160px;
          }
        }
      }
}
</style>