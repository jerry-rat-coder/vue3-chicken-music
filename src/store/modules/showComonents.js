import { defineStore } from "pinia";
import { SINGER_KEY } from "@/utils/constant";
import storage from "good-storage";
import { useRoute, useRouter } from "vue-router";
const cached = storage.session.get(SINGER_KEY);
const route = useRoute();
const useShowCpnsStore = defineStore('showCpnsStore', {
    state: () => {
        return {
            isShowTab: true,
        }
    },
    actions: {
        setIsShowTab(now) {
            this.isShowTab = now;
        }
    }

})

export default useShowCpnsStore;