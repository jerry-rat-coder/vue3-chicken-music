<template>
    <div class="search-input">
        <i class="icon-search"></i>
        <input 
        type="text" 
        class="input-inner"
        v-model="query"
        placeholder="搜索歌曲、歌手">
        <i 
        v-show="query"
        class="icon-dismiss"
        @click="clear"></i>
    </div>
</template>

<script setup>
import { watch, ref } from "vue"
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})
const query = ref(props.modelValue)
const emit = defineEmits(['update:modelValue'])

watch(query, (newQuery) => {
  emit('update:modelValue', newQuery.trim());
})

watch(() => props.modelValue, (newModelValue) => {
  query.value = newModelValue;
})


function clear() {
  query.value = '';
}

</script>
<style lang="less" scoped>
.search-input {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    padding: 0 6px;
    height: 32px;
    background: @color-highlight-background;
    border-radius: 6px;
    .icon-search {
        font-size: 24px;
        color: @color-text-d;
    }
    .input-inner {
      flex: 1;
      margin: 0 5px;
      line-height: 18px;
      background: @color-highlight-background;
      color: @color-text;
      font-size: @font-size-medium;
      outline: 0;
      &::placeholder {
        color: @color-text-d;
      }
    }
    .icon-dismiss {
      font-size: 16px;
      color: @color-text-d;
    }

}
</style>