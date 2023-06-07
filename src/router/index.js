import { createRouter, createWebHashHistory } from 'vue-router'

const Recommend = () =>
    import ('@/views/hot-recommend/index.vue')
const Singer = () =>
    import ('@/views/Singer/index.vue')
const TopList = () =>
    import ('@/views/TopList/index.vue' /* webpackChunkName: "top-list" */ )
const Search = () =>
    import ('@/views/Search/index.vue' /* webpackChunkName: "search" */ )
const SingerDetail = () =>
    import ('@/views/singerDetail/index.vue' /* webpackChunkName: "singer-detail" */ )
const Album = () =>
    import ('@/views/Album/index.vue' /* webpackChunkName: "album" */ )
const TopDetail = () =>
    import ('@/views/Rank/index.vue' /* webpackChunkName: "top-detail" */ )
    // const UserCenter = () =>
    //     import ('@/views/UserCenter/user-center.vue' /* webpackChunkName: "user-center" */ )

const routes = [{
        path: '/',
        redirect: '/recommend'
    },
    {
        path: '/recommend',
        component: Recommend,
        meta: {
            id: 0
        },
        children: [{
            path: ':id',
            component: Album
        }]
    },
    {
        path: '/singer',
        component: Singer,
        meta: {
            id: 1
        },
        children: [{
            path: ':id',
            component: SingerDetail
        }]
    },
    {
        path: '/top-list',
        component: TopList,
        meta: {
            id: 2
        },
        children: [{
            path: ':id',
            component: TopDetail
        }]
    },
    {
        path: '/search',
        component: Search,
        meta: {
            id: 3
        }
        // children: [{
        //     path: ':id',
        //     component: SingerDetail
        // }]
    },
    // {
    //     path: '/user',
    //     components: {
    //         user: UserCenter
    //     }
    // }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router