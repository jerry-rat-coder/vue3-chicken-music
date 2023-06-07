import Loading from '@/components/loading/loading.vue'
import createLoadingLikeDirectives from '@/utils/createLoadingLikeDirective'
const loadingDirective = createLoadingLikeDirectives(Loading)
export default loadingDirective