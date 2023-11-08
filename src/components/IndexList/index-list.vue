<template>
    <div class="index-list">
        <van-index-bar :index-list="indexList" class="singer-list">

            <template v-for="group in singerList" :key="group.title" >
                <van-index-anchor :index="group.title">{{ group.title }}</van-index-anchor>
                <template v-for="item in group.items" :key="item.id" >
                    <van-cell @click="onClick(item)">
                        <div class="singer">
                            <img v-lazy="item.avatar" alt="avatar" >
                            <div class="text">{{ item.name }}</div>
                        </div>
                    </van-cell>
                </template>
            </template>

        </van-index-bar>

    </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
    


    const props = defineProps({
        singerList: {
            type: Array,
            default: []
        }
    })
    const indexList = computed(() => {
        return props.singerList.map(item => item.title);
    })
    const emit = defineEmits(['selectSinger']);
    
    function onClick(item) {
        emit('selectSinger', item);
    }
    
 
</script>
<style lang="less" scoped>
    .singer-list {
        .singer {
            display: flex;
            align-items: center;
            img {
                width: 50px;
                height: 50px;
                border-radius: 50%;
            }
            .text {
                font-size: @font-size-medium-x;
                color: rgba(255, 255, 255, 0.5);
                padding-left: 20px;
            }
        }
    }
</style>