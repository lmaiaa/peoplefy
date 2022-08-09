import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Default',
        component: () => import('../layouts/Default.vue'),
        children: [
            {
                path: '',
                alias:'/list/all',
                name: 'ListCharacters',
                component: () => import('../pages/ListOfAllCharacters.vue'),
            },
            {
                path: '/list/alive',
                name: 'ListOfAllLivingCharacters',
                component: () => import('../pages/ListOfAllLivingCharacters.vue'),
            },
            {
                path: '/list/human',
                name: 'ListOfAllHumanCharacters',
                component: () => import('../pages/ListOfAllHumanCharacters.vue'),
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;