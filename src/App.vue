<template>
      <div class="main">
        <div class="top" v-show="isShowTab">
          <main-header />
          <tab/>
        </div>

        <div class="content">
          <router-view 
          v-slot="{ Component }" 
          >
          <keep-alive>
            <component :is="Component"/>
          </keep-alive>
        </router-view>
        </div>
      </div>
      <router-view
        :style="viewStyle"
        name="user"
        v-slot="{ Component }"
      >
        <transition appear name="slide">
          <keep-alive>
            <component :is="Component"/>
          </keep-alive>
          
        </transition>
      </router-view>
      <player></player>
      <!-- <singer-detail></singer-detail> -->
</template>

<script setup>
  // import singerDetail from '@/views/singerDetail/index.vue';
  import mainHeader from './components/Header/main-header.vue'; 
  import tab from './components/tab/tab.vue';
  import player from './components/player/player.vue';

  import  useShowCpnsStore  from '@/store/modules/showComonents'
  import useReachBottom from './hooks/useReachBottom';

  import { computed, onMounted, watch } from 'vue'
  import { storeToRefs } from 'pinia';
  import { useRoute } from 'vue-router';
  import usePlayerStore from './store/modules/player';
    //自适应
    let fontSize;
    let lastTouchY = 0;

    const route = useRoute();
    const showCpnsStore = useShowCpnsStore();
    const store = usePlayerStore();


    const { isShowTab } = storeToRefs(showCpnsStore);


    const viewStyle = computed(() => {
      return store.viewStyle;
    })
    // const  isReachBottom  = useReachBottom(() => {});
    // watch(isReachBottom, () => {
      
    // }) 
    onMounted(() => {
        response();
        window.addEventListener('resize', response);
        window.removeEventListener('resize', response);
        // console.log(route.params)
    })


    function response() {
      let wei = parseInt(window.innerWidth);

      fontSize = wei / 20;
      document.documentElement.style.fontSize = fontSize + 'px';
      // console.log('font-size',document.documentElement.style.fontSize)
    }
    // function onTouchmove(event) {
    //   let currentTouchY = event.touches[0].clientY;
    //   // console.log(currentTouchY);
    //   lastTouchY = currentTouchY;
    //   if (isReachBottom.value && currentTouchY > lastTouchY) {
    //     event.preventDefault();
    //   }
    //   // lastTouchY = currentTouchY;
    // }
</script>

<style lang="less" scoped>
.main {
  position: relative;
  height: 100vh;
  z-index: 100;
  .top {
    position: relative;
    z-index:100;

  }
  .content {
    position: absolute;
    z-index: 0;
    bottom: 0;
    top: 88px;
    left: 0;
    right: 0;
    overflow-y: scroll;
}
}
</style>
