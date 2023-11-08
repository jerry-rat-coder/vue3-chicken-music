import storage from 'good-storage';
import { computed, ref, watch, defineProps, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import useShowCpnsStore from '@/store/modules/showComonents'
import { storeToRefs } from 'pinia';
import { ALBUM_KEY } from '@/utils/constant';

export default function createDetailComponent(data, key, fetch) {
    const songs = ref([]);
    // const props = defineProps({
    //     singer: {
    //         type: Object,
    //         default: () => ({})
    //     }
    // })
    const loading = ref(true);


    const route = useRoute();
    const showCpnsStore = useShowCpnsStore();
    const { isShowTab } = storeToRefs(showCpnsStore);


    const computedData = computed(() => {
        let res = null;
        if (data) {
            res = data;
        } else {
            const cached = storage.session.get(key);
            // console.log(cached)
            if (cached && (cached.id + '') === route.params.id) {
                res = cached;
            } else {
              
            }
        }
        return res;
    })


    watch(computedData, async() => {
        const computedDataVal = computedData.value;
        if (computedDataVal) {
            // console.log('props.singer', data)
            const res = await fetch(computedDataVal.id);
            loading.value = false;
            // console.log('compu', res);
            songs.value = res.songs;
        }
    }, { immediate: true })

    onMounted(() => {
        isShowTab.value = false;
    })

    return {
        songs,
        computedData,
        loading,
    }
}