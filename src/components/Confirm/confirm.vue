<template>
  <teleport to="body">
    <transition name="confirm-fade">
      <div class="confirm" v-show="visible">
        <div class="confirm-wrapper">
          <div class="confirm-content">
            <p class="text">{{text}}</p>
            <div class="operate">
              <div
                class="operate-btn left"
                @click="confirm"
              >{{confirmBtnText}}
              </div>
              <div
                class="operate-btn"
                @click="cancel"
              >{{cancelBtnText}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup>
    import usePlayerStore from '@/store/modules/player';
    import { ref, computed } from 'vue'; 


    const props = defineProps({
        text: {
            type:String,
            default: '燕子没有你我怎么活啊啊啊啊哈哎哟'
        },
        confirmBtnText: {
            type: String,
            default: '清空'
        },
        cancelBtnText: {
            type: String,
            default: '取消'
        }
    })


    const store = usePlayerStore()
    const visible = ref(false)

    const emit = defineEmits(['cancel', 'confirm'])

    function cancel() {
        // store.commit('setting/setVisibleConfirm', false);
        emit('cancel')
        hide()
    }

    function confirm() {
        emit('confirm')
        hide() 
    }
    function hide() {
        visible.value = false
    }
    function show() {
        visible.value = true
    }

    defineExpose({
      show,
      hide
    })
</script>
<style scoped lang="less">
  .confirm {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 998;
    background-color: @color-background-d;
    &.confirm-fade-enter-active {
      animation: confirm-fadein .5s;
      .confirm-content {
        animation: confirm-zoom-in .3s;
      }
    }
    &.confirm-fade-leave-active {
      animation: confirm-fadeout .5s;
      .confirm-content {
        animation: confirm-zoom-out .3s;
      }
    }
    &::before {
      content: '';
      position: fixed;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      z-index: 200;
      backdrop-filter: blur(10px);
    }
    .confirm-wrapper {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 999;
      .confirm-content {
        width: 270px;
        border-radius: 13px;
        background: @color-highlight-background;
        .text {
          padding: 19px 15px;
          line-height: 22px;
          text-align: center;
          font-size: @font-size-large;
          color: @color-text-l;
        }
        .operate {
          display: flex;
          align-items: center;
          text-align: center;
          font-size: @font-size-large;
          .operate-btn {
            flex: 1;
            line-height: 22px;
            padding: 10px 0;
            border-top: 1px solid @color-background-d;
            color: @color-text-l;
            &.left {
              border-right: 1px solid @color-background-d;
              color: @color-text;
            }
          }
        }
      }
    }
  }

  @keyframes confirm-fadein {
    0% {
      backdrop-filter: blur(10px);
      opacity: 0;
    }
    100% {
      backdrop-filter: blur(0px);
      opacity: 1;
    }
  }

  @keyframes confirm-fadeout {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  @keyframes confirm-zoom-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes confirm-zoom-out {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
</style>
